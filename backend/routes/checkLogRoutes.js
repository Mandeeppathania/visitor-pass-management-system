const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

const {
    checkIn,
    checkOut,
    getAllLogs,
    getLogById
} = require("../controllers/checkLogController");

// Security can check visitors in
router.post(
    "/checkin",
    protect,
    checkRole("security"),
    checkIn
);

// Security can check visitors out
router.post(
    "/checkout",
    protect,
    checkRole("security"),
    checkOut
);

// Admin can view all logs
router.get(
    "/",
    protect,
    checkRole("admin"),
    getAllLogs
);

// Admin can view one log
router.get(
    "/:id",
    protect,
    checkRole("admin"),
    getLogById
);

module.exports = router;