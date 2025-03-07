/// <reference path="../../src/index.d.ts" />

describe(' cypress-temp-mail ', () => {
    var mailAccount
    it('=== Validate the temp mail custom commands ===', () => {
        cy.visit('https://app.postdrop.io/signup')
        cy.createTempMail("newma" + Math.random().toString().slice(3,5) + new Date().getTime().toString().slice(3,6) ).then((res) => {
            console.log('******************************************')
            console.log(res)
            mailAccount = res
            console.log('******************************************')
            expect(res).to.exist
            cy.get('#email').type(res)
            cy.get('#password').type("Pass@123")

            cy.get('#name').type('testMMMM')
            cy.get('#company').type('testMMMMc')
            cy.get('#company').type('testMMMMc')

            cy.get('button[type="submit"]').eq(1).should('be.visible').click()
        })
        cy.wait(10000)
        cy.getMailbox().then((re) => {
            console.log(re.messages[0].subject)
            expect(re.messages[0].subject).to.contain('Postdrop - Verify Account')
            console.log(re)
        })
    })
})
