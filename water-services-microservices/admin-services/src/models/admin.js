const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Admin", AdminSchema);
