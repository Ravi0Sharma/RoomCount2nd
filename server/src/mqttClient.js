const mqtt = require('mqtt');


const mqttServer = 'broker.hivemq.com';  
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
    // You can process the message here, such as parsing JSON or triggering actions
});

// Example to publish a message to a topic//ksk när max passed 
client.publish('RoomCount/1/entry', 'Someone has entered the room!');

// Handle errors
client.on('error', (err) => {
    console.error('MQTT connection error: ' + err);
});