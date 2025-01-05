#include "screen_draw.h"
#include "pin.h"
#include "utils.h"
#include "wifi.h"
#include "mqtt.h"  

int previous_count = -1;  /
int surpassCount = 0;     
bool startup = true;      

void setup() {
    tft.begin();
    tft.setRotation(3);
    pinMode(BUZZER_CTR, OUTPUT); // Set buzzer pin to output 

    Serial.begin(serial_Begin_Rate); // Start serial communication
    client.setCallback(callback);

    WiFi_setup();                         // Establish a connection between the Wio Terminal and a WiFi network.
    client.setServer(mqtt_server, 1883);  // Connect to the MQTT Server
}

void loop() {
    if (!client.connected()) {  // Connect to MQTT if not connected
        MQTT_connect();
    }

    client.loop();
    entries();

    if (startup) {
        startup = false;  // Skip the first iteration
        Screen_result(entries_count);
        return;
    }

    if (entries_count != previous_count) {
        Screen_result(entries_count);
        previous_count = entries_count;

        if (entries_count > 0) {  // Only publish meaningful entry counts
            client.publish(TOPIC_PUB_ENTRY, String(entries_count).c_str());
            Serial.println("Sent Entry");
        }
    }

    if (entries_count > max_amount && surpassCount < 1) {
        Screen_exceed();
        analogWrite(WIO_BUZZER, 128);
        delay(3000);

        client.publish(TOPIC_PUB_SURPASS, String("Surpass").c_str());
        analogWrite(WIO_BUZZER, 128);
        delay(2000);

        analogWrite(WIO_BUZZER, 0);
    
        surpassCount++;
        Screen_result(entries_count);
    }

    // Reset surpass flag if back within range
    if (entries_count <= max_amount) {
        surpassCount = 0;
    }
}