const mqtt = require('mqtt');
const mqttServer = 'mqtt://broker.hivemq.com';
const mqttPort = 1883;

const client = mqtt.connect(mqttServer, { port: mqttPort });

client.on('connect', () => {
});

// Function to publish to a topic
function publishToTopic(topic, payload) {
    client.publish(topic, payload, function (err) {
        if (err) {
            console.error(`Error publishing to topic ${topic}: ${err}`);
        } else {
            console.log(`Successfully published to topic ${topic}: ${payload}`);
        }
    });
}

// Export the MQTT client and publish function
module.exports = { publishToTopic };
