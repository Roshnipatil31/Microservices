const mongoose = require("mongoose");

// Generate time slots dynamically from 9 AM to 9 PM (1-hour slots)
const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const startHour = 9 + i;
    const endHour = startHour + 1;
    return `${startHour.toString().padStart(2, "0")}:00 AM - ${endHour.toString().padStart(2, "0")}:00 AM`
        .replace("12:00 AM", "12:00 PM")
        .replace("13:00 AM", "01:00 PM")
        .replace("14:00 AM", "02:00 PM")
        .replace("15:00 AM", "03:00 PM")
        .replace("16:00 AM", "04:00 PM")
        .replace("17:00 AM", "05:00 PM")
        .replace("18:00 AM", "06:00 PM")
        .replace("19:00 AM", "07:00 PM")
        .replace("20:00 AM", "08:00 PM")
        .replace("21:00 AM", "09:00 PM");
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { 
        type: Number, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Ensures exactly 10 digits
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    currentLocation: { type: String, required: true }, // Store latitude & longitude as URL
    typeAddressLocation: { type: String, required: true }, // User-typed location
    capacityOfWaterCan: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Fetch from product
    quantityOfWaterCan: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Fetch from product
    selectedVendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true }, // Fetch from vendor
    selectedTimeSlot: { 
        type: String, 
        required: true,
        enum: timeSlots // Using dynamically generated slots
    },
    feedback: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback", required: true } // User feedback
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
