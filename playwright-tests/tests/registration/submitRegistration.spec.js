import { test, expect } from "@playwright/test";
import { SubmitRegistration } from "../../page-objects/SubmitRegistration.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe.parallel("Declaration Page @submit_registration", () => {
  let submitRegistration;

  test.beforeEach(async ({ page }) => {
    submitRegistration = new SubmitRegistration(page);
  });

  test("declaration page flow to application complete @declaration_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(page, "registration-summary", "/declaration");

    // "When I click on the element "submitRegistration.button"" (Maybe checking error first?)
    await submitRegistration.clickContinue();

    await submitRegistration.checkFirstDeclaration();
    await submitRegistration.checkSecondDeclaration();
    await submitRegistration.checkThirdDeclaration();

    await submitRegistration.clickContinue();
    await expect(page).not.toHaveURL(/.*declaration/);
    await expect(page).toHaveURL(/.*summary-confirmation/);
  });

  test("declaration page errors for one ticked @declaration_page_one_checked", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    // Just opening "declaration" might fail if no session data.
    // Feature says "Given I open the url 'declaration'". 
    // Usually requires session. I will inject data.
    await injectDataIntoRegSummary(page, "registration-summary", "/declaration");

    await submitRegistration.checkFirstDeclaration();
    await submitRegistration.clickContinue();

    await expect(page.locator(submitRegistration.selectors.error)).toContainText(
      "You must tick all the declarations before continuing"
    );
    
    await expect(page.locator(submitRegistration.selectors.firstCheckbox)).toBeChecked();
    await expect(page.locator(submitRegistration.selectors.secondCheckbox)).not.toBeChecked();
    await expect(page.locator(submitRegistration.selectors.thirdCheckbox)).not.toBeChecked();
  });

  test("declaration page errors for none ticked @declaration_page_sad", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(page, "registration-summary", "/declaration");

    await submitRegistration.clickContinue();

    await expect(page.locator(submitRegistration.selectors.error)).toContainText(
      "You must tick all the declarations before continuing"
    );
  });
});
