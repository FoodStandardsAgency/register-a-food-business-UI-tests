# Playwright Migration Progress Tracker

Track the progress of migrating 53 WebdriverIO/Cucumber feature files to Playwright Test.

## Summary

- **Total Tests**: 53
- **Completed**: 1
- **In Progress**: 0
- **Remaining**: 52

---

## Phase 1: Infrastructure Setup ✅

- [x] Create `playwright-tests/` folder structure
- [x] Install Playwright dependencies (`@playwright/test`)
- [x] Initialize `playwright.config.js` with Chromium, Firefox, WebKit
- [x] Create base page object class (JavaScript)
- [x] Set up environment variable handling (.env support)
- [x] Configure reporters (HTML, JUnit, traces)
- [x] Set up test fixtures for common page initialization

**Status**: ✅ COMPLETED

---

## Phase 2: Shared Utilities ✅

- [x] Audit existing 24 action helpers - identify which are standard Playwright functions
- [x] Audit existing 28 check helpers - identify which are standard Playwright assertions
- [x] Port only custom utilities not covered by Playwright's built-in API
- [x] Port `openWebsite` with URL/site/adminportal modes
- [x] Create `injectDataIntoRegSummary` QA route utility
- [x] Set up authentication fixtures for admin portal
- [x] Document mapping of WebdriverIO helpers to Playwright equivalents

**Status**: ✅ COMPLETED

**Notes**:

- Only 2 custom utilities needed (openWebsite, injectDataIntoRegSummary)
- All other helpers have direct Playwright equivalents
- See `docs/UTILITY_MAPPING.md` for complete mapping

---

## Phase 3: Page Objects (41 files) ✅

- [x] Port `commonElements.page.js`
- [x] Port `landingPage.page.js`
- [x] Port `establishmentAddress.page.js`
- [x] Port `establishmentAddressType.page.js`
- [x] Port `establishmentContactDetails.page.js`
- [x] Port `establishmentOpeningDate.page.js`
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
- [x] Port `businessType.page.js`
- [x] Port `charityDetails.page.js`
- [x] Port `limitedCompanyDetails.page.js`
- [x] Port `businessOtherDetails.page.js`
- [x] Port `businessWaterSupply.page.js`
- [x] Port `foodType.page.js`
- [x] Port `processingActivities.page.js`
- [x] Port `importExportActivities.page.js`
- [x] Port `customerType.page.js`
- [x] Port `newOrUpdateRegistration.page.js`
- [x] Port `registrationSummary.page.js`
- [x] Port `submissionPage.page.js`
- [x] Port `summaryConfirmation.page.js`
- [x] Port `submitRegistration.page.js`
- [x] Port `editSummary/` subdirectory pages (10 files)
- [x] Port admin portal page objects (2 files)

**Status**: ✅ COMPLETED (41/41 completed)

---

## Phase 4: Test Suite - Landing & Navigation (1 test) ✅

- [x] `landingPage.spec.js`

**Status**: ✅ COMPLETED

**Status**: ⏳ NOT STARTED (0/1 completed)

---

## Phase 5: Test Suite - Establishment (8 tests)

- [ ] `establishmentAddress.spec.js`
- [ ] `establishmentAddressType.spec.js`
- [ ] `establishmentContactDetails.spec.js`
- [ ] `establishmentOpeningDate.spec.js`
- [ ] `establishmentOpeningDays.spec.js`
- [ ] `establishmentTradingName.spec.js`
- [ ] `openingHours.spec.js`
- [ ] `laselector.spec.js`

**Status**: ⏳ NOT STARTED (0/8 completed)

---

## Phase 6: Test Suite - Operator (9 tests)

- [ ] `operatorAddress.spec.js`
- [ ] `operatorContactDetails.spec.js`
- [ ] `operatorName.spec.js`
- [ ] `operatorType.spec.js`
- [ ] `registrationRole.spec.js`
- [ ] `representativeOperatorContactDetails.spec.js`
- [ ] `partnership.spec.js`
- [ ] `partnershipChange.spec.js`
- [ ] `partnershipContactDetails.spec.js`

**Status**: ⏳ NOT STARTED (0/9 completed)

---

## Phase 7: Test Suite - Business Details (10 tests)

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

**Status**: ⏳ NOT STARTED (0/10 completed)

---

## Phase 8: Test Suite - Registration & Submission (6 tests)

- [ ] `newOrUpdateRegistration.spec.js`
- [ ] `updateRegistration.spec.js`
- [ ] `registrationSummary.spec.js`
- [ ] `submissionPage.spec.js`
- [ ] `receiveConfirmationNumber.spec.js`
- [ ] `submitRegistration.spec.js`

**Status**: ⏳ NOT STARTED (0/6 completed)

---

## Phase 9: Test Suite - Edit Summary (7 tests)

