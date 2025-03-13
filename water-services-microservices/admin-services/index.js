const express = require('express');
const connectRabbitMQ = require('../admin-services/src/Database/rabbitmq');
const router = require('./src/routes/adminRoutes');

const connectDB = require("../admin-services/src/Database/db");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

connectRabbitMQ('admin', (channel) => {
    channel.consume('admin', (message) => {
        console.log('Received message:', message.content.toString());
    });
});

app.listen(4003, () => {
    console.log('Admin Service listening on port 4003');
});