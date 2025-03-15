const express = require("express");
const vendorController = require("../controllers/vendorController");

const router = express.Router();

router.post("/signup", vendorController.signupVendor); 
router.post("/login", vendorController.loginVendor);
router.post("/logout", vendorController.logoutVendor);  

module.exports = router;
