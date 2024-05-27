/// <reference types="Cypress"/>
/// <reference path="../../src/index.d.ts" />

describe(' cypress-temp-mail ', () => {
    var mailAccount
    it('=== Validate the temp mail custom commands ===', () => {
        cy.visit('https://app.postdrop.io/signup')
        cy.createTempMail().then((res) => {
            console.log('******************************************')
            console.log(res)
            mailAccount = res
            console.log('******************************************')
            expect(res.email).to.exist
            expect(res.password).to.exist
            cy.get('#email').type(res.email)
            cy.get('#password').type(res.email)

            cy.get('#name').type('testMMMM')
            cy.get('#company').type('testMMMMc')
            cy.get('#company').type('testMMMMc')

            cy.get('button[type="submit"]').eq(1).should('be.visible').click()
        })
        cy.wait(5000)
        cy.getLastEmail().then((re) => {
            expect(re.subject).to.contain('Postdrop - Verify Account')
            expect(re.inboxMailCount).to.eq(1)
            expect(re.html).not.to.be.undefined
            console.log(re)
        })
        cy.getLastEmail(mailAccount).then((re) => {
            expect(re.subject).to.contain('Postdrop - Verify Account')
            expect(re.inboxMailCount).to.eq(1)
            expect(re.html).not.to.be.undefined
            console.log(re)
        })
    })
})