- [ ] `editSummary.spec.js`
- [ ] `editSummary/editEstablishmentContactDetails.spec.js`
- [ ] `editSummary/editEstablishmentOpeningHoursDetails.spec.js`
- [ ] `editSummary/editPartnershipDetails.spec.js`
- [ ] `editSummary/editPartnershipOtherPartners.spec.js`
- [ ] `editSummary/editRegistrationDetails.spec.js`
- [ ] `editSummary/editRepresentativeOtherContactDetails.spec.js`

**Status**: ⏳ NOT STARTED (0/7 completed)

---

## Phase 10: Test Suite - UI/UX Features (7 tests)

- [ ] `backButton.spec.js`
- [ ] `betaBanner.spec.js`
- [ ] `cookieBanner.spec.js`
- [ ] `errorSummary.spec.js`
- [ ] `lcLookup.spec.js`
- [ ] `fsaFooter.spec.js`
- [ ] `languageLink.spec.js`

**Status**: ⏳ NOT STARTED (0/7 completed)

---

## Phase 11: Test Suite - End-to-End (3 tests)

- [ ] `e2eTestingCatelyn.spec.js`
- [ ] `e2eTestingJamie.spec.js`
- [ ] `e2eTestingPartnership.spec.js`

**Status**: ⏳ NOT STARTED (0/3 completed)

---

## Phase 12: Test Suite - Admin Portal (2 tests)

- [ ] `registrationsSearch.spec.js`
- [ ] `tradingStandardChecks.spec.js`

**Status**: ⏳ NOT STARTED (0/2 completed)

---

## Phase 13: Pipeline Integration

- [ ] Update `azure-pipelines.yml` with Playwright installation
- [ ] Install Playwright browsers in pipeline (`npx playwright install --with-deps`)
- [ ] Add Playwright test execution step
- [ ] Configure JUnit reporter for Azure DevOps test results
- [ ] Set up artifact publishing for HTML reports and traces
- [ ] Add environment variable injection for secrets (QA_KEY, BASE_URL)
- [ ] Create separate pipeline jobs for parallel suite execution
- [ ] Configure retry logic for flaky tests

**Status**: ⏳ NOT STARTED (0/8 completed)

---

## Phase 14: Documentation & Scripts

- [x] Create `playwright-tests/README.md` with setup instructions
- [x] Add `run_playwright_local.sh` for local execution
- [ ] Add npm scripts for running test suites (partially done in package.json)
- [x] Document QA route usage in Playwright context
- [ ] Update Docker configuration for Playwright browsers
- [ ] Create migration guide in `docs/playwright-migration.md`
- [ ] Add troubleshooting guide
- [x] Create `MIGRATION_PROGRESS.md` with checkboxes

**Status**: 🔄 IN PROGRESS (4/8 completed)

---

## Phase 15: Validation & Cleanup

- [ ] Run all 53 Playwright tests locally (Chromium, Firefox, WebKit)
- [ ] Run all 53 Playwright tests in Azure pipeline
- [ ] Compare test execution time (WebdriverIO vs Playwright)
- [ ] Validate test reports (HTML, JUnit, traces)
- [ ] Run parallel execution test in pipeline
- [ ] Verify cross-browser compatibility results
- [ ] Document test parity validation results
- [ ] Create rollback plan

**Status**: ⏳ NOT STARTED (0/8 completed)

---

## Overall Progress

| Phase                        | Status         | Progress |
| ---------------------------- | -------------- | -------- |
| Phase 1: Infrastructure      | ✅ Complete    | 7/7      |
| Phase 2: Utilities           | ✅ Complete    | 7/7      |
| Phase 3: Page Objects        | 🔄 In Progress | 2/41     |
| Phase 4: Landing Tests       | ⏳ Not Started | 0/1      |
| Phase 5: Establishment Tests | ⏳ Not Started | 0/8      |
| Phase 6: Operator Tests      | ⏳ Not Started | 0/9      |
| Phase 7: Business Tests      | ⏳ Not Started | 0/10     |
| Phase 8: Registration Tests  | ⏳ Not Started | 0/6      |
| Phase 9: Edit Summary Tests  | ⏳ Not Started | 0/7      |
| Phase 10: UI Features Tests  | ⏳ Not Started | 0/7      |
| Phase 11: E2E Tests          | ⏳ Not Started | 0/3      |
| Phase 12: Admin Tests        | ⏳ Not Started | 0/2      |
| Phase 13: Pipeline           | ⏳ Not Started | 0/8      |
| Phase 14: Documentation      | 🔄 In Progress | 4/8      |
| Phase 15: Validation         | ⏳ Not Started | 0/8      |

**Total**: 27/134 tasks completed (~20%)

---

## Notes

- Phases 1 and 2 completed - infrastructure and utilities in place
- 2 page objects ported (CommonElements, LandingPage)
- Ready to begin test migration
- Focus next on completing remaining page objects before starting tests
