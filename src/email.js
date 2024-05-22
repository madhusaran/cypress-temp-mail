var tempMailAccount

//  import imaps from 'imap-simple'
// //var simpleParser = 
// import { simpleParser } from 'mailparser'

Cypress.Commands.add('createTempMail', { prevSubject: 'optional' }, () => {
    return cy.exec('node ./src/mailer.js', { failOnNonZeroExit: true }).then((m) => {
        
        if (m.code != 0) {
            console.log(m.stderr)
        }
        let userEmail = {
            email: JSON.parse(m.stdout).email,
            password: JSON.parse(m.stdout).password
        }
        tempMailAccount = userEmail
        return userEmail
    })
})

Cypress.Commands.add('getLastEmail', (account = tempMailAccount) => {

    console.log('node ./src/lastmail.mjs ' + account.email + ' ' + account.password)
    return cy.exec('node ./src/lastmail.js ' + account.email + ' ' + account.password, { failOnNonZeroExit: false }).then((m) => {

        if (m.code != 0) {
            console.log(m.stderr)
        }
        var stdOu = JSON.parse(m.stdout)
        var rerul = {
            subject: stdOu.subject,
            text: stdOu.text,
            html: stdOu.html,
            inboxMailCount: stdOu.inboxMailCount,
        }
        return rerul
    })
})