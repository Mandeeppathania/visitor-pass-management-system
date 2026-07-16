const QRCode = require("qrcode");
const path = require("path");

const generateQRCode = async (passNumber) => {

    try {

        const fileName = `${passNumber}.png`;

        const filePath = path.join(
            __dirname,
            "../uploads/qr",
            fileName
        );

        await QRCode.toFile(filePath, passNumber);

        return `uploads/qr/${fileName}`;

    } catch (error) {

        throw error;

    }

};

module.exports = generateQRCode;