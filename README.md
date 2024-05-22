# cypress-temp-mail-sms
TempMail-Cypress is a lightweight npm library designed to generate temporary email addresses for end-to-end testing with Cypress. It streamlines the process of testing email-related functionalities in your applications.

## Features

- **Quick Setup**: Easily integrate with your Cypress tests.
- **Disposable Emails**: Generate temporary emails for testing sign-ups, password resets, and more.


## Installation

Install cypress-temp-mail-sms using npm:

```bash 
npm install cypress-temp-mail-sms --save-dev
```

## Usage
Import cypress-temp-mail-sms in your Cypress ``commands.js`` file:

## Generate a new temporary email:

```javascript
cy.createTempMail()  //Retuens you a temp email generated using

``` 

## Check the inbox:

```javascript
cy.getLastEmail()  //Returns below object for the latest created email . 
```


##To get the mail for specific account
```javascript
cy.getLastEmail({email: 'abc@ethereal.com', password: 'abc@123!'}) 

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

### Contributing
Contributions are welcome! Please read our Contributing Guide for details on our code of conduct, and the process for submitting pull requests.

### Owner

[https://rajmadhan009.wixsite.com/madhanselvaraj] ( Mr. Madhan Raj )

[www.linkedin.com/in/madhanrajselvaraj] ( Linkedin )
