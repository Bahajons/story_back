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
                pass: "wbtidjlmqglaponz",
            }
        });

        await transporter.sendMail({
            from: "storywebsite04@gmail.com",
            to: email,
            subject: subject,
            text: `http://${text}`,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;