# Register a food business UI and E2E Tests

The User Interface (UI) and End-to-End (E2E) tests are automated to run by default on Azure Devops via Browserstack in Chrome. However you may want to run them manually when, for example, developing a new feature or if you want to test on a different browser.

# Setting up your development environment

To contribute to this repository you must download the latest release or clone the git repo - `git clone https://github.com/FoodStandardsAgency/register-a-food-business-UI-tests.git`.

## Prerequisites

- [npm](https://www.npmjs.com/)

You will need to run `npm install` in order to install the required modules and to run the tests.

To run UI and E2E tests against a `localhost` application rather than against Azure applications, you must use the [register-a-food-business-environment](https://github.com/FoodStandardsAgency/register-a-food-business-environment) repository to set up your development environment.

It is recommended that you install the Prettier code-formatting extension and the Cucumber (Gherkin) Full Support extension (if using VSCode) for your IDE.

## Detailed contribution guides

The following contribution guides are available:

### High-level tasks

- [Running tests](./docs/contribution-guidelines/running-tests.md)
- [Writing a new feature file](./docs/contribution-guidelines/writing-a-new-feature-file.md)
- [Writing a new step definition](./docs/contribution-guidelines/writing-a-new-step-definition.md)

### Further information

- [The repository structure](./docs/contribution-guidelines/the-repository-structure.md)
- [The tech stack](./docs/contribution-guidelines/the-tech-stack.md)
- [The QA route](./docs/contribution-guidelines/the-qa-route.md)
- [The config file](./docs/contribution-guidelines/the-config-file.md)
