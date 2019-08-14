require("dotenv").config();

let browserOptions;
if (process.env.TEST_LOCALLY) {
  browserOptions = [{ browserName: "chrome" }];
} else if (process.env.TEST_ALL_BROWSERS) {
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
} else {
  browserOptions = [
    {
      os: "OS X",
      os_version: "High Sierra",
      browserName: "Chrome",
      browser_version: "67.0",
      maxInstances: 5
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
      "./src/features/**/establishmentOpeningDays.feature",
      "./src/features/**/openingHours.feature"
    ],
    operator: [
      "./src/features/**/operatorAddress.feature",
      "./src/features/**/operatorName.feature",
      "./src/features/**/operatorType.feature",
      "./src/features/**/operatorContactDetails.feature",
      "./src/features/**/representativeOperatorContactDetails.feature",
      "./src/features/**/registrationRole.feature",
      "./src/features/**/partnership.feature"
    ],
    registrationSubmission: [
      "./src/features/**/submitRegistration.feature",
      "./src/features/**/registrationSummary.feature",
      "./src/features/**/editSummary.feature",
      "./src/features/**/editSummaryMultiPage.feature",
      "./src/features/**/submissionPage.feature",
      "./src/features/**/receiveConfirmationNumber.feature"
    ],
    operatorextra: [
      "./src/features/**/charityDetails.feature",
      "./src/features/**/customerType.feature",
      "./src/features/**/limitedCompanyDetails.feature",
      "./src/features/**/importExportActivities.feature",
      "./src/features/**/businessTypeIn.feature",
      "./src/features/**/otherDetails.feature",
      "./src/features/**/waterSupply.feature"
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
      "./src/features/**/e2eTestingJamie.feature",
      "./src/features/**/e2eTestingPartnership.feature"
    ]
  },
  maxInstances: process.env.TEST_LOCALLY ? 1 : 5,
  capabilities: browserOptions,
  sync: true,
  logLevel: "error",
  coloredLogs: true,
  // Saves a screenshot to a given path if a command fails.
  screenshotPath: "./errorShots/",
  waitforTimeout: 30000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ["selenium-standalone"],
  framework: "cucumber",
  reporters: ["spec", "allure", "junit"],
  reporterOptions: {
    allure: {
      outputDir: "allure-results",
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    },
    junit: {
      outputDir: "./reports"
    }
  },
  //
  // If you are using Cucumber you need to specify where your step definitions are located.
  // See also: https://github.com/webdriverio/wdio-cucumber-framework#cucumberopts-options
  cucumberOpts: {
    backtrace: false, // <boolean> show full backtrace for errors
    compiler: ["js:babel-register"], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    failAmbiguousDefinitions: true, // <boolean< Treat ambiguous definitions as errors
    failFast: false, // <boolean> abort the run on first failure
    ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    name: [],
    snippets: true, // <boolean> hide step definition snippets for pending steps
    source: true,
    profile: [],
    require: [
      "./src/steps/given.js",
      "./src/steps/then.js",
      "./src/steps/when.js",
      "./src/steps/setupAndTeardown.js"
    ], // <string[]> (file/dir) require files before executing features
    snippetSyntax: undefined, // <string> specify a custom snippet syntax
    strict: true,
    tagExpression: "not @Pending", // <boolean> add cucumber tags to feature or scenario name
    tagsInTitle: true,
    timeout: 20000 // <number> timeout for step definitions
  },
  before: function before() {
    const chai = require("chai");
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
  }
};
