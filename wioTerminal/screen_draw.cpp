#include "Screen_draw.h"
#include "utils.h"
#include "WiFi.h"

TFT_eSPI tft; // External declaration for TFT_eSPI display object

void Screen_connectingWiFi(){
tft.setTextSize(3);
tft.setTextColor(TFT_YELLOW);
tft.setTextSize(2);
tft.setCursor((320 - tft.textWidth("Connecting to Wi-Fi..")) / 2, 25);
tft.print("Connecting to Wi-Fi..");
}
void Screen_connectingMQTT(){
tft.fillScreen(TFT_BLACK);
tft.setTextSize(3);
tft.setTextSize(2);
tft.setCursor((320 - tft.textWidth("Connecting to MQTT")) / 2, 25);
tft.print("Connecting to MQTT");
}

void Screen_connected(){
tft.fillScreen(TFT_BLACK);
tft.setTextColor(TFT_YELLOW);
tft.setTextSize(3);
tft.setCursor((320 - tft.textWidth("Connected!")) / 2, 115);
tft.print("Connected!");
}


void Screen_exceed(){
tft.fillScreen(TFT_RED);
tft.setTextColor(TFT_WHITE);
tft.setTextSize(3);
tft.setCursor((320 - tft.textWidth("ENTRIES Exceeded!")) / 2, 115);
tft.print("ENTRIES Exceeded");
}

void Screen_logo(){
tft.fillScreen(TFT_BLACK);
tft.fillRect(0,65,320,120,TFT_BLACK);  //Fills a blue rectangle at the top of the Wio Terminal screen.
tft.setTextSize(4);
tft.setCursor((320 - tft.textWidth("RoomCount")) / 2, 110);
tft.print("RoomCount");
tft.drawFastHLine(0,100,320,TFT_YELLOW); //Drawing horizontal line
tft.drawFastHLine(0,150,320,TFT_YELLOW); //Drawing horizontal line
}

void Screen_result(int entries_count) {
    tft.fillScreen(TFT_BLACK);

  // Convert entries_count to a String
  String entriesStr = String(entries_count);

  // Calculate and set cursor for the number
  tft.setCursor((450 - tft.textWidth(entriesStr.c_str())) / 2, 115); // Convert to const char*
  tft.setTextSize(3);
  tft.setTextColor(TFT_YELLOW);
   tft.print(entriesStr);

  // Calculate and set cursor for "Entries"
  tft.setCursor((250 - tft.textWidth("Entries:")) / 2, 115);
  tft.print("Entries:");
}