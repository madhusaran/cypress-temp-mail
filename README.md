[![cypress-temp-mail](https://github.com/madhusaran/cypress-temp-mail/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/madhusaran/cypress-temp-mail/actions/workflows/node.js.yml)

# cypress-temp-mail ✔
cypress-temp-mail is a lightweight npm library designed to generate temporary email addresses for end-to-end testing with Cypress . It streamlines the process of testing email-related functionalities in your applications.

## Features ✔

- **Quick Setup**: Easily integrate with your Cypress tests.
- **Disposable Emails**: Generate temporary emails for testing sign-ups, password resets, and more.


## Installation

Install `cypress-temp-mail` using npm:

```bash 
npm install cypress-temp-mail --save-dev
```

## Usage
===
```javascript
import 'cypress-temp-mail'
```
in your Cypress project  - `cypress/support/commands.js` file
===
## Generate a new temporary email:

```javascript
cy.createTempMail()  //Retuens you a temp email generated using

``` 

## Check the inbox:

```javascript
cy.getLastEmail()  //Returns below object for the latest created email . 
```
===

```javascript

{
    subject: //latest mail subject,
    text: //latest mail body as text,
    html: //latest mail body as html,
    inboxMailCount: //mailbox count
}

```

## To get the mail for specific account

```javascript
cy.getLastEmail({email: 'abc@ethereal.com', password: 'abc@123!'}) 

```

### Contributing
Contributions are welcome! 🙏

#HappyTesting
