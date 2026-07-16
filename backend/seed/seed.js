require("dotenv").config();

const bcrypt = require("bcrypt");

const connectDB = require("../config/db");

const User = require("../models/User");
const Visitor = require("../models/Visitor");
const Appointment = require("../models/Appointment");
const Pass = require("../models/Pass");
const CheckLog = require("../models/CheckLog");

const seedDatabase = async () => {

    try {

        await connectDB();

        console.log("Connected...");

        // Delete old data

        await CheckLog.deleteMany();

        await Pass.deleteMany();

        await Appointment.deleteMany();

        await Visitor.deleteMany();

        await User.deleteMany();

        console.log("Old data removed");

        // Password for all users

        const password = await bcrypt.hash("123456", 10);

        // Create Users

        const admin = await User.create({

            name: "Admin",

            email: "admin@gmail.com",

            password,

            role: "admin",

            department: "Administration"

        });

        const employee = await User.create({

            name: "Rahul Sharma",

            email: "rahul@gmail.com",

            password,

            role: "employee",

            department: "IT"

        });

        const security = await User.create({

            name: "Rohit Kumar",

            email: "rohit@gmail.com",

            password,

            role: "security",

            department: "Security"

        });

        // Create Visitor

        const visitor = await Visitor.create({

            name: "John Doe",

            email: "john@gmail.com",

            phone: "9876543210",

            company: "Google"

        });

        // Create Appointment

        await Appointment.create({

            visitor: visitor._id,

            host: employee._id,

            visitDate: new Date(),

            visitTime: "10:30 AM",

            purpose: "Project Discussion",

            status: "approved"

        });

        console.log("Sample Data Added");

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);

    }

};

seedDatabase();