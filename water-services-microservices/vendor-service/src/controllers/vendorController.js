// const Vendor = require("../models/Vendor");
// const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcryptjs");

// // Generate JWT Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
// };

// const signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     let vendor = await Vendor.findOne({ email });

//     if (vendor) {
//       return res.status(400).json({ message: "Vendor already exists" });
//     }

//     vendor = await Vendor.create({ name, email, password });

//     res.status(201).json({
//       _id: vendor.id,
//       name: vendor.name,
//       email: vendor.email,
//       token: generateToken(vendor.id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const vendor = await Vendor.findOne({ email });

//     if (!vendor) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await vendor.matchPassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     res.json({
//       _id: vendor.id,
//       name: vendor.name,
//       email: vendor.email,
//       token: generateToken(vendor.id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const logout = async (req, res) => {
//   res.json({ message: "Logout successful" });
// };

// module.exports = { signup, login, logout };


const Vendor = require("../models/Vendor"); // ✅ Correct path
const bcrypt = require("bcrypt"); // ✅ Make sure bcrypt is installed
const jwt = require("jsonwebtoken"); // ✅ Make sure jsonwebtoken is installed
require("dotenv").config(); // ✅ Load environment variables


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

