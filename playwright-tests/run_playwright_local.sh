#!/bin/bash

# Playwright Tests Local Execution Script
# This script runs Playwright tests locally using built-in browsers

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== RAFB Playwright Tests Local Execution ===${NC}\n"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Warning: .env file not found. Copying from .env.example${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${YELLOW}Please update .env with your actual values before running tests${NC}"
        exit 1
    else
        echo -e "${RED}Error: .env.example not found${NC}"
        exit 1
    fi
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# Check if Playwright browsers are installed
if [ ! -d "$HOME/.cache/ms-playwright" ] && [ ! -d "$HOME/Library/Caches/ms-playwright" ]; then
    echo -e "${YELLOW}Installing Playwright browsers...${NC}"
    npx playwright install --with-deps
fi

# Parse command line arguments
SUITE=""
PROJECT=""
HEADED=""
DEBUG=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --suite)
            SUITE="$2"
            shift 2
            ;;
        --project)
            PROJECT="$2"
            shift 2
            ;;
        --headed)
            HEADED="--headed"
            shift
            ;;
        --debug)
            DEBUG="--debug"
            shift
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

# Build command
CMD="npx playwright test"

if [ -n "$SUITE" ]; then
    CMD="$CMD tests/$SUITE/"
fi

if [ -n "$PROJECT" ]; then
    CMD="$CMD --project=$PROJECT"
fi

if [ -n "$HEADED" ]; then
    CMD="$CMD $HEADED"
fi

if [ -n "$DEBUG" ]; then
    CMD="$CMD $DEBUG"
fi

echo -e "${GREEN}Running: $CMD${NC}\n"

# Execute tests
eval $CMD

# Show results
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✓ Tests completed successfully${NC}"
    echo -e "${GREEN}View HTML report: npm run show-report${NC}"
else
    echo -e "\n${RED}✗ Tests failed${NC}"
    exit 1
fi
