[![cypress-temp-mail](https://github.com/madhusaran/cypress-temp-mail/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/madhusaran/cypress-temp-mail/actions/workflows/node.js.yml)

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/EUWyif5YN84SKhaNfWiKfp/SKcU1Ac4pexEmmk3agK539/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/EUWyif5YN84SKhaNfWiKfp/SKcU1Ac4pexEmmk3agK539/tree/main)

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
cy.createTempMail(mailingAddressLabel)  //Retuens you a temp email generated using provided mailingAddressLabel

//Example: cy.createTempMail("tesEmail")  => Returns tesEmail@1secmail.com
``` 

## Check the inbox:

```javascript
cy.getMailbox()   //Returns below object for the latest created email . 

```
```javascript

{ address: string, messageCount: number, messages: Message[] }

```

### Contributing
Contributions are welcome! 🙏

#HappyTesting
