const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    registerVisitor,
    getVisitors,
    getVisitorById,
    updateVisitor,
    deleteVisitor
} = require("../controllers/visitorController");

// Register Visitor
router.post("/register", registerVisitor);

// Get All Visitors
router.get("/", protect, getVisitors);

// Get Single Visitor
router.get("/:id", protect, getVisitorById);

// Update Visitor
router.put("/:id", protect, updateVisitor);

// Delete Visitor
router.delete("/:id", protect, deleteVisitor);

module.exports = router;