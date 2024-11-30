TFT_eSPI tft; // External declaration for TFT_eSPI display object

void Screen_result(int entries_count){
tft.setTextColor(TFT_BLACK);
tft.drawNumber(entries_count,90,95); 

}