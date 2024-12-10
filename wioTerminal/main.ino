#include "screen_draw.h"
#include "pin.h"
#include "utils.h"
#include "wifi.h"

int previous_count = -1;

void setup() {

    tft.begin();
    tft.setRotation(3);
    
    Serial.begin(serial_Begin_Rate); // Start serial communication
    WiFi_setup();                         // Establishes a connection between the Wio Terminal and a WiFi network.
    client.setServer(mqtt_server, 1883);  // Connect the MQTT Server

}

void loop() {

  if (!client.connected()) {  // Connect to Mqtt if not connected
    MQTT_connect();
  }
  
  client.loop();
  entries (); 
  
  if (entries_count != previous_count) {
    Screen_result(entries_count);
    previous_count = entries_count;
    client.publish(TOPIC_PUB_ENTRY, String(entries_count).c_str());
    Serial.println("Sent Entry");
  } 
    }