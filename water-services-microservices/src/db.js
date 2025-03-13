const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/water_services"; 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully ✅");
  } catch (error) {
    console.error("MongoDB Connection Failed ❌", error);
    process.exit(1); 
  }
};

module.exports = connectDB;
