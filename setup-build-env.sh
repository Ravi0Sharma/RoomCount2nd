apt-get update
cd ~

# Install arduino-cli
apt-get install curl -y
curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh
export PATH=$PATH:/root/bin
arduino-cli -version

# Install Seeed Wio Terminal core
printf "board_manager:\n  additional_urls:\n    - https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json\n" > .arduino-cli.yaml
arduino-cli core update-index --config-file .arduino-cli.yaml
arduino-cli core install Seeeduino:samd --config-file .arduino-cli.yaml

# Install 'native' packages (libraries that do not come with the core)
arduino-cli lib install "PubSubClient@2.8"
arduino-cli lib install "Seeed Arduino rpcWiFi@1.0.7"

apt-get install git -y
#cd arduino-cli config dump | grep sketchbook | sed 's/.*\ //' /libraries
#rm -rf /root/Arduino/libraries/Servo/*
mkdir -p /root/Arduino/libraries
git clone https://github.com/PaintYourDragon/Servo.git /root/Arduino/libraries/Servo
