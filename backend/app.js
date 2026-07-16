const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userRoutes = require("./routes/userRoutes");
const passRoutes = require("./routes/passRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Backend is working");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/passes", passRoutes);

module.exports = app;