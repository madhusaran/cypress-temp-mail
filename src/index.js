// Mailboxes are provided by the free mail.tm API (https://docs.mail.tm).
// cy.request is used so calls go through Cypress' Node proxy (no CORS issues).
const API = 'https://api.mail.tm'
const MAX_RETRIES = 5

// address -> bearer token for every inbox created in the current spec
const accounts = new Map()
let lastAddress

// mail.tm rate limits each IP; on 429 wait (Retry-After, else a growing backoff) and retry
const request = (options, attempt = 1) =>
    cy
        .request({
            ...options,
            url: `${API}${options.url}`,
            headers: { Accept: 'application/json', ...options.headers },
            failOnStatusCode: false,
            log: false,
        })
        .then((res) => {
            if (res.status !== 429 || attempt > MAX_RETRIES) return res
            const delay = Number(res.headers['retry-after']) * 1000 || 5000 * attempt
            return cy.wait(delay, { log: false }).then(() => request(options, attempt + 1))
        })

const assertOk = (res, action) => {
    if (res.status < 200 || res.status > 299) {
        throw new Error(`cypress-temp-mail: ${action} failed with ${res.status} ${JSON.stringify(res.body)}`)
    }
    return res
}

// mail.tm returns a plain array for application/json, or a Hydra collection for ld+json
const toList = (body) => (Array.isArray(body) ? body : body['hydra:member'] || [])

const toMessage = (mail) => ({
    from: mail.from && mail.from.address,
    timestamp: mail.createdAt,
    subject: mail.subject,
    message: mail.text,
    html: (mail.html || []).join(''),
})

Cypress.Commands.add('createTempMail', (mailingAddressLabel) => {
    const label = (mailingAddressLabel || `cy${Date.now()}${Cypress._.random(1e3)}`).toLowerCase()
    // Unique per inbox so nobody else can log in to it
    const password = `Cy-${Cypress._.random(1e9)}-${Date.now()}`

    return request({ url: '/domains' }).then((res) => {
        const domain = toList(assertOk(res, 'listing domains').body).find((d) => d.isActive && !d.isPrivate)
        if (!domain) throw new Error('cypress-temp-mail: no mail.tm domain is currently available')
        const address = `${label}@${domain.domain}`

        return request({ method: 'POST', url: '/accounts', body: { address, password } })
            .then((res) => {
                if (res.status === 422) {
                    throw new Error(`cypress-temp-mail: ${address} is already taken, use a unique mailingAddressLabel`)
                }
                assertOk(res, `creating ${address}`)
                return request({ method: 'POST', url: '/token', body: { address, password } })
            })
            .then((res) => {
                accounts.set(address, assertOk(res, `logging in to ${address}`).body.token)
                lastAddress = address
                Cypress.log({ name: 'createTempMail', message: address })
                return { address }
            })
    })
})

Cypress.Commands.add('getMailbox', (options = {}) => {
    // 3.0.x accepted the address as the first argument
    if (typeof options === 'string') options = { address: options }
    const { address = lastAddress, minMessages = 0, timeout = 30000, interval = 3000 } = options

    if (!address) throw new Error('cypress-temp-mail: call cy.createTempMail() before cy.getMailbox()')
    if (!accounts.has(address)) throw new Error(`cypress-temp-mail: ${address} was not created by cy.createTempMail() in this spec`)

    const headers = { Authorization: `Bearer ${accounts.get(address)}` }
    const startedAt = Date.now()

    // Poll the inbox until it holds minMessages mails
    const poll = () =>
        request({ url: '/messages', headers }).then((res) => {
            const list = toList(assertOk(res, `reading ${address}`).body)
            if (list.length >= minMessages) return list
            if (Date.now() - startedAt >= timeout) {
                throw new Error(`cypress-temp-mail: expected ${minMessages} mail(s) in ${address} within ${timeout}ms, found ${list.length}`)
            }
            return cy.wait(interval, { log: false }).then(poll)
        })

    return poll().then((list) => {
        const messages = []
        // The list endpoint only has a preview; fetch each mail for its full text/html body (newest first)
        list.forEach((mail) => {
            request({ url: `/messages/${mail.id}`, headers }).then((res) => messages.push(toMessage(assertOk(res, `reading mail ${mail.id}`).body)))
        })
        return cy.wrap(null, { log: false }).then(() => {
            Cypress.log({ name: 'getMailbox', message: `${list.length} mail(s) for ${address}` })
            return { address, messageCount: list.length, messages }
        })
    })
})
