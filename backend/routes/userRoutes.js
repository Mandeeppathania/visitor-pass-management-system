const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

const {
    createUser
} = require("../controllers/userController");

// Only Admin can create users
router.post(
    "/",
    protect,
    checkRole("admin"),
    createUser
);

module.exports = router;