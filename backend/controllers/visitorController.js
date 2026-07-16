const Visitor = require("../models/Visitor");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

// Register Visitor
const registerVisitor = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            company,
            photo
        } = req.body;

        // Check if visitor already exists
        let visitor = await Visitor.findOne({ email });

        if (!visitor) {

            visitor = await Visitor.create({
                name,
                email,
                phone,
                company,
                photo
            });

        }

        return res.status(201).json({
            message: "Visitor Registered Successfully",
            visitor
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

// Get all visitors
const getVisitors = async (req, res) => {

    try {

        const visitors = await Visitor.find();

        res.status(200).json(visitors);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Get one visitor
const getVisitorById = async (req, res) => {

    try {

        const visitor = await Visitor.findById(req.params.id);

        if (!visitor) {
            return res.status(404).json({
                message: "Visitor not found"
            });
        }

        res.status(200).json(visitor);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Update Visitor
const updateVisitor = async (req, res) => {

    try {

        const visitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!visitor) {

            return res.status(404).json({
                message: "Visitor not found"
            });

        }

        res.status(200).json({
            message: "Visitor Updated",
            visitor
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Delete Visitor
const deleteVisitor = async (req, res) => {

    try {

        const visitor = await Visitor.findByIdAndDelete(req.params.id);

        if (!visitor) {

            return res.status(404).json({
                message: "Visitor not found"
            });

        }

        res.status(200).json({
            message: "Visitor Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    registerVisitor,
    getVisitors,
    getVisitorById,
    updateVisitor,
    deleteVisitor
};