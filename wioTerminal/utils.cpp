#include "utils.h"
#include "pin.h"
#include "mqtt.h"
#include "screen_draw.h"

unsigned long lastMeasurementTime = 0;
const unsigned long cooldownTime = 3000;  // Cooldown period in milliseconds (3 seconds)
int volatile entries_count = 0;
int serial_Begin_Rate = 9600; 

Ultrasonic pinUltraSonic(ULTRASONIC_PIN);

void entries() {

  long measurement = pinUltraSonic.MeasureInCentimeters();

  if (measurement< 15 && measurement > 1) {
    unsigned long currentTime = millis();

    if (currentTime - lastMeasurementTime >= cooldownTime) {
      entries_count++;  // Increment the count (person entered)
      Serial.println(measurement);
      delay(1500);
    }
  }
}
