const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail.com",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "storywebsite04@gmail.com",
                pass: "ipgkqjkhbeqxnpbq",
            }
        });

        await transporter.sendMail({
            from: "bahajonsroziyev@gmail.com",
            to: email,
            subject: subject,
            text: `${text}`,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;