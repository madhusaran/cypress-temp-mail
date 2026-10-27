/// <reference path="../../src/index.d.ts" />

// Runs against the real mail.tm API; the inboxes created here stay empty
const run = Date.now()

describe(' cypress-temp-mail commands ', () => {
    it('fails clearly when getMailbox is called before createTempMail', (done) => {
        cy.on('fail', (err) => {
            expect(err.message).to.contain('call cy.createTempMail()')
            done()
        })
        cy.getMailbox()
    })

    it('creates inboxes and reads each one by address', () => {
        cy.createTempMail(`Label${run}`).its('address').should('match', new RegExp(`^label${run}@[\\w.-]+$`)).as('labelled')
        cy.createTempMail().its('address').should('match', /^cy\d+@[\w.-]+$/)
        cy.getMailbox().should((box) => {
            expect(box.address).to.match(/^cy\d+@/)
            expect(box.messageCount).to.eq(0)
            expect(box.messages).to.deep.eq([])
        })
        cy.get('@labelled').then((address) => {
            cy.getMailbox(address).its('address').should('eq', address)
        })
    })

    it('fails clearly when the address is taken', (done) => {
        cy.on('fail', (err) => {
            expect(err.message).to.contain('already taken')
            done()
        })
        cy.createTempMail(`dupe${run}`)
        cy.createTempMail(`dupe${run}`)
    })

    it('fails clearly when mails do not arrive in time', (done) => {
        cy.on('fail', (err) => {
            expect(err.message).to.contain('expected 1 mail(s)').and.contain('found 0')
            done()
        })
        cy.getMailbox({ minMessages: 1, timeout: 4000, interval: 2000 })
    })

    it('rejects an inbox it did not create', (done) => {
        cy.on('fail', (err) => {
            expect(err.message).to.contain('was not created by cy.createTempMail()')
            done()
        })
        cy.getMailbox('someone@example.com')
    })
})
