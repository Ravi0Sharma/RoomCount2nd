#include "PubSubClient.h"   

extern PubSubClient client;  // Declaration of MQTT client object
extern const char* mqtt_server; // MQTT server address

extern void MQTT_connect(); 

extern void callback(char* topic, byte* payload, unsigned int length); // Declaration of MQTT callback function

// topics for sending sensor data
extern const char* TOPIC_PUB_ENTRY; 
extern const char* TOPIC_SUB_MAX;
extern const char* TOPIC_PUB_SURPASS;


