const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

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

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: visitorEmail,

            subject: "Visitor Pass Approved",

            text:
`Hello ${visitorName},

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

        console.log("Email Sent Successfully");

    } catch (error) {

        console.log("Email Error:", error.message);

    }

};

module.exports = sendVisitorPass;