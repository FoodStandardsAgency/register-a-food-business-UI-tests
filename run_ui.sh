URL_ENV="${URL_ENV:-test}"

echo "Running all UI test suites"
./node_modules/.bin/wdio --suite landingpage,establishment,operator,registrationSubmission,operatorextra,websitefeatures --baseUrl https://${URL_ENV}-register-a-food-business.azurewebsites.net/new/ wdio.conf.js