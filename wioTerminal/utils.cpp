#include "utils.h"
#include "pin.h"

int serial_Begin_Rate = 9600;

Ultrasonic pinUltraSonic(ULTRASONIC_PIN); // Initialize with ULTRASONIC_PIN from pin.h

    void  entries (){

    long measurement = pinUltraSonic.MeasureInCentimeters(); 

    if (measurement < 15){
    entries_count++; 
    }
   
    delay(500);
}

