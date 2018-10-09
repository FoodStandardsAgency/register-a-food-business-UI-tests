# echo "Running landingpage test suite on Browserstack"
# ./node_modules/.bin/wdio --suite landingpage --baseUrl https://dev-register-a-food-business.azurewebsites.net/new/ wdio.conf.js
# echo "Running establishment test suite on Browserstack"
# ./node_modules/.bin/wdio --suite establishment --baseUrl https://dev-register-a-food-business.azurewebsites.net/new/ wdio.conf.js
# echo "Running operator test suite on Browserstack"
# ./node_modules/.bin/wdio --suite operator --baseUrl https://dev-register-a-food-business.azurewebsites.net/new/ wdio.conf.js 
echo "Running registrationSubmission test suite on Browserstack"
./node_modules/.bin/wdio --suite registrationSubmission --baseUrl https://dev-register-a-food-business.azurewebsites.net/new/ wdio.conf.js
# echo "Running operatorextra test suite on Browserstack"
# ./node_modules/.bin/wdio --suite operatorextra --baseUrl https://dev-register-a-food-business.azurewebsites.net/new/ wdio.conf.js
# echo "Running websitefeatures test suite on Browserstack"
# ./node_modules/.bin/wdio --suite websitefeatures --baseUrl https://dev-register-a-food-business.azurewebsites.net/new/ wdio.conf.js