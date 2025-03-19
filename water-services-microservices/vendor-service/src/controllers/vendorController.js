const Vendor = require("../models/Vendor"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
require("dotenv").config(); 


exports.registerVendor = async (req, res) => {
    const { name, phone, password } = req.body;
    console.log("Incoming Data:", req.body); // Debugging Line

    try {
        let existingVendor = await Vendor.findOne({ phone });
        if (existingVendor) return res.status(400).json({ message: "Vendor already exists" });

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new Vendor
        const vendor = new Vendor({ 
            name, phone, password: hashedPassword
        });

        await vendor.save();
        res.status(201).json({ message: "Vendor registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.loginVendor = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Check if vendor exists
        const vendor = await Vendor.findOne({ phone });
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, vendor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};


// Update Vendor Details (Protected Route)
exports.updateVendor = async (req, res) => {
    try {
        console.log("Vendor ID from token:", req.vendor.vendorId); // Debugging line

        const updatedVendor = await Vendor.findByIdAndUpdate(
            req.vendor.vendorId,
            req.body,
            { new: true, runValidators: true }
        ).select("-password");

        res.json(updatedVendor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logoutVendor = async (req, res) => {
    try {
        // Invalidate token logic (if using Redis or a blacklist system)
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
