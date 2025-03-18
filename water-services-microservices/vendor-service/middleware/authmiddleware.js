const jwt = require("jsonwebtoken");
const Vendor = require("../src/models/Vendor");


module.exports.authenticateVendor = (req, res, next) => {
    const token = req.header("Authorization");

    console.log("Received Token:", token); // Debugging line

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        // Ensure "Bearer" is case-insensitive
        const tokenWithoutBearer = token.replace(/Bearer\s+/i, "").trim();
        console.log("Token after removing 'Bearer':", tokenWithoutBearer); // Debugging line

        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET); // Ensure the secret matches
        console.log("Decoded Token:", decoded); // Debugging line

        req.vendor = { vendorId: decoded.id }; // Ensure the token payload contains 'id'
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // Debugging
        res.status(401).json({ message: "Invalid Token" });
    }
};
