/// <reference path="../../src/index.d.ts" />

describe(' cypress-temp-mail ', () => {
    it('=== Validate the temp mail custom commands ===', () => {
        cy.visit('https://app.postdrop.io/signup')
        cy.createTempMail('newman' + Date.now()).then((res) => {
            expect(res.address).to.exist
            cy.get('#email').type(res.address)
            cy.get('#password').type("Pass@123")

            cy.get('#name').type('testMMMM')
            cy.get('#company').type('testMMMMc')

            cy.contains('button[type="submit"]', /^Sign Up$/).should('be.visible').click()
        })
        cy.getMailbox({ minMessages: 1, timeout: 60000 }).then((re) => {
            expect(re.messages[0].subject).to.contain('Postdrop - Verify Account')
            expect(re.messages[0].html).to.not.be.empty
        })
    })
})
