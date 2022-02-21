require("dotenv").config();
const video = require('wdio-video-reporter');
const fs = require('fs-extra');
const deepMergeArrays = (...arguments) => {
  let target = {};
  // Merge the object into the target object
  let merger = (obj) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]'){
          // If we're doing a deep merge
          // and the property is an object
          target[prop] = deepMergeArrays(target[prop], obj[prop]);
        } else {
          // Otherwise, do a regular merge
          target[prop] = obj[prop];
        }
      }
    }
  };
  //Loop through each object and conduct a merge
  for (let i = 0; i < arguments.length; i++) {
    merger(arguments[i]);
  }
  return target;
};

const MODE_BROWSERSTACK = "BROWSERSTACK";
const MODE_SELENIUM = "SELENIUM";

const LOCALITY_LOCAL = "LOCAL";
const LOCALITY_REMOTE = "REMOTE";

const localiseCapability = (config, mode) => {
  switch(mode) {
    case MODE_BROWSERSTACK:
      if(!config['bstack:options']) {
        config['bstack:options'] = {};
      }
      config['bstack:options']['local'] ="true";
      config['maxInstances'] = 2;

      break;
    case MODE_SELENIUM:
      delete config['bstack:options'];
      delete config['browserVersion'];
      config['maxInstances'] = 2;
      break;
  }

  return config;
}

const defaultCapabilitiesMobile = (mode, props = {}) => {
  let {
    osVersion = '10'
  } = props;

  switch(mode){
    case MODE_BROWSERSTACK:

      return {
        "bstack:options":{
          osVersion: osVersion,
          projectName: "RAFB",
          buildName: generateBuildName(),
          realMobile : "true",
          appiumVersion : "1.14.0",
          accessKey: process.env.BROWSERSTACK_KEY,
          userName: process.env.BROWSERSTACK_USER
        }
      };

    default:
      return {};
  }

}

const defaultCapabilities = (mode, props = {}) => {
  let {
    os="Windows",
    osVersion = '10',
    resolution="1920x1080",
    debug=false
  } = props;

  switch(mode){
    case MODE_BROWSERSTACK:

      return {
        "bstack:options":{
          os:os,
          osVersion: osVersion,
          projectName: "RAFB",
          buildName: generateBuildName(),
          // seleniumVersion: "4",
          seleniumVersion : "3.141.59",
          accessKey: process.env.BROWSERSTACK_KEY,
          userName: process.env.BROWSERSTACK_USER
        }
      };

    default:
      return {};
  }

}

const capabilityAndroid = (mode, osConfig = {}) => {
  let {
    osVersion = "10.0"
  } = osConfig;

  return deepMergeArrays(
      {
        "browserName" : "Android",
        "bstack:options" : {
          "osVersion" : "10.0",
          "deviceName" : "Google Pixel 4 XL",
        }
      },
      defaultCapabilitiesMobile(mode, {osVersion})
  );
};

const capabilityiOS = (mode, osConfig = {}) => {
  let {
    osVersion = "13"
  } = osConfig;

  return deepMergeArrays(
      {
        "browserName" : "iPhone",
        "bstack:options" : {
          "osVersion" : "13",
          "deviceName" : "iPhone XS",
        }
      },
      defaultCapabilitiesMobile(mode, {osVersion})
  );
};

const capabilityIE = (mode, osConfig = {}) => {
  let {
    os="Windows",
    osVersion = "10"
  } = osConfig;

  return deepMergeArrays(
      {
        "browserName" : "ie",
        "browser_version" : "11.0"
      },
      defaultCapabilities(mode, {os, osVersion})
  );
};

const capabilityFirefox = (mode, osConfig = {}) => {
  let {
    os="WINDOWS",
    osVersion = "10"
  } = osConfig;

  return deepMergeArrays(
      {
        "browserName" : "firefox",
        "browserVersion": "76"
      },
      defaultCapabilities(mode, {os, osVersion})
  );
};

const capabilityChrome = (mode, osConfig = {}) => {
  let {
    os="Windows",
    osVersion = "10"
  } = osConfig;

  return deepMergeArrays(
      {
        "browserName" : "chrome",
        "browserVersion": "83.0"
      },
      defaultCapabilities(mode, {os, osVersion})
  );
};

