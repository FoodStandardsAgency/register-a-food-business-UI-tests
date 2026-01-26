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
- [x] Port `establishmentAddress.page.js`
- [x] Port `establishmentAddressType.page.js`
- [x] Port `establishmentContactDetails.page.js`
- [x] Port `establishmentOpeningDate.page.js`
- [x] Port `establishmentOpeningDays.page.js`
- [x] Port `establishmentTradingName.page.js`
- [x] Port `openingHours.page.js`
- [x] Port `laselector.page.js`
- [x] Port `operatorAddress.page.js`
- [x] Port `operatorContactDetails.page.js`
- [x] Port `operatorName.page.js`
- [x] Port `operatorType.page.js`
- [x] Port `registrationRole.page.js`
- [x] Port `representativeOperatorContactDetails.page.js`
- [x] Port `partnership.page.js`
- [x] Port `partnershipChange.page.js`
- [x] Port `partnershipContactDetails.page.js`
- [x] Port `businessScale.page.js`
- [x] Port `businessTypeIn.page.js`
- [x] Port `charityDetails.page.js`
- [x] Port `limitedCompanyDetails.page.js`
- [x] Port `businessOtherDetails.page.js`
- [x] Port `businessWaterSupply.page.js`
- [x] Port `foodType.page.js`
- [x] Port `processingActivities.page.js`
- [ ] Port `importExportActivities.page.js`  # intentionally removed earlier
- [x] Port `customerType.page.js`
- [x] Port `newOrUpdateRegistration.page.js`
- [ ] Port `updateRegistration.page.js`  # page object not required/created (tests use navigation helper)
- [x] Port `registrationSummary.page.js`
- [x] Port `submissionPage.page.js`
- [ ] Port `receiveConfirmationNumber.page.js`  # page object not created separately
- [x] Port `editSummary.page.js` (and subdirectory pages)
- [ ] Port `backButton.page.js`  # handled via `CommonElements`
- [ ] Port `betaBanner.page.js`  # handled via `CommonElements`
- [ ] Port `cookieBanner.page.js`  # handled via `CommonElements`
- [ ] Port `errorSummary.page.js`  # handled via `CommonElements`
- [ ] Port `lcLookup.page.js`      # not added as separate page object
- [ ] Port `fsaFooter.page.js`    # handled via `CommonElements`
- [ ] Port `languageLink.page.js` # handled via `CommonElements`
- [x] Port admin portal page objects (2 files)

### Phase 4: Test Suite - Landing & Navigation (1 test)

- [x] `landingPage.spec.js`

### Phase 5: Test Suite - Establishment (8 tests)

- [x] `establishmentAddress.spec.js`
- [x] `establishmentAddressType.spec.js`
- [x] `establishmentContactDetails.spec.js`
- [x] `establishmentOpeningDate.spec.js`
- [x] `establishmentOpeningDays.spec.js`
- [x] `establishmentTradingName.spec.js`
- [x] `openingHours.spec.js`
- [x] `laselector.spec.js`

### Phase 6: Test Suite - Operator (9 tests)

- [x] `operatorAddress.spec.js`
- [x] `operatorContactDetails.spec.js`
- [x] `operatorName.spec.js`
- [x] `operatorType.spec.js`
- [x] `registrationRole.spec.js`
- [x] `representativeOperatorContactDetails.spec.js`
- [x] `partnership.spec.js`
- [x] `partnershipChange.spec.js`
- [x] `partnershipContactDetails.spec.js`

### Phase 7: Test Suite - Business Details (10 tests)

- [x] `businessScale.spec.js`
- [x] `businessTypeIn.spec.js`
- [x] `charityDetails.spec.js`
- [x] `limitedCompanyDetails.spec.js`
- [x] `otherDetails.spec.js`
- [x] `waterSupply.spec.js`
- [x] `foodType.spec.js`
- [x] `processingActivities.spec.js`
- [ ] `importExportActivities.spec.js`  # intentionally removed
- [x] `customerType.spec.js`

### Phase 8: Test Suite - Registration & Submission (6 tests)

- [x] `newOrUpdateRegistration.spec.js`
- [x] `updateRegistration.spec.js`
- [x] `registrationSummary.spec.js`
- [x] `submissionPage.spec.js`
- [x] `receiveConfirmationNumber.spec.js`
- [x] `submitRegistration.spec.js`

### Phase 9: Test Suite - Edit Summary (7 tests)

- [x] `editSummary.spec.js`
- [x] `editSummary/editEstablishmentContactDetails.spec.js`
- [x] `editSummary/editEstablishmentOpeningHoursDetails.spec.js`
- [x] `editSummary/editPartnershipDetails.spec.js`
- [x] `editSummary/editPartnershipOtherPartners.spec.js`
- [x] `editSummary/editRegistrationDetails.spec.js`
- [x] `editSummary/editRepresentativeOtherContactDetails.spec.js`

### Phase 10: Test Suite - UI/UX Features (7 tests)

- [x] `backButton.spec.js`
- [x] `betaBanner.spec.js`
- [x] `cookieBanner.spec.js`
- [x] `errorSummary.spec.js`
- [x] `lcLookup.spec.js`
- [x] `fsaFooter.spec.js`
- [x] `languageLink.spec.js`

### Phase 11: Test Suite - End-to-End (3 tests)

- [x] `e2eTestingCatelyn.spec.js`
- [x] `e2eTestingJamie.spec.js`
- [x] `e2eTestingPartnership.spec.js`

### Phase 12: Test Suite - Admin Portal (2 tests)

- [x] `registrationsSearch.spec.js`
- [x] `tradingStandardChecks.spec.js`

### Phase 13: Pipeline Integration

- [x] Update `azure-pipelines.yml` with Playwright installation
- [x] Install Playwright browsers in pipeline (`npx playwright install --with-deps`)
- [x] Add Playwright test execution step
- [x] Configure JUnit reporter for Azure DevOps test results
- [x] Set up artifact publishing for HTML reports and traces
- [x] Add environment variable injection for secrets (QA_KEY, BASE_URL)
- [ ] Create separate pipeline jobs for parallel suite execution
- [ ] Configure retry logic for flaky tests

### Phase 14: Documentation & Scripts

- [x] Create `playwright-tests/README.md` with setup instructions
- [x] Add `run_playwright_local.sh` for local execution
- [x] Add npm scripts for running test suites
- [x] Document QA route usage in Playwright context
- [x] Update Docker configuration for Playwright browsers
- [x] Create migration guide in `docs/playwright-migration.md`
- [x] Add troubleshooting guide
- [x] Create `MIGRATION_PROGRESS.md` with checkboxes

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
