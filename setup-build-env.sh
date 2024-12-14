#!/bin/bash

# Ensure Homebrew is installed
if ! command -v brew &>/dev/null; then
  echo "Homebrew not found. Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Update Homebrew
brew update

# Install curl (if not already installed)
if ! command -v curl &>/dev/null; then
  echo "Installing curl..."
  brew install curl
fi

# Install Arduino CLI
echo "Installing Arduino CLI..."
curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh
export PATH=$PATH:$HOME/bin
arduino-cli version

# Configure Arduino CLI for Seeed Wio Terminal
echo "Configuring Arduino CLI for Seeed Wio Terminal..."
printf "board_manager:\n  additional_urls:\n    - https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json\n" > .arduino-cli.yaml
arduino-cli core update-index --config-file .arduino-cli.yaml
arduino-cli core install Seeeduino:samd --config-file .arduino-cli.yaml

# Install 'native' packages (libraries that do not come with the core)
echo "Installing Arduino libraries..."
arduino-cli lib install "PubSubClient@2.8"
arduino-cli lib install "Seeed Arduino rpcWiFi@1.0.7"

echo "Setup complete!"
