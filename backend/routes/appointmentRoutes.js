const express = require("express");

const router = express.Router();

const {
    createAppointment
} = require("../controllers/appointmentController");

// Visitor requests an appointment
router.post("/request", createAppointment);

module.exports = router;