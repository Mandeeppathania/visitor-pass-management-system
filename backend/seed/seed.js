require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const connectDB = require("../config/db");

const User = require("../models/User");

const seedUsers = async () => {

    try {

        await connectDB();

        // Delete old users
        await User.deleteMany();

        // Hash passwords
        const password = await bcrypt.hash("123456", 10);

        // Insert users
        await User.insertMany([

            {
                name: "Admin",
                email: "admin@gmail.com",
                password,
                role: "admin",
                phone: "9999999999",
                department: "Administration"
            },

            {
                name: "Rahul Sharma",
                email: "rahul@gmail.com",
                password,
                role: "employee",
                phone: "9876543210",
                department: "IT"
            },

            {
                name: "Priya Singh",
                email: "priya@gmail.com",
                password,
                role: "employee",
                phone: "9876543211",
                department: "HR"
            },

            {
                name: "Aman Verma",
                email: "aman@gmail.com",
                password,
                role: "employee",
                phone: "9876543212",
                department: "Finance"
            },

            {
                name: "Rohit Kumar",
                email: "rohit@gmail.com",
                password,
                role: "security",
                phone: "9876543213",
                department: "Security"
            }

        ]);

        console.log("Users Added Successfully");

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);

    }

};

seedUsers();