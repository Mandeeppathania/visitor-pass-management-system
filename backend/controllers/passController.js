const Appointment = require("../models/Appointment");
const generateQRCode = require("../utils/qrGenerator");
const Pass = require("../models/Pass");

// Generate Pass
const generatePass = async (req, res) => {

    try {

        // Get appointment id
        const { appointmentId } = req.params;

        // Find appointment
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
            appointment: appointmentId
        });

        if (existingPass) {
            return res.status(400).json({
                message: "Pass already generated"
            });
        }

        // Generate Pass Number
        const count = await Pass.countDocuments();

        const passNumber =
            `VP-2026-${String(count + 1).padStart(3, "0")}`;

        // Create pass
        const qrPath = await generateQRCode(passNumber);

const pass = await Pass.create({

    appointment: appointment._id,

    passNumber,

    qrCode: qrPath,

    pdf: ""

});

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