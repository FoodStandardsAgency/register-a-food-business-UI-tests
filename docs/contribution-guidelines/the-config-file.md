# The config file

This repository and configuration file are edited from the [webdriver.io cucumber boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/master/wdio.conf.js). The config file can be found [here](../../wdio.conf.js).

## Browseroptions

BrowserOptions is where you choose which browsers you want the tests to run. Here, it is set up so that when running locally, it will run on chrome by default. The browserOptions array contains different browser configurations as objects. When running via Browserstack, these are the browsers that the tests are run on. You can find browserOptions [here](https://www.browserstack.com/automate/capabilities). It is important to note that many of the tests will fail in Safari due to it not successfully clicking elements.

## Browserstack Auth

This pulls in the browserstack username and password from the environment variables, which need to be handed over from an existing developer.

## Suites

Test suites are used to group together feature files for organisation purposes, and to help run the whole test suite together with parallel tests and without timeouts. This is explained more under Consistencies.
You can find more information on suites and running specific tests/suites [here](http://webdriver.io/guide/testrunner/organizesuite.html)

## MaxInstances

The maxInstances property is used for running tests concurrently. In theory, webdriver.io allows for maximum concurrency, i.e. you could have all of your tests running in parallel. However there are restrictions when running them both locally and via browserstack, due to computer CPU for the former and a maximum number of parallel tests for the latter.

**Running locally:**
When running locally, maxInstances has been set to 1, so only one process is spawned. This means it goes through the config file and runs through each suite (as seen from [`run_ui.sh`](../../run_ui.sh)) from top to bottom, running each feature file and then moving onto the next suite.

**Running on Browserstack:**
The Browserstack account allows for up to 5 parallel tests running and up to 5 tests queued. The config file has been set to have a maxInstances of 5 when running via browserstack. When running on browserstack, the default is for it to run on just Chrome. When doing this it runs the tests suite by suite, feature file by feature feature file, running a maximum of 5 feature files at a time. You can also run the tests in parallel across five different browsers (Chrome, Firefox, Edge, Safari and Internet Explorer) by populating your `.env` file with TEST_ALL_BROWSERS=true (it is worth noting that most tests will fail in safari due to webdriver.io being unable to click elements). This spawns a process in each browser, so it will go through feature file from each suite in all five browsers.

If you are looking to change the number of maxInstances, just be aware that there is the possibility of tests running unsuccessfully due to computer CPU maxing out and the browserstack parallel test limit and tests timing out if queued for too long.

## CucumberOpts

`cucumberOpts` is where you can change cucumber-related configuration. You can find more [Cucumber documentation here](https://docs.cucumber.io/).

`cucumberOpts.require`: this is where you declare any step definition files that are required for the scenarios.

`cucumberOpts.timeout`: here you can set the time that a step will run for before timing out. You may want to change the timeout depending on various factors such internet speed and page loading speed. If a step times out, then it will fail and the rest of the scenario steps will be skipped.

## Inconsistencies

It is important to be aware of the inconsistencies that can arise when running the tests, as they can cause the tests to fail. If running tests locally then the internet speed and page loading speed can cause steps to fail. For example, if a scenario tries to do something to an element that hasn't loaded yet, then it can timeout and fail. The number of maxInstances can also cause failures. If you try running a test via Browserstack and set the number of maxInstances to be above the number of parallel tests the Browserstack plan allows you to run, then you will get the error `All parallel tests are currently in use, including the queued tests.`
There are also potential browser differences to be aware of. For example webdriver not working in safari and failing due to inability to click elements, and elements being outside of the viewport when run on Edge and therefore not being immediately clickable. 
