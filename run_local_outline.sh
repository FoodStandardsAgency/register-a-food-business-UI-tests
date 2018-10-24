#!/usr/bin/env bash
echo "Running end2end test suite locally"
./node_modules/.bin/wdio --suite secnariooutline --baseUrl https://test-register-a-food-business.azurewebsites.net/new/ wdio.conf.js
