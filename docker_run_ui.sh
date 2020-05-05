echo "Running all UI test suites"
./node_modules/.bin/wdio run docker.wdio.conf.js --suite landingpage,establishment,operator,registrationSubmission,operatorextra,websitefeatures