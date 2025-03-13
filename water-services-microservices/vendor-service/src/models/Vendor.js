// const mongoose = require("mongoose");

// const vendorSchema = new mongoose.schema({
//     name:{
//         type: String,
//         required: true
//     },
//     phoneNumber:{
//         type: Number,
//         required: true,
//         unique: true
//     },
//     password:{
//         type: String,
//         required: true,
//         unique: true
//     }
// })

// module.exports = mongoose.model("Vendor", vendorSchema);


// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const vendorSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },

// });

// // Hash password before saving
// vendorSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Compare hashed password
// vendorSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const Vendor = mongoose.model("Vendor", vendorSchema);
// module.exports = Vendor;

const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model("Vendor", VendorSchema);
