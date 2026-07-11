require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const connectDB = require("../config/db");
const User = require("../models/User");

const createAdmin = async () => {

    try {

        await connectDB();

        const adminExists = await User.findOne({
            email: "admin@gmail.com"
        });

        if (adminExists) {

            console.log("Admin already exists");

            process.exit();

        }

        const hashedPassword = await bcrypt.hash("admin123",10);

        await User.create({

            name: "Admin",

            email: "admin@gmail.com",

            password: hashedPassword,

            role: "admin"

        });

        console.log("Admin Created");

        process.exit();

    }
    catch(error){

        console.log(error.message);

        process.exit(1);

    }

};

createAdmin();