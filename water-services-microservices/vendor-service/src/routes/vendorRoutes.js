// const express = require("express");
// const { signup, login, logout } = require("../controllers/vendorController");

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);

// module.exports = router;


const express = require("express");
const { signupVendor } = require("../controllers/vendorController");

const router = express.Router();

router.post("/signup", signupVendor); // ✅ Defines the route

module.exports = router;
