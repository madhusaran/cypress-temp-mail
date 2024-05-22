import * as imaps from 'imap-simple'
import { simpleParser } from "mailparser";

export async function getLastUserEmail() {
  const emailConfig = {
    imap: {
      user: process.argv[2],
      password: process.argv[3],
      host: "imap.ethereal.email",
      port: 993,
      tls: true,
      authTimeout: 10000,
    },
  }

  try {
    const connection = await imaps.connect(emailConfig)

    await connection.openBox("INBOX")
    const searchCriteria = ["ALL"]

    const fetchOptions = {
      bodies: [""],
    }

    const messages = await connection.search(searchCriteria, fetchOptions)

    connection.end()

    if (!messages.length) {
      console.log("cannot find any emails")
      return null
    } else {
      let mail = await simpleParser(
        messages[messages.length - 1].parts[0].body,
      )
      console.log(JSON.stringify({
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        inboxMailCount: messages.length
      }))
      return {
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        inboxMailCount: messages.length
      }
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

getLastUserEmail()
