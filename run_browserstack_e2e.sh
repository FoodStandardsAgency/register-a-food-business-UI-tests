#!/usr/bin/env bash
echo "Running end2end test suite on Browserstack"
./node_modules/.bin/wdio --suite end2end --baseUrl https://dev-register-a-food-business.azurewebsites.net/new/ wdio.conf.js
