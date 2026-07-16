const Visitor = require("../models/Visitor");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Pass = require("../models/Pass");
const CheckLog = require("../models/CheckLog");

const getDashboard = async (req, res) => {

    try {

        const totalVisitors = await Visitor.countDocuments();

        const totalEmployees = await User.countDocuments({
            role: "employee"
        });

        const pendingAppointments = await Appointment.countDocuments({
            status: "pending"
        });

        const approvedAppointments = await Appointment.countDocuments({
            status: "approved"
        });

        const rejectedAppointments = await Appointment.countDocuments({
            status: "rejected"
        });

        const activePasses = await Pass.countDocuments({
            status: "active"
        });

        const expiredPasses = await Pass.countDocuments({
            status: "expired"
        });

        const checkedInVisitors = await CheckLog.countDocuments({
    checkOut: {
        $exists: false
    }
});

        return res.status(200).json({

            totalVisitors,

            totalEmployees,

            pendingAppointments,

            approvedAppointments,

            rejectedAppointments,

            activePasses,

            expiredPasses,

            checkedInVisitors

        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getDashboard
};