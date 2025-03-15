const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
require("dotenv").config();

const ADMIN_PHONE = process.env.ADMIN_PHONE || "1234567890"; // Default for first-time setup
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password123"; // Default password

/**
 * @desc Initialize Admin Account (Runs when server starts)
 */
const initializeAdmin = async () => {
  try {
    console.log("Initializing Admin...");

    const existingAdmin = await Admin.findOne({ phone: ADMIN_PHONE });

    if (!existingAdmin) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

      const newAdmin = new Admin({ phone: ADMIN_PHONE, password: hashedPassword });
      await newAdmin.save();

      console.log("✅ Admin account initialized successfully.");
    } else {
      console.log("ℹ️ Admin account already exists.");
    }
  } catch (error) {
    console.error("❌ Error initializing admin:", error);
  }
};

// Run the function when the server starts
initializeAdmin();

/**
 * @desc Login Admin
 * @route POST /admin/login
 * @access Public
 */
const loginAdmin = async (req, res) => {
  try {
    const { phone, password } = req.body;

    console.log("🔹 Received Login Request");
    console.log("📞 Phone:", phone);
    console.log("🔑 Password (plaintext, not recommended to log in production):", password);

    // Check if the admin exists in DB
    const admin = await Admin.findOne({ phone });
    if (!admin) {
      console.log("❌ Admin not found in DB.");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("✅ Admin found in DB:", admin.phone);
    console.log("🔒 Stored Hashed Password:", admin.password);

    // Compare the entered password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ phone: admin.phone }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Login Successful!");
    res.json({ msg: "Login successful", token });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginAdmin };
