const Vendor = require("../models/Vendor"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
require("dotenv").config(); 


exports.signupVendor = async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        // Check if vendor already exists
        const existingVendor = await Vendor.findOne({ phone });
        if (existingVendor) {
            return res.status(400).json({ message: "Vendor already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new vendor
        const newVendor = new Vendor({ name, phone, password: hashedPassword });
        await newVendor.save();

        res.status(201).json({ message: "Vendor registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
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

exports.logoutVendor = async (req, res) => {
    try {
        // Invalidate token logic (if using Redis or a blacklist system)
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
