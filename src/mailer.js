return require('nodemailer').createTestAccount().then((user => {
    var userEmail = {
        email: user.user,
        password: user.pass,
    }
    console.log(JSON.stringify(userEmail))
    return JSON.stringify(userEmail)
}))