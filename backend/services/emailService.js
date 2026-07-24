const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVisitorPass = async (
    visitorEmail,
    visitorName,
    pdfPath
) => {

    try {

        console.log("Sending email to:", visitorEmail);
        console.log("PDF Path:", pdfPath);
        console.log("EMAIL_FROM =", process.env.EMAIL_FROM);

        const info = await transporter.sendMail({

            from: `"Visitor Pass Management System" <${process.env.EMAIL_FROM}>`,

            to: visitorEmail,

            subject: "Visitor Pass Approved",

            text: `Hello ${visitorName},

Your appointment has been approved.

Your Visitor Pass is attached with this email.

Please carry this pass while visiting.

Thank You.`,

            attachments: [
                {
                    filename: "VisitorPass.pdf",
                    path: pdfPath
                }
            ]

        });

        console.log("================================");
        console.log("Email Sent Successfully");
        console.log("Message ID:", info.messageId);
        console.log("================================");

    } catch (error) {

        console.log("=========== EMAIL ERROR ===========");
        console.log(error);
        console.log("===================================");

    }

};

module.exports = sendVisitorPass;