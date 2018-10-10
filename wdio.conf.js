require("dotenv").config();

let browserOptions;
if (process.env.TEST_LOCALLY) {
  browserOptions = [{ browserName: "chrome" }];
} else {
  browserOptions = [
    {
      os: "OS X",
      os_version: "High Sierra",
      browserName: "Chrome",
      browser_version: "67.0",
      maxInstances: 1
    },
    {
      os: "OS X",
      os_version: "High Sierra",
      browserName: "Firefox",
      browser_version: "61.0",
      maxInstances: 1
    },
    {
      os: "OS X",
      os_version: "High Sierra",
      browserName: "Safari",
      browser_version: "11.1",
      maxInstances: 1
    },
    {
      os: "Windows",
      os_version: "10",
      browserName: "IE",
      browser_version: "11.0",
      maxInstances: 1,
      "browserstack.selenium_version": "2.53.1",
      "browserstack.ie.arch": "x32",
      "browserstack.ie.driver": "2.53.1"
    },
    {
      os: "Windows",
      os_version: "10",
      browserName: "Edge",
      browser_version: "17.0",
      maxInstances: 1,
      resolution: "2048x1536",
      "browserstack.selenium_version": "2.53.1",
      "browserstack.edge.enablePopups": "true"
    }
  ];
}

let browserstackAuth;
if (process.env.TEST_LOCALLY) {
  browserstackAuth = {};
} else {
  browserstackAuth = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY
  };
}

exports.config = {
  ...browserstackAuth,
  suites: {
    landingpage: ["./src/features/**/landingPage.feature"],
    establishment: [
      "./src/features/**/establishmentContactDetails.feature",
      "./src/features/**/establishmentOpeningDate.feature",
      "./src/features/**/establishmentTradingName.feature",
      "./src/features/**/establishmentAddress.feature",
      "./src/features/**/establishmentAddressType.feature",
      "./src/features/**/establishmentOpeningDays.feature"
    ],
    operator: [
      "./src/features/**/operatorAddress.feature",
      "./src/features/**/operatorName.feature",
      "./src/features/**/operatorType.feature",
      "./src/features/**/operatorContactDetails.feature",
      "./src/features/**/representativeOperatorContactDetails.feature",
      "./src/features/**/registrationRole.feature"
    ],
    registrationSubmission: [
      "./src/features/**/submitRegistration.feature",
      "./src/features/**/registrationSummary.feature",
      "./src/features/**/editSummary.feature",
      "./src/features/**/submissionPage.feature",
      "./src/features/**/receiveConfirmationNumber.feature"
    ],
    operatorextra: [
      "./src/features/**/charityDetails.feature",
      "./src/features/**/customerType.feature",
      "./src/features/**/limitedCompanyDetails.feature",
      "./src/features/**/importExportActivities.feature",
      "./src/features/**/businessTypeIn.feature",
      "./src/features/**/otherDetails.feature"
    ],
    websitefeatures: [
      "./src/features/**/backButton.feature",
      "./src/features/**/betaBanner.feature",
      "./src/features/**/errorSummary.feature",
      "./src/features/**/cookieBanner.feature",
      "./src/features/**/lcLookup.feature",
      "./src/features/**/fsaFooter.feature"
    ],
    end2end: [
      "./src/features/**/e2eTestingCatelyn.feature",
      "./src/features/**/e2eTestingJamie.feature"
    ]
  },
  maxInstances: process.env.TEST_LOCALLY ? 1 : 5,
  capabilities: browserOptions,
  sync: true,
  logLevel: "error",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ["selenium-standalone"],
  framework: "cucumber",
  reporters: ["spec", "allure"],
  reporterOptions: {
    allure: {
      outputDir: "allure-results",
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }
  },
  cucumberOpts: {
    backtrace: false,
    compiler: ["js:babel-register"],
    failAmbiguousDefinitions: true,
    failFast: false,
    ignoreUndefinedDefinitions: false,
    name: [],
    snippets: true,
    source: true,
    profile: [],
    require: [
      "./src/steps/given.js",
      "./src/steps/then.js",
      "./src/steps/when.js",
      "./src/steps/setupAndTeardown.js"
    ],
    snippetSyntax: undefined,
    strict: true,
    tagExpression: "not @Pending",
    tagsInTitle: true,
    timeout: 20000
  },
  before: function before() {
    const chai = require("chai");
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
  }
};
