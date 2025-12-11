# Plan: Migrate UI Tests from WebdriverIO to Playwright

This plan migrates 53 feature files from WebdriverIO/Cucumber to Playwright Test (JavaScript) while maintaining local and pipeline execution capabilities. Each test can be implemented and verified independently with a checkbox-based tracking system.

## Steps

1. **Set up Playwright infrastructure** in new `playwright-tests/` folder with JavaScript config supporting Playwright's built-in browsers (Chromium, Firefox, WebKit) and Azure pipeline execution, plus page object pattern matching current 41 page objects.

2. **Create shared utilities and fixtures** including the 24 action helpers, 28 assertion helpers, QA route data injection, and custom Playwright fixtures for auth/session management.

3. **Migrate tests incrementally** following the 9 test suite groupings (landingpage, establishment, operator, registrationSubmission, operatorextra, websitefeatures, end2end, adminportal), converting each of 53 Cucumber feature files to Playwright Test files with descriptive test names.

4. **Configure CI/CD pipeline** by updating `azure-pipelines.yml` to support both WebdriverIO (existing) and Playwright (new) test execution with artifact reporting.

5. **Set up parallel execution and reporting** with Playwright's built-in parallelization, HTML/JUnit reporters, and trace/screenshot capture matching current allure and cucumber-html-reporter outputs.

6. **Create markdown progress tracker** in `playwright-tests/MIGRATION_PROGRESS.md` with checkboxes for tracking completion of all 53 tests and supporting infrastructure.

7. **Validate test parity** by running both test suites side-by-side in pipeline and local environments, documenting any behavioral differences and ensuring all 53 tests pass consistently.

## Key Decisions

1. **Language**: Use JavaScript (not TypeScript) for consistency with existing WebdriverIO tests
2. **Test Format**: Convert Gherkin/Cucumber to Playwright Test with descriptive test names
3. **Browser Support**: Use Playwright's built-in browsers (Chromium, Firefox, WebKit) instead of Selenium/BrowserStack
4. **Session Management**: Continue using QA route pattern for data injection (no Playwright storage state)
5. **Progress Tracking**: Markdown file with checkboxes in `playwright-tests/MIGRATION_PROGRESS.md`

---

## Detailed Implementation Checklist

### Phase 1: Infrastructure Setup ✅

- [x] Create `playwright-tests/` folder structure
- [x] Install Playwright dependencies (`@playwright/test`)
- [x] Initialize `playwright.config.js` with Chromium, Firefox, WebKit
- [x] Create base page object class (JavaScript)
- [x] Set up environment variable handling (.env support)
- [x] Configure reporters (HTML, JUnit, traces)
- [x] Set up test fixtures for common page initialization

### Phase 2: Shared Utilities (24 actions + 28 checks) ✅

- [x] Audit existing 24 action helpers - identify which are standard Playwright functions
- [x] Audit existing 28 check helpers - identify which are standard Playwright assertions
- [x] Port only custom utilities not covered by Playwright's built-in API
- [x] Port `openWebsite` with URL/site/adminportal modes (if needed beyond `page.goto()`)
- [x] Create `injectDataIntoRegSummary` QA route utility
- [x] Set up authentication fixtures for admin portal
- [x] Document mapping of WebdriverIO helpers to Playwright equivalents

### Phase 3: Page Objects (41 files)

- [x] Port `commonElements.page.js`
- [x] Port `landingPage.page.js`
- [ ] Port `establishmentAddress.page.js`
- [ ] Port `establishmentAddressType.page.js`
- [ ] Port `establishmentContactDetails.page.js`
- [ ] Port `establishmentOpeningDate.page.js`
- [ ] Port `establishmentOpeningDays.page.js`
- [ ] Port `establishmentTradingName.page.js`
- [ ] Port `openingHours.page.js`
- [ ] Port `laselector.page.js`
- [ ] Port `operatorAddress.page.js`
- [ ] Port `operatorContactDetails.page.js`
- [ ] Port `operatorName.page.js`
- [ ] Port `operatorType.page.js`
- [ ] Port `registrationRole.page.js`
- [ ] Port `representativeOperatorContactDetails.page.js`
- [ ] Port `partnership.page.js`
- [ ] Port `partnershipChange.page.js`
- [ ] Port `partnershipContactDetails.page.js`
- [ ] Port `businessScale.page.js`
- [ ] Port `businessTypeIn.page.js`
- [ ] Port `charityDetails.page.js`
- [ ] Port `limitedCompanyDetails.page.js`
- [ ] Port `businessOtherDetails.page.js`
- [ ] Port `businessWaterSupply.page.js`
- [ ] Port `foodType.page.js`
- [ ] Port `processingActivities.page.js`
- [ ] Port `importExportActivities.page.js`
- [ ] Port `customerType.page.js`
- [ ] Port `newOrUpdateRegistration.page.js`
- [ ] Port `updateRegistration.page.js`
- [ ] Port `registrationSummary.page.js`
- [ ] Port `submissionPage.page.js`
- [ ] Port `receiveConfirmationNumber.page.js`
- [ ] Port `editSummary.page.js` (and subdirectory pages)
- [ ] Port `backButton.page.js`
- [ ] Port `betaBanner.page.js`
- [ ] Port `cookieBanner.page.js`
- [ ] Port `errorSummary.page.js`
- [ ] Port `lcLookup.page.js`
- [ ] Port `fsaFooter.page.js`
- [ ] Port `languageLink.page.js`
- [ ] Port admin portal page objects (2 files)

