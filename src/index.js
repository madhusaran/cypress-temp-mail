var tempMailAccount
const path = require('path');
const TempMail = require("node-temp-mail");
let address

Cypress.Commands.add('createTempMail', (mailingAddressLabel) => {
    // Let's create an address object so it can be accessed by the module.
    console.log(mailingAddressLabel)
    address = new TempMail(mailingAddressLabel);
    console.log(address)
    return address.getAddress()
})

Cypress.Commands.add('getMailbox', () => {
    return address.fetchEmails();
})