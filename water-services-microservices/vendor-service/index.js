require("dotenv").config();
console.log("JWT Secret from .env:", process.env.JWT_SECRET); // Debugging


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// dotenv.config(); 

const vendorRoutes = require("./src/routes/vendorRoutes");
const connectDB = require("./src/Database/db");
const connectRabbitMQ = require("./src/Database/rabbitmq");


const app = express();
app.use(cors());
app.use(express.json()); 
 
app.use("/", vendorRoutes); 
connectDB();

connectRabbitMQ('vendor', (channel) => {
    channel.consume('vendor', (message) => {
        console.log('Received message:', message.content.toString());
    });
});


const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`✅ Vendor Service running on port ${PORT}`));