const capabilityEdge = (mode, osConfig = {}) => {
  let {
    os="Windows",
    osVersion = "10"
  } = osConfig;

  return deepMergeArrays(
      {
        "browserName" : "Edge",
        "browserVersion": "83.0"
      },
      defaultCapabilities(mode, {os, osVersion})
  );
}

const capabilitySafari = (mode, osConfig = {}) => {
  let {
    os="OS X",
    osVersion="Mojave"
  } = osConfig;

  return deepMergeArrays(
      {
        "browserName" : "safari",
        "browserVersion": "12.0"
      },
      defaultCapabilities(mode, {os, osVersion})
  );
};

const generateBuildName  = () => {
  if (process.env.RELEASE_RELEASENAME) {
    return `azure-${process.env.RELEASE_RELEASENAME}`;
  } else {
    return `${process.env.BROWSERSTACK_USER}-${Date.now()}`;
  }
}

const initSeleniumConfig = (isLocal, config = {}) => {
  let mode = MODE_SELENIUM;

  config.hostname='selenium-hub';
  config.port=4444;
  config.path='/wd/hub'; //for selenium 3.*
  // config.path='/'; //For selenium * 4.* *

  config.capabilities = [
    capabilityChrome(mode),
    capabilityFirefox(mode),
  ];

  config.maxInstances = 4;

  if(isLocal){
    let capabilities = config.capabilities;
    let localCapabilities = [];
    capabilities.forEach((item, index)=>{
      localCapabilities.push(localiseCapability(item, mode));
    });
    
    config.capabilities = localCapabilities;
  }

  return config;
};

const initBrowserStackConfig = (isLocal, config = {}) => {
  let mode = MODE_BROWSERSTACK;
  let runAll = process.env.RUNALL !== undefined;

  config.user = process.env.BROWSERSTACK_USER;
  config.key = process.env.BROWSERSTACK_KEY;

  let bsOptions = isLocal ? {
    browserstackLocal: isLocal
  } : {};
  config.services = [
      ['browserstack', bsOptions]
  ];

  config.maxInstances = 2;
  config.specFileRetries = 10;

  if(runAll){
    config.capabilities = [
      capabilityFirefox(mode),
      capabilityChrome(mode),
      capabilitySafari(mode),
      capabilityEdge(mode),
      //capabilityIE(mode),
      //capabilityiOS(mode),
      capabilityAndroid(mode)
    ];
  }
  else {
    config.capabilities = [ 
      //capabilityFirefox(mode),
      capabilityChrome(mode),
      //capabilitySafari(mode),
      //capabilityEdge(mode),
      //capabilityIE(mode),
      //capabilityiOS(mode),
      //capabilityAndroid(mode)
    ]
  }

  // //if we are on local
  if(isLocal){
    let capabilities = config.capabilities;
    let localCapabilities = [];
    capabilities.forEach((item, index)=>{
      localCapabilities.push(localiseCapability(item, mode));
    })

    config.capabilities = localCapabilities;
  }

  return config;
};



const argv = require("yargs").argv;
const wdioParallel = require('wdio-cucumber-parallel-execution');
// The below module is used for cucumber html report generation
const reporter = require('cucumber-html-reporter');
const currentTime = new Date().toJSON().replace(/:/g, "-");

const sourceSpecDirectory = `./src/features`;
const parallelExecutionReportDirectory = `./parallel/tmp`;

let featureFilePath = `${sourceSpecDirectory}/*.feature`;

// If parallel execution is set to true, then create the Split the feature files
// And store then in a tmp spec directory (created inside `the source spec directory)
if (argv.parallel === 'true') {
  tmpSpecDirectory = `${sourceSpecDirectory}/tmp`;
  wdioParallel.performSetup({
    sourceSpecDirectory: sourceSpecDirectory,
    tmpSpecDirectory: tmpSpecDirectory,
    cleanTmpSpecDirectory: true
  });
  featureFilePath = `${tmpSpecDirectory}/**/*.feature`
}

