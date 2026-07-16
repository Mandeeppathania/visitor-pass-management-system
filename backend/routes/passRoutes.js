const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

const {
    generatePass,
    getAllPasses,
    getPassById
} = require("../controllers/passController");

// Generate Pass
router.post(
    "/generate/:appointmentId",
    protect,
    checkRole("employee", "admin"),
    generatePass
);

// View All Passes
router.get(
    "/",
    protect,
    checkRole("employee", "admin", "security"),
    getAllPasses
);

// View Single Pass
router.get(
    "/:id",
    protect,
    checkRole("employee", "admin", "security"),
    getPassById
);

module.exports = router;