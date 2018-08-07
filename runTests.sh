echo "Running establishmentdetails tests"
./node_modules/.bin/wdio wdio.conf.js --suite establishmentdetails
echo "Running establishmentaddress tests"
./node_modules/.bin/wdio wdio.conf.js --suite establishmentaddress
echo "Running operator tests"
./node_modules/.bin/wdio wdio.conf.js --suite operator
echo "Running operatordetails tests"
./node_modules/.bin/wdio wdio.conf.js --suite operatordetails
echo "Running registration tests"
./node_modules/.bin/wdio wdio.conf.js --suite registration
echo "Running submissions tests"
./node_modules/.bin/wdio wdio.conf.js --suite submission
echo "Running operatorextra tests"
./node_modules/.bin/wdio wdio.conf.js --suite operatorextra
echo "Running websitefeatures tests"
./node_modules/.bin/wdio wdio.conf.js --suite websitefeatures