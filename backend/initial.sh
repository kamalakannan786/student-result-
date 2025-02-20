#!/bin/bash

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}🚀 Starting project initialization...${NC}"

# Check if Homebrew is installed
if ! command -v brew &>/dev/null; then
    echo -e "${YELLOW}🍺 Homebrew not found. Installing Homebrew...${NC}"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo -e "${GREEN}✅ Homebrew is already installed.${NC}"
fi

# Install Node.js (if not installed)
if ! command -v node &>/dev/null; then
    echo -e "${YELLOW}⬇️ Installing Node.js...${NC}"
    brew install node
else
    echo -e "${GREEN}✅ Node.js is already installed.${NC}"
fi

# Install MongoDB (if not installed)
if ! command -v mongod &>/dev/null; then
    echo -e "${YELLOW}⬇️ Installing MongoDB...${NC}"
    brew tap mongodb/brew
    brew install mongodb-community@7.0
    brew services start mongodb-community@7.0
else
    echo -e "${GREEN}✅ MongoDB is already installed.${NC}"
fi

# Install Nodemon (if not installed)
if ! command -v nodemon &>/dev/null; then
    echo -e "${YELLOW}⬇️ Installing Nodemon...${NC}"
    npm install -g nodemon
else
    echo -e "${GREEN}✅ Nodemon is already installed.${NC}"
fi

# Install project dependencies
echo -e "${YELLOW}📦 Installing project dependencies...${NC}"
npm install

# Seed the database
echo -e "${GREEN}🌱 Seeding database with sample student data...${NC}"
node seed.js

# Completion message
echo -e "${CYAN}🎉 Initialization complete!${NC}"
echo -e "${GREEN}👉 Now run the backend server using: ./run.sh ${NC}"
