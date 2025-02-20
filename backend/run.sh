#!/bin/bash

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🚀 Running the backend server...${NC}"

# Start the server
echo -e "${GREEN}🔥 Server is starting...${NC}"
node server.js
