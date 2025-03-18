const express = require("express");
const vendorController = require("../controllers/vendorController");
const { authenticateVendor } = require("../../middleware/authmiddleware");
const authMiddleware = require("../../middleware/authmiddleware");

const router = express.Router();

router.post("/signup", vendorController.registerVendor); 
router.post("/login", vendorController.loginVendor);
router.get("/profile", authenticateVendor, vendorController.getVendorProfile);
router.put("/update",authenticateVendor, vendorController.updateVendor);
router.post("/logout", vendorController.logoutVendor);  

module.exports = router;
