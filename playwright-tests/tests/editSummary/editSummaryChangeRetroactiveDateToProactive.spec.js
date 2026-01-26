import { test, expect } from "@playwright/test";
import { RegistrationSummary } from "../../page-objects/RegistrationSummary.page";
import { EstablishmentOpeningDate } from "../../page-objects/EstablishmentOpeningDate.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe.parallel("Change retroactive trading start date to a proactive date @SDB-828_retroactive_to_proactive", () => {
  let registrationSummary;
  let estabOpeningDate;

  test.beforeEach(async ({ page }) => {
    registrationSummary = new RegistrationSummary(page);
    estabOpeningDate = new EstablishmentOpeningDate(page);
  });

  test("Change retroactive trading start date to a proactive date @SDB-828_retroactive_to_proactive", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(page, "registration-summary");

    // "When I click on the element "registrationSummary.changeTradingStartDate""
    // Note: RegistrationSummary.page.js might call it `tradingStartDate` but here it is the CHANGE link.
    // Page Object has `tradingStartDate` selector for VALUE.
    // Does it have change link?
    // I read `RegistrationSummary.page.js` earlier, it has `tradingStartDate` as `... #establishment_opening_date`.
    // It DOES NOT explicitly list `changeTradingStartDate`.
    // It has `changeEstablishmentAddress`, `changeOperatorName` etc.
    // Feature uses "registrationSummary.changeTradingStartDate".
    // I need to add this selector or use generic. 
    // Usually identifiers are like `#changeEstablishmentOpeningDateRow`.
    // I will try to find the row for Opening Date and find the link.
    // Or I'll update the Page Object / use locator here.
    // I will use a locator based on text or inspecting.
    // Assuming selector id `#changeStartupDateRow` or similar based on pattern.
    // Or I can use `page.locator('a[href*="establishment-opening-status"]')`.
    // Feature expects url to contain `establishment-opening-status?edit=...`
    
    // I'll try to guess key selector or look for link with href containing `establishment-opening-status`.
    const changeLink = page.locator('a[href*="establishment-opening-status"]');
    await changeLink.click();

    await expect(page).toHaveURL(/.*establishment-opening-status\?edit=establishment-opening-status/);

    // "And I expect that element "estabOpeningDate.alreadyTrading" is selected"
    await expect(page.locator(estabOpeningDate.selectors.alreadyTrading)).toBeChecked();

    // "When I click on the element "estabOpeningDate.notTrading""
    await estabOpeningDate.chooseNotTrading();
    await estabOpeningDate.clickContinue();

    // "Then I expect the url to contain "establishment-opening-date-proactive?edit=establishment-opening-status""
    await expect(page).toHaveURL(/.*establishment-opening-date-proactive\?edit=establishment-opening-status/);

    await estabOpeningDate.setDay("01");
    await estabOpeningDate.setMonth("01");
    await estabOpeningDate.setYear("2050");
    await estabOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*registration-summary/);
    await expect(page.locator(registrationSummary.selectors.tradingStartDate)).toContainText("01 Jan 2050");
  });
});
