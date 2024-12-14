# Update Homebrew (macOS package manager)
brew update

# Install curl (if not already installed)
brew install curl

# Install arduino-cli
curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh
export PATH=$PATH:$HOME/bin
arduino-cli version

# Install Seeed Wio Terminal core
printf "board_manager:\n  additional_urls:\n    - https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json\n" > .arduino-cli.yaml
arduino-cli core update-index --config-file .arduino-cli.yaml
arduino-cli core install Seeeduino:samd --config-file .arduino-cli.yaml

# Install 'native' packages (libraries that do not come with the core)
arduino-cli lib install "PubSubClient@2.8"
arduino-cli lib install "Seeed Arduino rpcUnified@2.1.4"
arduino-cli lib install "Seeed Arduino rpcWiFi@1.0.7"
arduino-cli lib install "Seeed Arduino SFUD@2.0.2"
arduino-cli lib install "Seeed_Arduino_mbedtls@3.0.1"
arduino-cli lib install "ArduinoSTL"
arduino-cli lib install "WiFiNINA"
arduino-cli lib install "Seeed Arduino rpcBLE@1.0.0"

# Install Git (if not already installed)
brew install git

# Clone the Servo library
mkdir -p $HOME/Arduino/libraries
git clone https://github.com/PaintYourDragon/Servo.git $HOME/Arduino/libraries/Servo