// load type definitions that come with Cypress module
/// <reference types="cypress" />
declare namespace Cypress {
    interface TempMailMessage {
        /** sender address */
        from: string
        /** ISO date the mail was received */
        timestamp: string
        subject: string
        /** plain text body */
        message: string
        /** HTML body */
        html: string
    }

    interface TempMailboxOptions {
        /** inbox to read, defaults to the last one created with cy.createTempMail() */
        address?: string
        /** keep polling until the inbox holds at least this many mails (default 0, no waiting) */
        minMessages?: number
        /** max time to wait for minMessages in ms (default 30000) */
        timeout?: number
        /** delay between polls in ms (default 3000) */
        interval?: number
    }

    interface Chainable {
        /**
         * Creates a temp mail inbox for E2E testing. The label must be unique across runs;
         * omit it to get a random address.
         * @example
         * cy.createTempMail('signup' + Date.now()).then(({ address }) => cy.get('#email').type(address))
         */
        createTempMail(mailingAddressLabel?: string): Chainable<{ address: string }>

        /**
         * Retrieves all mails (newest first) of an inbox created with cy.createTempMail()
         * @example
         * cy.getMailbox({ minMessages: 1, timeout: 60000 }).then(({ messages }) => {
         *   expect(messages[0].subject).to.contain('Welcome')
         * })
         */
        getMailbox(options?: TempMailboxOptions | string): Chainable<{ address: string, messageCount: number, messages: TempMailMessage[] }>
    }
}
