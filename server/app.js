var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
const axios = require('axios');
require('dotenv').config();

var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/RoomCount';
var port = process.env.PORT || 3000;
var app = express();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(cors()); // Enable CORS

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


client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    
    client.subscribe('RoomCount/1/entry', (err) => {
        if (!err) {
            console.log('Subscribed to RoomCount/1/entry');
        } else {
            console.log('Failed to subscribe: ' + err);
        }
    });
});

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Add client to SSE clients list
    sseClients.push(res);

    // Send an initial message (optional)
    res.write('data: {"message": "Connected to server"}\n\n');

    // Clean up when the client disconnects
    req.on('close', () => {
        sseClients = sseClients.filter((client) => client !== res);
    });
});

// Broadcasting MQTT messages to SSE clients
client.on('message', (topic, message) => {
    const payload = { topic, message: message.toString() };
    console.log(`Broadcasting: ${JSON.stringify(payload)}`);
    sseClients.forEach((res) => {
        res.write(`data: ${JSON.stringify(payload)}\n\n`);
    });
});


function publishToTopic(topic, payload) {
    client.publish(topic, payload, function (err) {
        if (err) {
            console.error(`Error publishing to topic ${topic}: ${err}`);
        }
    });
}

/*
// Define the /entries/maxset route directly in app.js
app.post('/api/entries/maxset', async (req, res) => {
    try {
        const { value } = req.body;

        if (typeof value === 'number') {
            const topic = 'RoomCount/1/SUB_MAX';
            const payload = value.toString();

            // Publish the payload to MQTT
            publishToTopic(topic, payload);

            res.status(200).json({
                message: 'maxSet updated and published successfully!',
                maxSet: value,
            });
        } else {
            res.status(400).json({
                message: 'Invalid value. "value" must be a number.',
            });
        }
    } catch (err) {
        console.error('Error occurred while setting maxSet:', err);
        res.status(500).json({
            message: 'An error occurred while processing the request.',
            error: err.message,
        });
    }
});
*/

// Handle errors
client.on('error', (err) => {
    console.error('MQTT connection error: ' + err);
});


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

module.exports = { app, publishToTopic };