 const amqp = require('amqplib');
 const dotenv = require('dotenv');
 dotenv.config();
 

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqps://ptlzfjzs:i4WN7QK4IklWCapW1pR02lstp_kElC40@duck.lmq.cloudamqp.com/ptlzfjzs';
 
 async function connectRabbitMQ() {
     try {
         const connection = await amqp.connect(RABBITMQ_URL);
         const channel = await connection.createChannel();
         console.log('✅ Connected to CloudAMQP');
         return channel;
     } catch (error) {
         console.error('❌ RabbitMQ connection error:', error);
     }
 }
 
 module.exports = connectRabbitMQ;