const Appointment = require("../models/Appointment");
const Visitor = require("../models/Visitor");
const User = require("../models/User");

// Create Appointment (Public Request)
const createAppointment = async (req, res) => {
    try {

        const {
            name,
            email,
            phone,
            company,
            host,
            visitDate,
            visitTime,
            purpose
        } = req.body;

        // Basic validation
        if (
            !name ||
            !email ||
            !phone ||
            !host ||
            !visitDate ||
            !visitTime ||
            !purpose
        ) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        // Check employee
        const hostExists = await User.findOne({
            _id: host,
            role: "employee",
            isActive: true
        });

        if (!hostExists) {
            return res.status(404).json({
                message: "Selected employee not found"
            });
        }

        // Find visitor by email
        let visitor = await Visitor.findOne({ email });

        // Create visitor if not found
        if (!visitor) {
            visitor = await Visitor.create({
                name,
                email,
                phone,
                company
            });
        }

        // Create appointment
        const appointment = await Appointment.create({
            visitor: visitor._id,
            host,
            visitDate,
            visitTime,
            purpose
        });

        res.status(201).json({
            message: "Appointment Request Submitted Successfully",
            appointment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Appointments
const getAppointments = async (req, res) => {

    try {

        const appointments = await Appointment.find()
            .populate("visitor", "name email phone company")
            .populate("host", "name department email")
            .sort({ createdAt: -1 });

        res.json(appointments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Pending Appointments
const getPendingAppointments = async (req, res) => {

    try {

        const appointments = await Appointment.find({
            status: "pending"
        })
            .populate("visitor", "name email phone company")
            .populate("host", "name department email")
            .sort({ createdAt: -1 });

        res.json(appointments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Approve
const approveAppointment = async (req, res) => {

    try {

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        appointment.status = "approved";

        await appointment.save();

        res.json({
            message: "Appointment Approved Successfully",
            appointment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Reject
const rejectAppointment = async (req, res) => {

    try {

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        appointment.status = "rejected";
        appointment.remarks = req.body.remarks || "";

        await appointment.save();

        res.json({
            message: "Appointment Rejected Successfully",
            appointment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createAppointment,
    getAppointments,
    getPendingAppointments,
    approveAppointment,
    rejectAppointment
};