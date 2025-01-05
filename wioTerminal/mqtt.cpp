#include "mqtt.h"
#include "WiFi.h" 
#include "utils.h"  
#include "Screen_draw.h"
                      
WiFiClient wioClient;
PubSubClient client(wioClient);

volatile int max_amount = 4;

const char* mqtt_server = "broker.hivemq.com"; // MQTT server address

// Topics for sending sensor data
const char* TOPIC_PUB_ENTRY = "RoomCount/1/entry";
const char* TOPIC_PUB_SURPASS = "RoomCount/1/surpass";
const char* TOPIC_SUB_MAX = "RoomCount/1/SUB_MAX"; 
const char* TOPIC_SUB_RESET = "RoomCount/1/RESET_COUNT";  

// Connect to MQTT broker
void MQTT_connect() {


  Screen_logo();
  Screen_connectingMQTT();
  delay(2000);
  
  
  while (!client.connected()) {
    String clientId = "WioTerminal/RoomCount";
    
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      client.subscribe(TOPIC_SUB_MAX);
      client.subscribe(TOPIC_SUB_RESET);
      
    } else {
      // Attempts to connect to MQTT, updating the display and serial output until successful.
      Serial.print("failed, state=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");

      //Loop attempts to connect to Wi-Fi, updating the display and serial output until successful.
       while (WiFi.status() != WL_CONNECTED){
       delay(500);
      WiFi_setup();
      }
      delay(3000);
      
    }
  }
  // Display and serial output Connected.
  Screen_connected();
  delay(3000);
}

//Handles incoming MQTT messages
void callback(char* topic, byte* payload, unsigned int length) {
  char buff_p[length + 1];
  for (int i = 0; i < length; i++) {
    buff_p[i] = (char)payload[i];
  }
  buff_p[length] = '\0'; // Null-terminate the string

  max_amount = atoi(buff_p); // Convert payload to integer and store in max_amount
  Serial.print("Max Amount Updated: ");
  Serial.println(max_amount);
}