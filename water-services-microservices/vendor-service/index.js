const express = require('express');
const connectRabbitMQ = require('../src/rabbitmq');

const app = express();

connectRabbitMQ('vendor', (channel) => {
    channel.consume('vendor', (message) => {
        console.log('Received message:', message.content.toString());
    });
});

app.listen(4002, () => {
    console.log('User Service listening on port 4002');
});

