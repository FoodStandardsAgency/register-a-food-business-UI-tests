URL_ENV="${URL_ENV:-test}"

echo "Running end2end test suite on Browserstack"
./node_modules/.bin/wdio --suite secnariooutline --baseUrl https://${URL_ENV}-register-a-food-business.azurewebsites.net/new/ wdio.conf.js
