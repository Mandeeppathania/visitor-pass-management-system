const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generatePDF = (appointment, pass) => {

    return new Promise((resolve, reject) => {

        try {

            const fileName = `${pass.passNumber}.pdf`;

            const filePath = path.join(
                __dirname,
                "../uploads/passes",
                fileName
            );

            const doc = new PDFDocument();

            const stream = fs.createWriteStream(filePath);

            doc.pipe(stream);

            doc.fontSize(22).text("VISITOR PASS", {
                align: "center"
            });

            doc.moveDown();

            doc.fontSize(14);

            doc.text(`Pass Number : ${pass.passNumber}`);

            doc.text(`Visitor : ${appointment.visitor.name}`);

            doc.text(`Company : ${appointment.visitor.company}`);

            doc.text(`Host : ${appointment.host.name}`);

            doc.text(`Department : ${appointment.host.department}`);

            doc.text(`Visit Date : ${appointment.visitDate.toDateString()}`);

            doc.text(`Visit Time : ${appointment.visitTime}`);

            doc.text(`Purpose : ${appointment.purpose}`);

            doc.moveDown();

            doc.text(`QR Code`);

            doc.image(
                path.join(
                    __dirname,
                    "../",
                    pass.qrCode
                ),
                {
                    width:120
                }
            );

            doc.end();

            stream.on("finish", () => {

                resolve(`uploads/passes/${fileName}`);

            });

        }

        catch(error){

            reject(error);

        }

    });

};

module.exports = generatePDF;