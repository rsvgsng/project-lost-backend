const nodemailer = require("nodemailer");


    let transporter = nodemailer.createTransport({
        host: "mail.confess24.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "_mainaccount@confess24.com",
          pass: "Nefindcc!@#$%6789", // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });



    module.exports =transporter



 




