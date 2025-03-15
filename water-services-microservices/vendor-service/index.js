const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); 

const vendorRoutes = require("./src/routes/vendorRoutes");

const app = express();
app.use(express.json()); 
 
app.use("/", vendorRoutes); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`✅ Vendor Service running on port ${PORT}`));
