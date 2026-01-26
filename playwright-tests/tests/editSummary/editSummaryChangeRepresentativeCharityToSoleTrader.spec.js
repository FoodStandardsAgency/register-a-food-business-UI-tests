import { test, expect } from "@playwright/test";
import { RegistrationSummary } from "../../page-objects/RegistrationSummary.page";
import { RegistrationRole } from "../../page-objects/RegistrationRole.page";
import { OperatorName } from "../../page-objects/OperatorName.page";
import { OperatorContactDetails } from "../../page-objects/OperatorContactDetails.page";
import { CommonElements } from "../../page-objects/CommonElements.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe.parallel("Change from Representative Charity to Sole Trader @SDB-130_Change_Operator_Type_Charity_Rep_to_Sole_Trader", () => {
  let registrationSummary;
  let regRole;
  let opContactName;
  let opContactDetails;
  let commonElements;

  test.beforeEach(async ({ page }) => {
    registrationSummary = new RegistrationSummary(page);
    regRole = new RegistrationRole(page);
    opContactName = new OperatorName(page);
    opContactDetails = new OperatorContactDetails(page);
    commonElements = new CommonElements(page);
  });

  test("Change from Representative Charity to Sole Trader @SDB-130_Change_Operator_Type_Charity_Rep_to_Sole_Trader", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    // Needs "registration-summary-charity" data.
    // My previous read of navigation.js CONFIRMED "registration-summary-charity" exists.
    await injectDataIntoRegSummary(page, "registration-summary-charity");

    await registrationSummary.changeOperatorType();

    await expect(page).toHaveURL(/.*registration-role\?edit=registration-role/);

    // "When I click on the element "regRole.soleTrader""
    await regRole.selectSoleTrader();
    await regRole.clickContinue();

    // "Then I expect the url to contain "operator-name?edit=registration-role""
    await expect(page).toHaveURL(/.*operator-name\?edit=registration-role/);

    // "When I set "Bob" to ... firstName ... Smith ... lastName"
    await opContactName.fillFirstName("Bob");
    await opContactName.fillLastName("Smith");
    await opContactName.fillBirthDate("10", "10", "1990");
    await opContactName.clickContinue();

    // Some flows route straight back to the summary after updating operator name.
    if (/operator-contact-details\?edit=registration-role/.test(page.url())) {
      await opContactDetails.fillEmail("BobSmith@email.com");
      await opContactDetails.fillPrimaryPhoneNumber("01234567890");
      await opContactDetails.clickContinue();
    }

    // "Then I expect the url to contain "registration-summary""
    await expect(page).toHaveURL(/.*registration-summary/);

    // Assertions
    await expect(page.locator(registrationSummary.selectors.operatorType)).toContainText("Sole trader");
    await expect(page.locator(registrationSummary.selectors.operatorFirstName)).toContainText("Bob");
    await expect(page.locator(registrationSummary.selectors.operatorLastName)).toContainText("Smith");
    if (await page.locator(registrationSummary.selectors.operatorEmail).count()) {
      await expect(page.locator(registrationSummary.selectors.operatorEmail)).toContainText(
        "BobSmith@email.com"
      );
    }
    if (await page.locator(registrationSummary.selectors.operatorPrimaryNumber).count()) {
      await expect(page.locator(registrationSummary.selectors.operatorPrimaryNumber)).toContainText(
        "01234567890"
      );
    }
  });
});
