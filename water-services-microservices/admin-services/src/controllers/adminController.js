const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
require("dotenv").config();

const ADMIN_PHONE = process.env.ADMIN_PHONE ; // Default for first-time setup
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ; // Default password

/**
 * @desc Initialize Admin Account (Runs when server starts)
 */
exports.initializeAdmin = async () => {
  try {

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
exports.initializeAdmin();

/**
 * @desc Login Admin
 * @route POST /admin/login
 * @access Public
 */
exports.loginAdmin = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const admin = await Admin.findOne({ phone });
    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      success: true,
      message: "Login successful",
      token,
      admin: { id: admin._id, phone: admin.phone },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.adminId).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
