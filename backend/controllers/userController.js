const User = require("../models/User");
const bcrypt = require("bcrypt");

// Create Employee / Security
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

        // Only employee and security can be created
        if (!["employee", "security"].includes(role)) {
            return res.status(400).json({
                message: "Role must be employee or security"
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

        // Don't send password back
        const createdUser = await User.findById(user._id).select("-password");

        return res.status(201).json({
            message: "User Created Successfully",
            user: createdUser
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

// Get all employees
const getEmployees = async (req, res) => {

    try {

        const employees = await User.find({
            role: "employee",
            isActive: true
        }).select("name department email");

        return res.status(200).json(employees);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};
// Get all users (Admin)
const getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        return res.status(200).json(users);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createUser,
    getEmployees,
    getUsers
};