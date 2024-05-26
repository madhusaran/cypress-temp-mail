// load type definitions that come with Cypress module
/// <reference types="cypress" />
declare namespace Cypress {
    interface Chainable {
        /**
         * Createa a temp mail for E2E testing
         * @example
         * cy.createTempMail() 
         */
        createTempMail(): Chainable<{
            email: string
            password: string
        }>

        /**
         * retrives the last received mail from the created mail
         * @example
         * cy.getLastEmail() 
         * cy.getLastEmail({email: string, password: string })
         * @returns 
         * Chainable<{ subject: any; text: any; html: any; inboxMailCount: number }>
         */
        getLastEmail(account?: {
            email: string,
            password: string
        }): Chainable<{ subject: any; text: any; html: any; inboxMailCount: number }>
    }
}