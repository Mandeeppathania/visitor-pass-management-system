const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    registerVisitor,
    getVisitors
} = require("../controllers/visitorController");

// Public Route
router.post("/register", registerVisitor);

// Protected Route
router.get("/", protect, getVisitors);

module.exports = router;