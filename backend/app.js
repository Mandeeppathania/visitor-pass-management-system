const express = require("express");
const cors = require("cors");
const protect = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is working");
});

// Routes for authentication
app.use("/api/auth", authRoutes);
app.use("/api/visitors", visitorRoutes);
module.exports = app;