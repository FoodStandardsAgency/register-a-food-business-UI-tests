# The Repository Structure

## Root directory files

- `README.md`

  A broad overview of the purpose of this repository

- `LICENSE`

  The license for this repository

- `package.json`

  The starting point for understanding how to use this repository and what dependencies it has. For more information about NPM and Node, see https://docs.npmjs.com/. For more information about the `package.json` file, see: https://docs.npmjs.com/files/package.json.

- `.gitignore`

  A number of files and directories are ignored by `git` either to reduce conflicts and repository size on GitHub, or for security reasons. For more information about this file, see https://help.github.com/articles/ignoring-files/.

- `.env` (not committed)

  Create a `.env` file in the root directory to store environment variables. The `.env` file is included in the `.gitignore` file for security purposes because many environment variables are passwords, which should not be made public in an open-source repository.

- `wdio.conf.js`

  This is the config file. More information can be found [here](.the-config-file.md).

- `run_ui.sh`
  This is the bash script to run the UI tests. It runs the UI tests one test suite at a time and by default on the Azure test environment URL.

- `run_e2e.sh`

  This is the bash script to run the UI tests. It runs only the end2end test suite and by default on the Azure test environment URL.

## `/src`

- `src/features`

All of the UI and E2E tests can be found in the [features](../../src/features) folder.

- `src/pageObjects`
  Page objects are used to simplify feature files and make the elements referred to more human readable. Rather than referring to the element by its ID/class in a step, you can assign it to a page object name that can be used across multiple scenarios. This directory contains a page objects file for each page in the form, as well as one for common elements such as the footer links.

- `src/steps`
  This directory contains the Given, When and Then predefined steps. You can also see the steps [here](https://github.com/webdriverio/cucumber-boilerplate).

* `src/support`
  This directory contains the functions that are used by the predefined steps. Note that those actions that required selecting an element have been edited to incorporate using page objects (for example [`clickElement.js`](../../src/support/action/clickElement.js)).

## `/errorShots`

[errorShots](../../errorShots) is the directory within which screenshots get saved if a command fails. This directory is chosen in the [config file](../../wdio.conf.js).

## Non-committed and other directories

The following directories are not committed to GitHub or are less important to the understanding of this repository.

- `/node_modules`

  This repository depends on third-party packages and libraries from [NPM](https://www.npmjs.com/). These packages are stored in the `/node_modules` directory.

## Related information

- More information on [using PageObjects](https://martinfowler.com/bliki/PageObject.html)
