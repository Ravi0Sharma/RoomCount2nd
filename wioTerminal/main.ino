#include "screen_draw.h"
#include "pin.h"
#include "utils.h"
#include "wifi.h"

void setup() {

    tft.begin();
    tft.setRotation(3);
    
    Serial.begin(serial_Begin_Rate); // Start serial communication
    WiFi_setup();                         // Establishes a connection between the Wio Terminal and a WiFi network.
    client.setServer(mqtt_server, 1883);  // Connect the MQTT Server

}

void loop() {

  Screen_result(entries_count);   
    }