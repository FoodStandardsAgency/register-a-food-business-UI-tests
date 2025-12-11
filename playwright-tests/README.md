# Playwright Tests for Register a Food Business

This directory contains Playwright-based UI tests for the Register a Food Business application, migrated from WebdriverIO/Cucumber.

## 📋 Overview

- **Test Framework**: Playwright Test (JavaScript)
- **Browsers**: Chromium, Firefox, WebKit (built-in)
- **Pattern**: Page Object Model
- **Test Format**: Playwright Test (descriptive test names, no Gherkin)
- **Total Tests**: 53 test files across 9 suites

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Environment Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your actual values:
   - `BASE_URL` - Application URL (default: test environment)
   - `BASE_ADMIN_URL` - Admin portal URL
   - `DEV_USERNAME` & `DEV_PASSWORD` - Admin portal credentials
   - `QA_KEY` - QA route authentication key

### Running Tests

```bash
# Run all tests (all browsers)
npm test

# Run tests in specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run specific test suite
npm run test:landingpage
npm run test:establishment
npm run test:operator
npm run test:business
npm run test:registration
npm run test:e2e

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with UI mode
npm run test:ui

# View HTML report
npm run show-report
```

### Using Shell Script

```bash
# Run all tests
./run_playwright_local.sh

# Run specific suite
./run_playwright_local.sh --suite establishment

# Run in specific browser
./run_playwright_local.sh --project chromium

# Run in headed mode
./run_playwright_local.sh --headed

# Combine options
./run_playwright_local.sh --suite e2e --project firefox --headed
```

## 📁 Project Structure

```
playwright-tests/
├── playwright.config.js      # Playwright configuration
├── package.json              # Dependencies and scripts
├── .env.example              # Environment variables template
├── run_playwright_local.sh   # Local execution script
├── docs/
│   ├── UTILITY_MAPPING.md    # WebdriverIO to Playwright mapping
│   └── MIGRATION_PROGRESS.md # Migration tracking checklist
├── utils/
│   ├── BasePage.js           # Base page object class
│   ├── fixtures.js           # Custom test fixtures
│   └── navigation.js         # Navigation utilities (openWebsite, QA route)
├── page-objects/
│   ├── CommonElements.page.js
│   ├── LandingPage.page.js
│   └── ... (41 page objects total)
└── tests/
    ├── landingpage/
    ├── establishment/
    ├── operator/
    ├── business/
    ├── registration/
    ├── edit-summary/
    ├── ui-features/
    ├── e2e/
    └── admin/
```

## 🧪 Writing Tests

### Basic Test Structure

```javascript
import { test, expect } from "../utils/fixtures.js";
import { LandingPage } from "../page-objects/LandingPage.page.js";

test.describe("Landing Page Tests", () => {
  test("should display the heading", async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.open();

    const heading = await landingPage.getHeading();
    expect(heading).toContain("Register a food business");
  });
});
```

### Using Page Objects

All page objects extend `BasePage` and provide:

- Selector definitions
- Action methods (clicks, fills, etc.)
- Getter methods (text, visibility, etc.)

```javascript
const landingPage = new LandingPage(page);
await landingPage.clickEnterButton();
await landingPage.fillEmail("test@example.com");
expect(await landingPage.isHeadingVisible()).toBe(true);
```

### Using Navigation Utilities

```javascript
import { openWebsite, injectDataIntoRegSummary } from "../utils/navigation.js";

// Navigate to site (uses BASE_URL)
await openWebsite(page, "site", "/new/index");

// Navigate to admin portal (with basic auth)
await openWebsite(page, "adminportal", "/registrations");

// Navigate to full URL
await openWebsite(page, "url", "https://example.com");

// Inject test data via QA route
await injectDataIntoRegSummary(
  page,
  "registration-summary",
  "/registration-summary"
);
```

## 🔧 Key Features

### Built-in Browser Support

- No external Selenium/BrowserStack needed
- Fast, reliable browser automation
- Cross-browser testing (Chromium, Firefox, WebKit)

### QA Route Data Injection

- Quickly navigate to any page with pre-populated data
- Datasets: `registration-summary`, `registration-summary-charity`, `registration-summary-partnership`
- Requires `QA_KEY` environment variable

### Parallel Execution

- Tests run in parallel by default (fully parallel mode)
- Configurable workers in `playwright.config.js`

### Rich Reporting

- HTML report with screenshots and traces
- JUnit XML for CI/CD integration
- Video recording on failure
- Trace viewer for debugging

### Auto-waiting

- Playwright automatically waits for elements
- No need for manual `pause()` or fixed timeouts
- Configurable action timeout (default: 10s)

## 📊 Test Organization

Tests are organized by functional area matching the original WebdriverIO structure:

1. **Landing & Navigation** (1 test) - Home page and LA selector
2. **Establishment** (8 tests) - Establishment details and address
3. **Operator** (9 tests) - Operator information and partnerships
4. **Business Details** (10 tests) - Business type, scale, activities
5. **Registration & Submission** (6 tests) - Summary and submission
6. **Edit Summary** (7 tests) - Editing registration details
7. **UI/UX Features** (7 tests) - Cookies, language, navigation
8. **End-to-End** (3 tests) - Complete user journeys
9. **Admin Portal** (2 tests) - Admin functionality

## 🔄 Migration from WebdriverIO

See `docs/UTILITY_MAPPING.md` for detailed mapping of WebdriverIO helpers to Playwright equivalents.

**Key Changes:**

- Gherkin/Cucumber → Playwright Test descriptive names
- Custom action helpers → Native Playwright methods
- Custom check helpers → Playwright assertions
- Selenium/BrowserStack → Built-in browsers
- `eval(getSelector())` → Direct selector usage

**Preserved:**

- QA route data injection pattern
- Page Object Model structure
- Test organization by functional area
- Admin portal basic auth

## 🐛 Debugging

```bash
# Run with Playwright Inspector
npm run test:debug

# Run specific test in debug mode
npx playwright test tests/landingpage/landingPage.spec.js --debug

# View trace of failed test
npx playwright show-trace test-results/[test-name]/trace.zip

# Run in headed mode to see browser
npm run test:headed
```

## 🔐 CI/CD Integration

Tests are configured for Azure Pipelines. See `azure-pipelines.yml` for pipeline configuration.

**Key Points:**

- Browsers installed via `npx playwright install --with-deps`
- JUnit reporter for test results integration
- HTML reports and traces published as artifacts
- Environment variables injected from pipeline secrets

## 📝 Progress Tracking

Migration progress is tracked in `docs/MIGRATION_PROGRESS.md` with checkboxes for:

- Infrastructure setup ✅
- Utilities and fixtures ✅
- Page objects (41 files)
- Test suites (53 tests)
- Pipeline integration
- Documentation
- Validation

## 🤝 Contributing

When adding new tests:

1. Create page object in `page-objects/` if needed
2. Extend `BasePage` for common functionality
3. Write tests in appropriate suite folder
4. Use descriptive test names
5. Follow existing patterns for consistency
6. Update `MIGRATION_PROGRESS.md`

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
