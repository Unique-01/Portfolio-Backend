const nodemailer = require("nodemailer");
require("dotenv").config();

const sendContactMail = (name, email, message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        transporter.sendMail(
            {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: "You have a new contact",
                html: `<h3>Name: ${name}</h3> <h4>Email: ${email}</h4> <p>${message}</p>`,
            },
            (err, info) => {
                if (err) {
                    console.error("Failed to send email", err);
                } else {
                    console.log("Email sent successfully", info.response);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendContactMail;
