echo "Running all UI test suites locally"
./node_modules/.bin/wdio --suite landingpage,establishment,operator,registrationSubmission,operatorextra,websitefeatures --baseUrl https://dev-register-a-food-business-double.azurewebsites.net/new/ wdio.conf.js