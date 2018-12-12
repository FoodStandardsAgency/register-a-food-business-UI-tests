# Running the UI tests

## Running the tests locally

### Prerequisites

- [npm](https://www.npmjs.com/)

### Steps:

On localhost on chrome (if you want to run it on another browser then you will need to install the driver for it)

1. Run the front-end and/or back-end applications - see here (link to front end and back end start app guides)
2. Run `npm` (note about it installing chrome driver - if you want to run locally on firefox or other browser then ..)
3. Replace the url in the .sh files with the localhost base url
4. Populate the .env file with the QA key. The contents of this file must be handed over from existing developers.
5. Run `npm run test:locally:ui`

On a url:

1.  Run `npm` (note about it installing chrome driver - if you want to run locally on firefox or other browser then ..)
2.  Replace the url in the .sh files with the url of the environment you want to run it in (default is test)
3.  Populate the .env file with the QA key. The contents of this file must be handed over from existing developers.
4.  Run `npm run test:locally:ui`

## Running the tests via browserstack

1. Run `npm`
2. Populate the .env file with the QA key, Browserstack username and Browserstack password. The contents of this file must be handed over from existing developers.
3. Run `npm run test:browserstack:ui`
4. Go into https://automate.browserstack.com to see details for the tests and playback results

## Related information

- [Browserstack capabilities (changing browsers, browser version etc)](https://www.browserstack.com/automate/capabilities)
- [Driver needed to run locally on Firefox](https://www.npmjs.com/package/geckodriver)

* [The tech stack]
* [The config file]
* [The repository structure]
* [writing a new feature file]
