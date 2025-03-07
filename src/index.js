var tempMailAccount
const path = require('path');
const Mailjs = require("@cemalgnlts/mailjs");
let address
const mailjs = new Mailjs();

Cypress.Commands.add('createTempMail', (mailingAddressLabel) => {
    console.log(mailingAddressLabel);
    
    return mailjs.getDomains().then((domains) => {
        if (!domains.data.length) {
            throw new Error("No domains available");
        }

        const domain = domains.data[0].domain;
        address = `${mailingAddressLabel}@${domain}`;

        console.log(`Generated email: ${address}`);

        return mailjs.register(address, "Pass@123").then((register) => {
            if (register.status) {
                console.log(`Registered email: ${address}, ID: ${register.data.id}`);
                return address;
            } else {
                throw new Error("Email registration failed");
            }
        });
    }).catch((error) => {
        console.error("Error creating temp mail:", error);
        throw error;
    });
});


Cypress.Commands.add('getMailbox', async (email = address, password = 'Pass@123') => {
    try {
        const login = await mailjs.login(email, password);
        console.log(login);

        const token = login.data.token; // Not used, but keeping it if needed later
        const messagesResponse = await mailjs.getMessages();
        console.log(messagesResponse);

        let data = { address: email, messageCount: messagesResponse.data.length, messages: [] };

        // Fetch message details in parallel
        const messages = await Promise.all(
            messagesResponse.data.map(async (message) => {
                const msag = await mailjs.getMessage(message.id);
                console.log(msag);
                return {
                    subject: msag.data.subject,
                    html: msag.data.html
                };
            })
        );

        data.messages = messages;
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching mailbox:', error);
        throw error;
    }
});