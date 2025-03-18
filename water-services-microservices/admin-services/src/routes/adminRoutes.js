const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

// Admin Login Route
router.post("/login", adminController.loginAdmin);
router.get("/profile", adminController.getAdminProfile);

module.exports = router;
