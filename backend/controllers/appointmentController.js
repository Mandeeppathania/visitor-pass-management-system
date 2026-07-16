const Appointment = require("../models/Appointment");
const Visitor = require("../models/Visitor");
const User = require("../models/User");

// Create Appointment
const createAppointment = async (req, res) => {

    try {

        const {
            visitor,
            host,
            visitDate,
            visitTime,
            purpose
        } = req.body;

        // Check if visitor exists
        const visitorExists = await Visitor.findById(visitor);

        if (!visitorExists) {
            return res.status(404).json({
                message: "Visitor not found"
            });
        }

        // Check if selected host is an active employee
        const hostExists = await User.findOne({
            _id: host,
            role: "employee",
            isActive: true
        });

        if (!hostExists) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        // Create appointment
        const appointment = await Appointment.create({
            visitor,
            host,
            visitDate,
            visitTime,
            purpose
        });

        return res.status(201).json({
            message: "Appointment Request Sent Successfully",
            appointment
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

// Get All Appointments
const getAppointments = async (req, res) => {

    try {

        const appointments = await Appointment.find()
            .populate("visitor", "name email phone company")
            .populate("host", "name department email");

        return res.status(200).json(appointments);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

// Get Pending Appointments
const getPendingAppointments = async (req, res) => {

    try {

        const appointments = await Appointment.find({
            status: "pending"
        })
            .populate("visitor", "name email phone company")
            .populate("host", "name department email");

        return res.status(200).json(appointments);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

// Approve Appointment
const approveAppointment = async (req, res) => {

    try {

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        if (appointment.status === "approved") {
            return res.status(400).json({
                message: "Appointment already approved"
            });
        }

        appointment.status = "approved";

        await appointment.save();

        return res.status(200).json({
            message: "Appointment Approved Successfully",
            appointment
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

// Reject Appointment
const rejectAppointment = async (req, res) => {

    try {

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        if (appointment.status === "rejected") {
            return res.status(400).json({
                message: "Appointment already rejected"
            });
        }

        appointment.status = "rejected";

        // Save rejection reason
        appointment.remarks = req.body.remarks || "No reason provided";

        await appointment.save();

        return res.status(200).json({
            message: "Appointment Rejected Successfully",
            appointment
        });

    } catch (error) {

        return res.status(500).json({
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