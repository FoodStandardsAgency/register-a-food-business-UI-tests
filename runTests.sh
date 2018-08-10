echo "Running landingpage tests"
./node_modules/.bin/wdio wdio.conf.js --suite landingpage
echo "Running establishment tests"
./node_modules/.bin/wdio wdio.conf.js --suite establishment
echo "Running operator tests"
./node_modules/.bin/wdio wdio.conf.js --suite operator

echo "Running registrationSubmission tests"
./node_modules/.bin/wdio wdio.conf.js --suite registrationSubmission

echo "Running operatorextra tests"
./node_modules/.bin/wdio wdio.conf.js --suite operatorextra
echo "Running websitefeatures tests"
./node_modules/.bin/wdio wdio.conf.js --suite websitefeatures