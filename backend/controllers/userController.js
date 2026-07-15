const User = require("../models/User");
const bcrypt = require("bcrypt");

// Create Employee
const createUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role,
            phone,
            department
        } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            department
        });

        return res.status(201).json({
            message: "User Created Successfully",
            user
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createUser
};