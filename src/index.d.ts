// load type definitions that come with Cypress module
/// <reference types="cypress" />

interface Message {
    subject: string,
    html: string
}

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
         * @returns 
         * Chainable<{ address: string, messageCount: number, messages: Message[] }>
         */
        getMailbox(): Chainable<{ address: string, messageCount: number, messages: Message[] }>
    }
}