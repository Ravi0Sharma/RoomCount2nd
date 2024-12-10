#include"Screen_draw.h"
#include"pin.h"
#include "utils.h"
#include "WiFi.h"

void setup() {

    tft.begin();
    tft.setRotation(3);
    
    Serial.begin(serial_Begin_Rate); // Start serial communication
    WiFi_setup();

}

void loop() {


  Screen_draw();
  Screen_result(entries_count);   
    }