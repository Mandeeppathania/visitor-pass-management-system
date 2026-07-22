const Appointment = require("../models/Appointment");
const Pass = require("../models/Pass");

const path = require("path");

const generateQRCode = require("../utils/qrGenerator");
const generatePDF = require("../utils/pdfGenerator");
const sendVisitorPass = require("../services/emailService");

// Generate Pass
const generatePass = async (req, res) => {

    try {

        const { appointmentId } = req.params;

        // Find Appointment
        const appointment = await Appointment.findById(appointmentId)
            .populate("visitor")
            .populate("host");

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        // Appointment must be approved
        if (appointment.status !== "approved") {
            return res.status(400).json({
                message: "Appointment is not approved"
            });
        }

        // Check if pass already exists
        const existingPass = await Pass.findOne({
            appointment: appointment._id
        });

        if (existingPass) {
            return res.status(400).json({
                message: "Pass already generated"
            });
        }

        // Generate Pass Number
        const totalPasses = await Pass.countDocuments();

        const year = new Date().getFullYear();
const passNumber = `VP-${year}-${String(totalPasses + 1).padStart(3, "0")}`;

        // Generate QR Code
        const qrPath = await generateQRCode(passNumber);

        // Create Pass
        const pass = await Pass.create({

            appointment: appointment._id,

            passNumber,

            qrCode: qrPath,

            pdf: ""

        });

        // Generate PDF
        const pdfPath = await generatePDF(
            appointment,
            pass
        );

        // Save PDF path
        pass.pdf = pdfPath;

        await pass.save();
        appointment.pass = pass._id;

await appointment.save();

        // Send Email
        await sendVisitorPass(

            appointment.visitor.email,

            appointment.visitor.name,

            path.join(__dirname, "..", pdfPath)

        );

        return res.status(201).json({

            message: "Pass Generated Successfully",

            pass

        });

    } catch (error) {

        return res.status(500).json({

            message: error.message

        });

    }

};

// Get All Passes
const getAllPasses = async (req, res) => {

    try {

        const passes = await Pass.find()
            .populate({
                path: "appointment",
                populate: [
                    {
                        path: "visitor"
                    },
                    {
                        path: "host"
                    }
                ]
            });

        return res.status(200).json(passes);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

// Get Single Pass
const getPassById = async (req, res) => {

    try {

        const pass = await Pass.findById(req.params.id)
            .populate({
                path: "appointment",
                populate: [
                    {
                        path: "visitor"
                    },
                    {
                        path: "host"
                    }
                ]
            });

        if (!pass) {

            return res.status(404).json({
                message: "Pass not found"
            });

        }

        return res.status(200).json(pass);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    generatePass,
    getAllPasses,
    getPassById
};