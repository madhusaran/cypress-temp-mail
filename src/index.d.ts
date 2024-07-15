// load type definitions that come with Cypress module
/// <reference types="cypress" />
declare namespace Cypress {
    interface Chainable {
        /**
         * Createa a temp mail for E2E testing
         * @example
         * cy.createTempMail() 
         */
        createTempMail(mailingAddressLabel: string): Chainable<{
            address: string
        }>

        /**
         * retrives the last received mail from the created mail
         * @example
         * cy.getMailbox() 
         * cy.getMailbox({ address: string, messageCount: number, messages: Message[] })
         * @returns 
         * Chainable<{ subject: any; text: any; html: any; inboxMailCount: number }>
         */
        getMailbox(): Chainable<{ address: string, messageCount: number, messages: Message[] }>
    }
}