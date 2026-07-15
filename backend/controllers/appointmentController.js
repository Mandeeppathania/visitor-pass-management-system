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

module.exports = {
    createAppointment
};