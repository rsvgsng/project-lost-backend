const transporter = require('./mailConnect')


async function sendVerification (to,code,link,userID,cat) {
    try {
        a = await   transporter.sendMail({
            from: 'outlook_ECB490032D475A87@outlook.com', // sender address
            to: to, // list of receivers
            subject: "Verification goose", // Subject line
            text: "Thanks for signning up!", // plain text body
            html: `<b>The code to activate your account is ${code}</b> \n Use this link to verify account directly. <a href ="http://localhost:8000/api/v1/verify/email/${cat}/${link}&${userID}" >Link</a>`,
        })

        if(a.messageId !== undefined) return  {msg:`Mail successfull sent to ${to} hash = ${link}`}
        if(a.messageId == undefined) return  {msg:"Failed"}
    } catch (error) {
        return  {msg:"Failed"}
    }
   
    
}
sendVerification()

module.exports = sendVerification