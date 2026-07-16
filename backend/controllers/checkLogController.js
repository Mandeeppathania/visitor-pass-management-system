const Pass = require("../models/Pass");
const CheckLog = require("../models/CheckLog");

// Visitor Check In
const checkIn = async (req, res) => {

    try {

        const { passNumber } = req.body;

        // Find pass
        const pass = await Pass.findOne({ passNumber });

        if (!pass) {
            return res.status(404).json({
                message: "Pass not found"
            });
        }

        // Pass must be active
        if (pass.status !== "active") {
            return res.status(400).json({
                message: "Pass is not active"
            });
        }

        // Visitor already entered
        if (pass.isUsed) {
            return res.status(400).json({
                message: "Visitor already checked in"
            });
        }

        // Create check in log
        const log = await CheckLog.create({
            pass: pass._id,
            checkIn: new Date()
        });

        // Update pass
        pass.isUsed = true;
        await pass.save();

        return res.status(201).json({
            message: "Visitor Checked In Successfully",
            log
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

// Visitor Check Out
const checkOut = async (req, res) => {

    try {

        const { passNumber } = req.body;

        // Find pass
        const pass = await Pass.findOne({ passNumber });

        if (!pass) {
            return res.status(404).json({
                message: "Pass not found"
            });
        }

        // Find check in record
        const log = await CheckLog.findOne({
            pass: pass._id
        });

        if (!log) {
            return res.status(404).json({
                message: "Visitor has not checked in"
            });
        }

        // Already checked out
        if (log.checkOut) {
            return res.status(400).json({
                message: "Visitor already checked out"
            });
        }

        // Update checkout time
        log.checkOut = new Date();
        await log.save();

        // Mark pass as expired
        pass.status = "expired";
        await pass.save();

        return res.status(200).json({
            message: "Visitor Checked Out Successfully",
            log
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

// View All Check Logs
const getAllLogs = async (req, res) => {

    try {

        const logs = await CheckLog.find()
            .populate({
                path: "pass",
                populate: {
                    path: "appointment",
                    populate: [
                        {
                            path: "visitor"
                        },
                        {
                            path: "host"
                        }
                    ]
                }
            });

        return res.status(200).json(logs);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

// Get Single Check Log
const getLogById = async (req, res) => {

    try {

        const log = await CheckLog.findById(req.params.id)
            .populate({
                path: "pass",
                populate: {
                    path: "appointment",
                    populate: [
                        {
                            path: "visitor"
                        },
                        {
                            path: "host"
                        }
                    ]
                }
            });

        if (!log) {
            return res.status(404).json({
                message: "Log not found"
            });
        }

        return res.status(200).json(log);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    checkIn,
    checkOut,
    getAllLogs,
    getLogById
};