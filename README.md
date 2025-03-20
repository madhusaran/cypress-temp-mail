
[![npm version](https://img.shields.io/npm/v/cypress-temp-mail)](https://www.npmjs.com/package/cypress-temp-mail)
[![npm downloads](https://img.shields.io/npm/dm/cypress-temp-mail)](https://www.npmjs.com/package/cypress-temp-mail)
[![license](https://img.shields.io/github/license/madhusaran/cypress-temp-mail)](https://github.com/madhusaran/cypress-temp-mail)


[![cypress-temp-mail](https://github.com/madhusaran/cypress-temp-mail/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/madhusaran/cypress-temp-mail/actions/workflows/node.js.yml)

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/EUWyif5YN84SKhaNfWiKfp/SKcU1Ac4pexEmmk3agK539/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/EUWyif5YN84SKhaNfWiKfp/SKcU1Ac4pexEmmk3agK539/tree/main)


# cypress-temp-mail ✔
cypress-temp-mail is a lightweight npm library designed to generate temporary email addresses for end-to-end testing with Cypress . It streamlines the process of testing email-related functionalities in your applications.

## Features ✔

- **Quick Setup**: Easily integrate with your Cypress tests.
- **Disposable Emails**: Generate temporary emails for testing sign-ups, password resets, and more.

## Why Choose `cypress-temp-mail`?

- **Fast Setup**: Quickly add disposable email support to your Cypress tests.
- **No External Dependencies**: You don’t need to rely on any third-party services for email generation.
- **Flexible**: Supports multiple use cases like sign-up, password reset, and email validation testing.

## Installation

Install `cypress-temp-mail` using npm:

```bash 
npm install cypress-temp-mail --save-dev
```

## Usage

```javascript
import 'cypress-temp-mail'
```
add the above statemrent to your Cypress project (`cypress/support/e2e.js` )

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
## Changelog

### [3.0.1] - 2025-03-12
- Updated the temp email provider engine

### [1.0.0] - 2024-03-01
- Initial Release


## Contributing
Contributions are welcome! 🙏

## Keywords

This package is relevant for the following topics:

- Cypress
- Temporary Email
- Email Testing
- Cypress Plugin
- Email Validation
- End-to-End Testing
- Disposable Email
- Email Generator
