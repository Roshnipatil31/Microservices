const jwt = require("jsonwebtoken");
const { Vendor } = require("../src/models/Vendor");

exports.authenticateVendor = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.vendor = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};


