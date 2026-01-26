# Playwright Migration Guide

This document outlines the migration from WebdriverIO/Cucumber to Playwright Test for the Register a Food Business application.

## Overview

We have migrated the end-to-end test suite from WebdriverIO (with Cucumber) to Playwright Test to improve stability, speed, and maintainability.

## Key Changes

### 1. Framework
- **Old**: WebdriverIO + Cucumber (Gherkin syntax)
- **New**: Playwright Test (JavaScript/TypeScript-like syntax)

### 2. Location
- **Old**: `src/features/`, `src/steps/`, `src/pageObjects/`
- **New**: `playwright-tests/` directory (separate from app source)

### 3. Page Objects
- **Old**: Class-based, manually managing selectors.
- **New**: Class-based, extending `BasePage` in `utils/BasePage.js`. Selectors are encapsulated in `this.selectors` and mapped to `this.page.locator()`.

### 4. Assertions
- **Old**: Chai (`expect(text).to.contain(...)`)
- **New**: Playwright Expect (`await expect(locator).toContainText(...)`) with auto-retrying.

## Command Mapping

| Action | WebdriverIO Command | Playwright Command |
|Limit | `npm run test:locally:ui` | `npm run test` |
| Specific Feature | `wdio ... --spec` | `npx playwright test tests/my-feature.spec.js` |
| Debugging | `browser.debug()` | `await page.pause()` or `--debug` flag |
| Cross-browser | (Config change) | `--project=firefox` or `--project=webkit` |

## Directory Structure

```
playwright-tests/
├── tests/              # Test specifications (converted from features)
├── page-objects/       # Page Object Models
├── utils/              # Shared utilities (fixtures, navigation)
├── playwright.config.js # Configuration
└── test-results/       # Artifacts (screenshots, videos, traces)
```

## Running Tests

### Local Execution
Use the helper script or npm scripts:
```bash
cd playwright-tests
./run_playwright_local.sh
# OR
npm run test
```

### CI/CD
The Azure Pipeline has been updated to install Playwright dependencies and run the tests automatically.

## Writing New Tests
1. Create a spec file in `tests/`.
2. Use the `test` fixture to access page objects.
3. Follow the Page Object Model pattern in `page-objects/`.

```javascript
import { test, expect } from "../utils/fixtures";

test("My new scenario", async ({ page, landingPage }) => {
  await landingPage.navigate();
  await expect(page).toHaveTitle(/Register a Food Business/);
});
```
