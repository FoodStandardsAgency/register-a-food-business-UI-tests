# Running the UI and E2E tests

If you want to test the front-end/back-end application running on localhost, then you will need to run the tests locally. You may also want to test it on a url, and can do this both locally or via Browserstack. If running it locally, the default browser it will run in is Chrome. If you want to run it in another browser then you will need to install the driver for it and make sure that you have the browser installed.

## Prerequisites

- [npm](https://www.npmjs.com/)

## Running the tests locally

### Steps:

**On localhost on chrome:**

1. Run the front-end and/or back-end applications - [see here for guidance](https://github.com/FoodStandardsAgency/register-a-food-business-front-end/blob/master/docs/contribution-guidelines/building-starting-testing-the-app.md)
2. Run `npm install`
3. Replace the url in the .sh files with the localhost base url
4. Populate the .env file with the QA key. The contents of this file must be handed over from existing developers.
5. Run `npm run test:locally:ui` for the UI tests or `npm run test:locally:e2e` for the E2E tests.

**On a url on chrome:**

1.  Run `npm install`.
2.  Replace the url in the .sh files with the url you want to run it on (default environment is test)
3.  Populate the .env file with the QA key. The contents of this file must be handed over from existing developers.
4.  Run `npm run test:locally:ui` for the UI tests or `npm run test:locally:e2e` for the E2E tests.

## Running the tests via browserstack

1. Run `npm`
2. Populate the .env file with the QA key, Browserstack username and Browserstack password. The contents of this file must be handed over from existing developers.
3. Run `npm run test:browserstack:ui`
4. Go into https://automate.browserstack.com to see details for the tests and playback results

### Changing browser or browser version

You can change the browser or browser version that the tests run in in the config file, [`wdio.conf.js`](../../wdio.conf.js). You can find more about the config file [here](./the-config-file.md). The different browsers and versions that are available on Browserstack are available [here](https://www.browserstack.com/automate/capabilities).

## Related information

- [Driver needed to run locally on Firefox](https://www.npmjs.com/package/geckodriver)
