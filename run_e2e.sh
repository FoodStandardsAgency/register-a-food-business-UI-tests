URL_ENV="${URL_ENV:-test}"

echo "Running end2end test suite"
./node_modules/.bin/wdio --suite end2end --baseUrl https://${URL_ENV}-register-a-food-business.azurewebsites.net/new/ wdio.conf.js