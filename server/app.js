var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();

var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/RoomCount';
var port = process.env.PORT || 3000;
var app = express();

// Connect to MongoDB
mongoose.connect(mongoURI).catch(function (err) {
    console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
    console.error(err.stack);
    process.exit(1);
}).then(function () {
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

const mqtt = require('mqtt');
const mqttServer = 'mqtt://broker.hivemq.com'; 
const mqttPort = 1883; 

// Connect to the MQTT broker
const client = mqtt.connect(mqttServer, { port: mqttPort });

// When connected
client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    
    // Subscribe to a topic
    client.subscribe('RoomCount/1/entry', (err) => {
        if (!err) {
            console.log('Subscribed to RoomCount/1/entry');
        } else {
            console.log('Failed to subscribe: ' + err);
        }
    });
});

// When a message is received
client.on('message', (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);
    // lägg till function för hantera recived
});

// ksk när max har passat 
client.publish('RoomCount/1/', ' room!');

// Handle errors
client.on('error', (err) => {
    console.error('MQTT connection error: ' + err);
});


// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(cors()); // Enable CORS

// Import and use routes
const usersController = require('./src/controllers/users');
app.use('/api', usersController); // Mount the usersController on /api/users

// 404 Handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;