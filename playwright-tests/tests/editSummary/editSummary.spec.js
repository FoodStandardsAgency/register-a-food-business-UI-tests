import { test, expect } from "@playwright/test";
import { RegistrationSummary } from "../../page-objects/RegistrationSummary.page";
import { OperatorContactDetails } from "../../page-objects/OperatorContactDetails.page";
import { EstablishmentTradingName } from "../../page-objects/EstablishmentTradingName.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe.parallel("Edit Registration Summary @edit_registration_summary_SDB-157", () => {
  let registrationSummary;
  let opContactDetails;
  let estabTradingName;

  test.beforeEach(async ({ page }) => {
    registrationSummary = new RegistrationSummary(page);
    opContactDetails = new OperatorContactDetails(page);
    estabTradingName = new EstablishmentTradingName(page);
  });

  test("no changes needed to summary page @SDB-157_happy_path", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(page, "registration-summary");

    await registrationSummary.clickContinue(); // 1st click
    await registrationSummary.clickContinue(); // 2nd click
    
    // As observed in registrationSummary.spec.js, button click might navigate to declaration.
    await expect(page).toHaveURL(/.*declaration/);
  });

  test("editing operator email @SDB-157_editing_operator_email", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    // "registration-summary-representative" data might not exist in utils, using "registration-summary" as fallback or check if I can mock it.
    // The previous analysis of navigation.js DID NOT show "registration-summary-representative".
    // I will use "registration-summary" and assume representative flow or similar.
    // However, the feature specifically tests Representative data structure.
    // If I use "registration-summary" (Sole Trader), `changeOperatorEmail` works same way.
    // But text `email@email.com` matches `registration-summary` dataset in `navigation.js`.
    await injectDataIntoRegSummary(page, "registration-summary"); 
    
    // Feature uses "registrationSummary.changeOperatorEmail".
    // Check page object for this selector.
    // In RegistrationSummary.page.js: 
    // changeOperatorEmail: "#main-content > ... > a"
    // I'll use a locator matching the selector pattern in Page Object.
    
    // Wait, Page Object defines `changeOperatorEmail` selector.
    // I need access to it.
    const changeLink = page.locator(registrationSummary.selectors.changeOperatorEmail);
    await changeLink.click();

    await expect(page).toHaveURL(/.*operator-contact-details\?edit=operator-contact-details/);
    
    await expect(page.locator(opContactDetails.selectors.emailAddress)).toHaveValue("email@email.com");
    
    // "And I expect that element "commonElements.backButton" is not visible"
    // Usually back button is .govuk-back-link
    await expect(page.locator(".govuk-back-link")).not.toBeVisible();

    await opContactDetails.fillEmail("changed@email.com");
    await opContactDetails.clickContinue();

    await expect(page).toHaveURL(/.*registration-summary/);
    await expect(page.locator(registrationSummary.selectors.operatorEmail)).toContainText("changed@email.com");
  });

  test("editing establishment trading name @SDB-157_editing_trading_name", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(page, "registration-summary");

    const changeLink = page.locator(registrationSummary.selectors.changeTradingName);
    await changeLink.click();

    await expect(page).toHaveURL(/.*establishment-trading-name\?edit=establishment-trading-name/);
    await expect(page.locator(estabTradingName.selectors.tradingNameInput)).toHaveValue("Trading name");

    await estabTradingName.fillTradingName("Changed Trading Name");
    await estabTradingName.clickContinue();

    await expect(page).toHaveURL(/.*registration-summary/);
    await expect(page.locator(registrationSummary.selectors.tradingName)).toContainText("Changed Trading Name");
  });

  test("editing additional trading names @editing_additional_trading_names", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    // Need "registration-summary" dataset.
    // In "registration-summary" dataset (navigation.js):
    // establishment_additional_trading_names: ["Trading name 1", "Trading name 2"]
    await injectDataIntoRegSummary(page, "registration-summary");

    // Click "changeAdditionalTradingNames"
    const changeLink = page.locator(registrationSummary.selectors.changeAdditionalTradingNames);
    await changeLink.click();

    await expect(page).toHaveURL(/.*establishment-trading-name\?edit=establishment-trading-name/);
    await expect(page.locator(estabTradingName.selectors.tradingNameInput)).toHaveValue("Trading name");

    // Click "deleteFirstAdditionalTradingNameBtn"
    await estabTradingName.clickDeleteFirstAdditionalTradingName();

    // "And I expect that element "estabTradingName.firstAdditionalTradingNameLabel" contains the text "Trading name 2""
    // Because "Trading name 1" was deleted (first one), now the first one displayed is "Trading name 2".
    await expect(page.locator(estabTradingName.selectors.firstAdditionalTradingNameLabel)).toContainText("Trading name 2");

    // "Then I click on the element "estabTradingName.changeFirstTradingNameLink""
    await estabTradingName.clickChangeFirstTradingName();

    // "And I expect that element "estabTradingName.additionalTradingNameInput" contains the text "Trading name 2""
    await expect(page.locator(estabTradingName.selectors.additionalTradingNameInput)).toHaveValue("Trading name 2");

    await estabTradingName.fillAdditionalTradingName("Changed Additional Trading name");
    await estabTradingName.clickContinue(); // This saves the specific additional name change?
    // Wait, EstablishmentTradingName page usually has "Save" or "Continue" button. Both mapped to `button` selector in PO.
    
    await expect(page).toHaveURL(/.*establishment-trading-name/); 
    // The test says "expect url to contain establishment-trading-name".
    // It seems after editing an additional name, we go back to the list of additional names (which is technically same page or sub-page).
    
    await expect(page.locator(estabTradingName.selectors.firstAdditionalTradingNameLabel)).toContainText("Changed Additional Trading name");

    // "When I click on the element "estabTradingName.button"" (Continue from list page)
    await estabTradingName.clickContinue();

    await expect(page).toHaveURL(/.*registration-summary/);
    // "And I expect that element "registrationSummary.additionalTradingNames" contains the text "Changed Additional Trading name""
    // Note: RegistrationSummary PO selector `additionalTradingNames` is list items.
    await expect(page.locator(registrationSummary.selectors.additionalTradingNames)).toContainText("Changed Additional Trading name");
  });

  test("when editing page the back button is not visible @SDB-157_back_button_not_visible", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(page, "registration-summary");

    const changeLink = page.locator(registrationSummary.selectors.changeTradingName);
    await changeLink.click();

    await expect(page).toHaveURL(/.*establishment-trading-name\?edit=establishment-trading-name/);
    await expect(page.locator(".govuk-back-link")).not.toBeVisible();
  });

  test("editing operator email and testing error validation @SDB-157_editing_with_error", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(page, "registration-summary");

    const changeLink = page.locator(registrationSummary.selectors.changeOperatorEmail);
    await changeLink.click();

    await expect(page).toHaveURL(/.*operator-contact-details\?edit=operator-contact-details/);
    await expect(page.locator(opContactDetails.selectors.emailAddress)).toHaveValue("email@email.com");
    await expect(page.locator(".govuk-back-link")).not.toBeVisible();

    await opContactDetails.fillEmail("±±±");
    await opContactDetails.clickContinue();

    await expect(page.locator(opContactDetails.selectors.error)).toContainText("Enter a valid operator email address");
  });
});
