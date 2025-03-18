const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    availaibility: {type: String, required: true },
    location: {type: String, required: true }
});

module.exports = mongoose.model("Vendor", VendorSchema);
