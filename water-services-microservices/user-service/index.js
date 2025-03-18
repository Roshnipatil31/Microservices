const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./src/routes/userRoutes");

const app = express();
app.use(express.json()); 

app.use("/", userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.listen(4001, () => {
    console.log('User Service listening on port 4001');
});