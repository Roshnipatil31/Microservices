const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String},
    availaibility: {type: String },
    location: {type: String }
});

module.exports = mongoose.model("Vendor", VendorSchema);
