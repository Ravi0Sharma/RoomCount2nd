#include "screen_draw.h"
#include "pin.h"
#include "utils.h"
#include "wifi.h"
#include "mqtt.h"  

int previous_count = -1;
int surpassCount = 0;

void setup() {
    tft.begin();
    tft.setRotation(3);
    pinMode(BUZZER_CTR, OUTPUT); //set buzzer pin to output 

    Serial.begin(serial_Begin_Rate); // Start serial communication
    client.setCallback(callback);
    
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
  if (entries_count > max_amount && surpassCount < 3) {
    analogWrite(WIO_BUZZER, 128);
    delay(3000);

    client.publish(TOPIC_PUB_SURPASS, String("1").c_str());
    analogWrite(WIO_BUZZER, 0);
    delay(1000);
    Screen_exceed(); 

  surpassCount++;
  }

  if (entries_count <= max_amount) {
    surpassCount = 0;  
  }

}