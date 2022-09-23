const nodemailer = require("nodemailer");


    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "ghisingrishav@gmail.com",
          pass: "nefindcc135", // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });



    module.exports =transporter



 




