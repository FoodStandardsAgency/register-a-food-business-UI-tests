# Writing a new feature file

This guide explains how to add a new Gherkin feature file for the UI/E2E tests in this repository.

## Where to add the file

- Put new feature files in `src/features`.
- Use a clear, descriptive file name with the `.feature` extension.
- Keep names short and meaningful, for example, the page names:
  - `customerType.feature`
  - `operatorContactDetails.feature`
  - `submissionPage.feature`

## Feature file structure

A feature file should include the following sections:

- `Feature:` — a short description of the feature under test.
- Optional `Background:` — shared setup steps used by all scenarios in the file.
- `Scenario:` or `Scenario Outline:` — one scenario per behavior.
- Tags — optional metadata that can be used to include/exclude scenarios.

### Example

```gherkin
Feature: Select customer type
  As a user
  I want to choose the correct customer type
  So that the registration can continue with the right questions

  Scenario: User chooses end consumer
    Given I open the site "/"
    When I click on the element "customerType.endConsumer"
    Then the next page should contain the text "Your details"
```

## Step definitions

- Feature files use steps defined across three files in `src/steps/`:
  - `given.js` — `Given` steps (setup and navigation)
  - `when.js` — `When` steps (actions and interactions)
  - `then.js` — `Then` steps (assertions and checks)
- Reuse existing steps wherever possible.
- Keep step text readable and aligned with the existing style.
- If you need a new step, add it to the file that matches its keyword (`Given`, `When`, or `Then`) and keep it generic enough to be reused by future scenarios.

## Tags and scenario grouping

- Use tags to group scenarios or mark tests that should be skipped in some runs.
- Common tag usage in this repo includes:
  - `@Pending` for incomplete or flaky scenarios
  - `@Requires-Postcoder` for tests that depend on external postcode lookup services
- Tags can be useful when running tests with tag filters.

## Page objects and selectors

- Use page objects from `src/pageObjects` to keep selectors in one place.
- If the new feature needs selectors that do not already exist, add a new page object file or extend an existing one.
- This helps keep feature files clean and easier to maintain.

## Best practices

- Keep scenarios focused: one behavior per scenario.
- Avoid excessive setup steps if a QA route can inject data and jump directly to the page under test.
- Prefer happy-path scenarios, then add edge cases as separate scenarios.
- Use real user language, not implementation details.

## Running the new feature

To run the new feature file locally:

```bash
npx wdio run wdio.conf.cjs --spec src/features/<your-feature-file>.feature
```

Or run the full local UI suite:

```bash
npm run test:locally:ui
```

If you are adding an E2E feature, run:

```bash
npm run test:locally:e2e
```

## Related files

- `src/features` — feature files for UI and E2E tests
- `src/steps/given.js` — step definitions
- `src/pageObjects` — reusable selectors and page abstractions
- `wdio.conf.cjs` / `wdio.conf.mjs` — test runner configuration
