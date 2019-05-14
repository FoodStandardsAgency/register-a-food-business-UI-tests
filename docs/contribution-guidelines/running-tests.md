# Running the UI and E2E tests

If you want to test the front-end/back-end application running on localhost, then you will need to run the tests locally. You may also want to test it on a url, and can do this both locally or via Browserstack. If running it locally, the default browser it will run in is Chrome. If you want to run it in another browser then you will need to install the driver for it and make sure that you have the browser installed.

## Prerequisites

- [Node.js and npm](https://nodejs.org)
- Google Chrome (if you want to run it on another browser then you will need to install the necessary driver):
- Java

### Steps to run locally on Chrome using Azure URLs:

1.  Run `npm install`
2.  The default environment to run against is `test`. Optionally, you can add an environment variable to your terminal for another environment. For example, run `export URL_ENV=staging` at this point. See the `.sh` files in the root project directory.
3.  Populate the .env file with the QA key. The contents of this file must be handed over from existing developers.
4.  Run `npm run test:locally:ui`

### Steps to run locally on Chrome using `localhost`:

1. Enusre have the mid-and-east-antrim council is setup (id 6008)
2. Run the front-end and/or back-end applications - see here (link to front end and back end start app guides)
3. Increase Azured dev VM power
3. Run `npm install`
4. Replace the URL in the .sh files with `http://localhost:3000/new/`.
   > IMPORTANT: The URL in the `.sh` files must always begin with `http://` or `https://`. Certain tests will fail if `localhost:3000/new` is used without the `http://`, for example.
5. Populate the .env file with the QA key. The contents of this file must be handed over from existing developers.
6. Run `npm run test:locally:ui` for the UI tests or `npm run test:locally:e2e` for the E2E tests.

## Running the tests via Browserstack

1. Run `npm install`
2. Populate the .env file with the QA key, Browserstack username and Browserstack password. The contents of this file must be handed over from existing developers.
3. Run `npm run test:browserstack:ui`
4. Go to https://automate.browserstack.com to see details for the tests and playback results

### Changing browser or browser version

You can change the browser or browser version that the tests run in in the config file, [`wdio.conf.js`](../../wdio.conf.js). You can find more about the config file [here](./the-config-file.md). The different browsers and versions that are available on Browserstack are available [here](https://www.browserstack.com/automate/capabilities).

## Related information

- [Driver needed to run locally on Firefox](https://www.npmjs.com/package/geckodriver)
