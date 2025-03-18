const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); 

const vendorRoutes = require("./src/routes/vendorRoutes");
const connectDB = require("./src/Database/db");
const connectRabbitMQ = require("./src/Database/rabbitmq");

const app = express();
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
