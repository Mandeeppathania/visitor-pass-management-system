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

        // Check if host (employee) exists
        const hostExists = await User.findById(host);

        if (!hostExists) {
            return res.status(404).json({
                message: "Host not found"
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
// Get all appointments
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
// Approve appointment
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

        return res.status(200).json({
            message: "Appointment Approved",
            appointment
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};
// Reject appointment
const rejectAppointment = async (req, res) => {

    try {

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {

            return res.status(404).json({
                message: "Appointment not found"
            });

        }

        appointment.status = "rejected";

        appointment.remarks = req.body.remarks;

        await appointment.save();

        return res.status(200).json({
            message: "Appointment Rejected",
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
    approveAppointment,
    rejectAppointment
};