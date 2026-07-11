const express = require("express");
const cors = require("cors");
const protect = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is working");
});
app.get("/api/test", protect, (req, res) => {

    res.json({
        message: "Protected Route Working",
        user: req.user
    });

});

// Routes for authentication
app.use("/api/auth", authRoutes);

module.exports = app;