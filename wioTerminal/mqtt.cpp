#include "mqtt.h"
#include "WiFi.h" 
#include "utils.h"  
#include "Screen_draw.h"
                      
WiFiClient wioClient;
PubSubClient client(wioClient);

int max_amount = 0; 

const char* mqtt_server = "broker.hivemq.com"; // MQTT server address

// Topics for sending sensor data
const char* TOPIC_PUB_ENTRY = "RoomCount/1/entry";
const char* TOPIC_PUB_SURPASS = "RoomCount/1/surpass";
const char* TOPIC_SUB_MAX = "RoomCount/1/max_amount"; 

// Connect to MQTT broker
void MQTT_connect() {


  tft.fillScreen(TFT_WHITE);
  Screen_logo();
  Screen_connectingMQTT();
  delay(2000);
  
  
  while (!client.connected()) {
    String clientId = "WioTerminal/RoomCount";
    
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      client.subscribe(TOPIC_SUB_MAX);
      
    } else {
      // Attempts to connect to MQTT, updating the display and serial output until successful.
      Serial.print("failed, state=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");

      //Loop attempts to connect to Wi-Fi, updating the display and serial output until successful.
       while (WiFi.status() != WL_CONNECTED){
       delay(500);
       tft.fillScreen(TFT_WHITE);
      delay(1000);
      WiFi_setup();
      }
      delay(3000);
      
    }
  }
  // Display and serial output Connected.
  tft.fillScreen(TFT_WHITE);
  Screen_connected();
  delay(4000);
  tft.fillScreen(TFT_WHITE);
}


//Handles incoming MQTT messages
void callback(char* topic, byte* payload, unsigned int length) {
 
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  char buff_p[length];
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    buff_p[i] = (char)payload[i];
  }

 if (strcmp(topic, TOPIC_SUB_MAX) == 0) {
    Serial.println("Max amount Set");

  // Parse the max amount from the payload
    int max_amount = atoi(buff_p); // Convert payload string to integer
    Serial.print("Max Amount: ");
    Serial.println(max_amount);
}

}