### Phase 4: Test Suite - Landing & Navigation (1 test)

- [ ] `landingPage.spec.js`

### Phase 5: Test Suite - Establishment (8 tests)

- [ ] `establishmentAddress.spec.js`
- [ ] `establishmentAddressType.spec.js`
- [ ] `establishmentContactDetails.spec.js`
- [ ] `establishmentOpeningDate.spec.js`
- [ ] `establishmentOpeningDays.spec.js`
- [ ] `establishmentTradingName.spec.js`
- [ ] `openingHours.spec.js`
- [ ] `laselector.spec.js`

### Phase 6: Test Suite - Operator (9 tests)

- [ ] `operatorAddress.spec.js`
- [ ] `operatorContactDetails.spec.js`
- [ ] `operatorName.spec.js`
- [ ] `operatorType.spec.js`
- [ ] `registrationRole.spec.js`
- [ ] `representativeOperatorContactDetails.spec.js`
- [ ] `partnership.spec.js`
- [ ] `partnershipChange.spec.js`
- [ ] `partnershipContactDetails.spec.js`

### Phase 7: Test Suite - Business Details (10 tests)

- [ ] `businessScale.spec.js`
- [ ] `businessTypeIn.spec.js`
- [ ] `charityDetails.spec.js`
- [ ] `limitedCompanyDetails.spec.js`
- [ ] `otherDetails.spec.js`
- [ ] `waterSupply.spec.js`
- [ ] `foodType.spec.js`
- [ ] `processingActivities.spec.js`
- [ ] `importExportActivities.spec.js`
- [ ] `customerType.spec.js`

### Phase 8: Test Suite - Registration & Submission (6 tests)

- [ ] `newOrUpdateRegistration.spec.js`
- [ ] `updateRegistration.spec.js`
- [ ] `registrationSummary.spec.js`
- [ ] `submissionPage.spec.js`
- [ ] `receiveConfirmationNumber.spec.js`
- [ ] `submitRegistration.spec.js`

### Phase 9: Test Suite - Edit Summary (7 tests)

- [ ] `editSummary.spec.js`
- [ ] `editSummary/editEstablishmentContactDetails.spec.js`
- [ ] `editSummary/editEstablishmentOpeningHoursDetails.spec.js`
- [ ] `editSummary/editPartnershipDetails.spec.js`
- [ ] `editSummary/editPartnershipOtherPartners.spec.js`
- [ ] `editSummary/editRegistrationDetails.spec.js`
- [ ] `editSummary/editRepresentativeOtherContactDetails.spec.js`

### Phase 10: Test Suite - UI/UX Features (7 tests)

- [ ] `backButton.spec.js`
- [ ] `betaBanner.spec.js`
- [ ] `cookieBanner.spec.js`
- [ ] `errorSummary.spec.js`
- [ ] `lcLookup.spec.js`
- [ ] `fsaFooter.spec.js`
- [ ] `languageLink.spec.js`

### Phase 11: Test Suite - End-to-End (3 tests)

- [ ] `e2eTestingCatelyn.spec.js`
- [ ] `e2eTestingJamie.spec.js`
- [ ] `e2eTestingPartnership.spec.js`

### Phase 12: Test Suite - Admin Portal (2 tests)

- [ ] `registrationsSearch.spec.js`
- [ ] `tradingStandardChecks.spec.js`

### Phase 13: Pipeline Integration

- [ ] Update `azure-pipelines.yml` with Playwright installation
- [ ] Install Playwright browsers in pipeline (`npx playwright install --with-deps`)
- [ ] Add Playwright test execution step
- [ ] Configure JUnit reporter for Azure DevOps test results
- [ ] Set up artifact publishing for HTML reports and traces
- [ ] Add environment variable injection for secrets (QA_KEY, BASE_URL)
- [ ] Create separate pipeline jobs for parallel suite execution
- [ ] Configure retry logic for flaky tests

### Phase 14: Documentation & Scripts

- [ ] Create `playwright-tests/README.md` with setup instructions
- [ ] Add `run_playwright_local.sh` for local execution
- [ ] Add npm scripts for running test suites
- [ ] Document QA route usage in Playwright context
- [ ] Update Docker configuration for Playwright browsers
- [ ] Create migration guide in `docs/playwright-migration.md`
- [ ] Add troubleshooting guide
- [ ] Create `MIGRATION_PROGRESS.md` with checkboxes

### Phase 15: Validation & Cleanup

- [ ] Run all 53 Playwright tests locally (Chromium, Firefox, WebKit)
- [ ] Run all 53 Playwright tests in Azure pipeline
- [ ] Compare test execution time (WebdriverIO vs Playwright)
- [ ] Validate test reports (HTML, JUnit, traces)
- [ ] Run parallel execution test in pipeline
- [ ] Verify cross-browser compatibility results
- [ ] Document test parity validation results
- [ ] Create rollback plan

---

**Total Tasks**: 15 phases, ~150 individual checkboxes for complete tracking and independent implementation.
