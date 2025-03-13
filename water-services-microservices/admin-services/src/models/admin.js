const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define Admin Schema
const adminSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create and export Admin model
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
