#include "TFT_eSPI.h"
#include "mqtt.h"

extern TFT_eSPI tft; // External declaration for TFT_eSPI display object

extern void Screen_draw(); // External declaration for the Screen_draw() function

extern void Screen_logo(); // External declaration for the Screen_logo() function

extern void Screen_connectingWiFi(); // External declaration for the  Screen_connectingWiFi() function

extern void Screen_connectingMQTT(); // External declaration for the Screen_connectingMQTT() function

extern void Screen_connected(); // External declaration for the Screen_connected() function

// External declaration for the Screen_result()
extern void Screen_result(int entries_count); 

// External declaration for the Screen_connected() function
extern void Screen_connected();