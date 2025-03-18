const express = require("express");
const Router = express.Router();
const vendorController = require("../controllers/vendorController");
const authmiddleware = require("../../middleware/authmiddleware");

const router = express.Router();

router.post("/signup", vendorController.registerVendor); 
router.post("/login", vendorController.loginVendor);
router.post("/logout", vendorController.logoutVendor); 
router.get("/update", authmiddleware.authenticateVendor, vendorController.updateVendor)

module.exports = router;
