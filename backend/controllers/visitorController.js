const Visitor = require("../models/Visitor");

// Register Visitor
const registerVisitor = async (req, res) => {

    try {

        const { name, email, phone, company } = req.body;

        const visitor = await Visitor.create({
            name,
            email,
            phone,
            company
        });

        res.status(201).json({
            message: "Visitor Registered Successfully",
            visitor
        });

    } catch (error) {

        res.status(500).json({
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

module.exports = {
    registerVisitor,
    getVisitors,
    getVisitorById,
    updateVisitor
};