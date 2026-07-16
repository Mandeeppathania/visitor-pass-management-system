const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

const {
    getDashboard
} = require("../controllers/dashboardController");

router.get(
    "/",
    protect,
    checkRole("admin"),
    getDashboard
);

module.exports = router;