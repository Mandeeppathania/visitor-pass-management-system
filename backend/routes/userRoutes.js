const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

const {
    createUser,
    getEmployees,
    getUsers
} = require("../controllers/userController");

// Admin creates users
router.post(
    "/create",
    protect,
    checkRole("admin"),
    createUser
);

// Public - Employee list for visitor form
router.get(
    "/employees",
    getEmployees
);
// Admin - Get all users
router.get(
    "/",
    protect,
    checkRole("admin"),
    getUsers
);
module.exports = router;