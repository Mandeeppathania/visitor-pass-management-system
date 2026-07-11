const express = require("express");

const router = express.Router();

const {
    registerVisitor,
    getVisitors,
    getVisitorById,
    updateVisitor,
    deleteVisitor
} = require("../controllers/visitorController");

const protect = require("../middleware/authMiddleware");

// Register visitor
router.post("/", protect, registerVisitor);

// Get all visitors
router.get("/", protect, getVisitors);
//Get by id
router.get("/:id", protect, getVisitorById);
//Update visitor
router.put("/:id", protect, updateVisitor);
//Delete visitor
router.delete("/:id", protect, deleteVisitor);

module.exports = router;