let config = {
  automationProtocol: "webdriver",
  baseUrl: process.env.BASE_URL,
  buildName: generateBuildName(),
  //
  // ====================
  // Runner Configuration
  // ====================
  //
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
  // on a remote machine).
  runner: 'local',
  specs: [
    './src/features/**/*.feature'
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

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
      "./src/features/**/partnership.feature",
      "./src/features/**/partnershipChange.feature"
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
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //


  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'error',
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.

  //
  // Default timeout for all waitFor* commands.
  // waitforTimeout: 1000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  // connectionRetryTimeout: 5000,
  //
  // Default request retries count
  connectionRetryCount: 3,

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'cucumber',
  //
  // The number of times to retry the entire specfile when it fails as a whole
  specFileRetries: 0,
  //
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  specFileRetriesDeferred: true,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  reporters: [
    "dot",
    ["allure", {
      outputDir: "allure-results",
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
    ["junit", {
      outputDir: "./reports",
      outputFileFormat: function(opts){
        // console.log(opts);
        return `WDIO-${opts.buildName}-${opts.cid}-${opts.name}.xml`}
    }],
    // [
    //   video,
    //   {
    //     saveAllVideos: false,       // If true, also saves videos for successful test cases
    //     videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    //     videoRenderTimeout: 30
    //   }
    // ]
  ],
  //
  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    timeout: 340000,
    require: ['./src/steps/*'],        // <string[]> (file/dir) require files before executing features
    backtrace: true,   // <boolean> show full backtrace for errors
    requireModule: ['@babel/register'],  // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    dryRun: false,      // <boolean> invoke formatters without executing steps
    failFast: false,    // <boolean> abort the run on first failure
    // format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    snippets: true,     // <boolean> hide step definition snippets for pending steps
    source: false,       // <boolean> hide source uris
    profile: [],        // <string[]> (name) specify the profile to use
    strict: true,      // <boolean> fail if there are any undefined or pending steps
    tagExpression: "not @Pending"  // <string> (expression) only execute the features or scenarios with tags matching the expression
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  //afterStep: function afterStep(stepResult, blah, result) {}


  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: () => {
    // Remove the `tmp/` folder that holds the json report files
    fs.removeSync(parallelExecutionReportDirectory);
  },
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
   * @param  {[type]} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // beforeSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before: function (capabilities, specs) {

    browser.overwriteCommand('url', function (origUrlFunction, url) {

      origUrlFunction(url);

      browser.pause(1000);

    });

  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Runs before a Cucumber feature
   */
  // beforeFeature: function (uri, feature, scenarios) {
  // },
  /**
   * Runs before a Cucumber scenario
   */
  // beforeScenario: function (uri, feature, scenario, sourceLocation) {
  // },
  /**
   * Runs before a Cucumber step
   */
  // beforeStep: function ({ uri, feature, step }, context) {
  // },
  /**
   * Runs after a Cucumber step
   */
  // afterStep: function ({ uri, feature, step }, context, { error, result, duration, passed, retries }) {
  // },
  /**
   * Runs after a Cucumber scenario
   */
  // afterScenario: function (uri, feature, scenario, result, sourceLocation) {
  // },
  /**
   * Runs after a Cucumber feature
   */
  afterFeature: function (uri, feature, scenarios) {
    //this helped with selenium 4 alpha
    // browser.reloadSession();
  },

  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: () => {

    try{
      let consolidatedJsonArray = wdioParallel.getConsolidatedData({
        parallelExecutionReportDirectory: parallelExecutionReportDirectory
      });

      let jsonFile = `./parallel-report.json`;
      fs.writeFileSync(jsonFile, JSON.stringify(consolidatedJsonArray));

      // The below code is not part of wdio-cucumber-parallel-execution module
      // but is mentioned to show, how it can be used with other reporting modules
      var options = {
        theme: 'bootstrap',
        jsonFile: jsonFile,
        output: `tests/reports/html/report-${currentTime}.html`,
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        ignoreBadJsonFile: true
      };

      reporter.generate(options);
    } catch(err){
      console.log('err', err);
    }
  },
  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  onReload: function(oldSessionId, newSessionId) {
    console.log(`session refresh ${oldSessionId}->${newSessionId}`);
  }
};


let isLocal = process.env.IS_LOCAL !== "";
switch(process.env.MODE){
  case MODE_BROWSERSTACK:
      config = initBrowserStackConfig(isLocal, config);
    break;
  case MODE_SELENIUM:
      config = initSeleniumConfig(isLocal, config);
    break;
  default:
    throw new Error(`Specify a MODE env`);
}

exports.config = config;
