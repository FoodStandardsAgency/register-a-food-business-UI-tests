import { test, expect } from "@playwright/test";
import { SubmitRegistration } from "../../page-objects/SubmitRegistration.page";
import { SummaryConfirmation } from "../../page-objects/SummaryConfirmation.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe.parallel("Receive Confirmation Number @receive_confirmation_number_SDB-47", () => {
  let submitRegistration;
  let summaryConfirmation;

  test.beforeEach(async ({ page }) => {
    submitRegistration = new SubmitRegistration(page);
    summaryConfirmation = new SummaryConfirmation(page);
  });

  test("Submit registration and shown reference number on the summary confirmation page @SDB-47_happy_path", async ({
    page,
  }) => {
    // Feature uses "/qa/declaration" with "declaration" data
    // Assuming "registration-summary" data works for full flow, but we need to land on declaration page.
    // injectDataIntoRegSummary usually lands on /registration-summary (default).
    // Try explicit targetPath.
    
    // Note: The app might redirect to /registration-summary if trying to access /declaration without confirming summary?
    // Usually Summary -> Declaration -> Confirmation.
    // I can navigate to /declaration directly if session is valid.
    
    await injectDataIntoRegSummary(page, "registration-summary", "/declaration");
    
    // Initial click? Feature says "When I click on element button". 
    // Button on declaration page is "Submit".
    // But usually one checks boxes first.
    // Feature scenario:
    // When I click on element "submitRegistration.button" (Attempts submit without checks?)
    // And I click on element "submitRegistration.firstCheckbox"
    // ... second ... third ...
    // When I click on element "submitRegistration.button"
    // Then ... summary-confirmation
    
    await submitRegistration.clickContinue(); // Attempt submit (might fail validation but tests mechanics)
    
    await submitRegistration.checkFirstDeclaration();
    await submitRegistration.checkSecondDeclaration();
    await submitRegistration.checkThirdDeclaration();
    
    await submitRegistration.clickContinue(); // Final Submit
    
    // "And I pause for 5000ms" - waiting for submission
    // Playwright auto-waits but for async processes we might need to wait for URL.
    await expect(page).toHaveURL(/.*summary-confirmation/, { timeout: 10000 });
    
    await expect(page.locator(summaryConfirmation.selectors.fsaRn)).toBeVisible();
  });
});
