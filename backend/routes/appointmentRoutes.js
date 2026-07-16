const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const checkRole = require("../middleware/roleMiddleware");

const {

    createAppointment,

    getAppointments,

    approveAppointment,

    rejectAppointment

} = require("../controllers/appointmentController");

// Visitor requests appointment
router.post("/request", createAppointment);

// Employee/Admin
router.get("/", protect, getAppointments);

router.put(
    "/:id/approve",
    protect,
    checkRole("employee", "admin"),
    approveAppointment
);

router.put(
    "/:id/reject",
    protect,
    checkRole("employee", "admin"),
    rejectAppointment
);

module.exports = router;