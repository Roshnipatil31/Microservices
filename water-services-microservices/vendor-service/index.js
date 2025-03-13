// // const express = require('express');
// // const connectRabbitMQ = require('../src/rabbitmq');
// // const connectDB = require("../src/db");
// // const vendorroutes = require("./src/routes/vendorRoutes");

// // app.use("/vendor", vendorroutes);

// // const app = express();
// // connectDB();

// // connectRabbitMQ('vendor', (channel) => {
// //     channel.consume('vendor', (message) => {
// //         console.log('Received message:', message.content.toString());
// //     });
// // });

// // app.listen(4002, () => {
// //     console.log('Vendor Service listening on port 4002');
// // });

// const express = require("express");
// const dotenv = require("dotenv");
// const connectRabbitMQ = require("../src/rabbitmq"); // Ensure correct path
// const connectDB = require("../src/db"); // Ensure correct path
// const vendorroutes = require("./src/routes/vendorRoutes"); // Correct Import

// dotenv.config(); // Load .env variables

// const app = express(); // ✅ Define app BEFORE using it

// app.use(express.json());

// app.use("/vendor", vendorroutes); // ✅ Now app is defined before usage

// // Connect to MongoDB
// connectDB(); // ✅ Calls the function from db.js

// // Connect to RabbitMQ
// connectRabbitMQ(); // ✅ Calls the function from rabbitmq.js

// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => console.log(`✅ Vendor Service running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables

const vendorRoutes = require("./src/routes/vendorRoutes"); // ✅ Correct import

const app = express();
app.use(express.json()); // ✅ Middleware to parse JSON

// Use the vendor routes
app.use("/vendor", vendorRoutes); // ✅ Correct route prefix

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`✅ Vendor Service running on port ${PORT}`));
