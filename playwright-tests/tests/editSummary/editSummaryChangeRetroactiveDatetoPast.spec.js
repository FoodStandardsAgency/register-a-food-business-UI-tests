import { test, expect } from "@playwright/test";
import { RegistrationSummary } from "../../page-objects/RegistrationSummary.page";
import { EstablishmentOpeningDate } from "../../page-objects/EstablishmentOpeningDate.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe.parallel("Edit Summary - Change retroactive trading start date to another retroactive date", () => {
  let registrationSummary;
  let establishmentOpeningDate;

  test.beforeEach(async ({ page }) => {
    registrationSummary = new RegistrationSummary(page);
    establishmentOpeningDate = new EstablishmentOpeningDate(page);
  });

  test("Change retroactive trading start date to another retroactive date @SDB-828_retroactive_to_retroactive", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(page, "registration-summary");

    await registrationSummary.changeTradingStartDate();

    await expect(page).toHaveURL(
      /.*establishment-opening-status\?edit=establishment-opening-status/
    );
    await expect(
      page.locator(establishmentOpeningDate.selectors.alreadyTrading)
    ).toBeChecked();

    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(
      /.*establishment-opening-date-retroactive\?edit=establishment-opening-status/
    );

    await expect(
      page.locator(establishmentOpeningDate.selectors.day)
    ).not.toBeEmpty();
    await expect(
      page.locator(establishmentOpeningDate.selectors.month)
    ).not.toBeEmpty();
    await expect(
      page.locator(establishmentOpeningDate.selectors.year)
    ).not.toBeEmpty();

    await establishmentOpeningDate.fillDate("05", "02", "1990");
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*registration-summary/);
    await expect(
      page.locator(registrationSummary.selectors.tradingStartDate)
    ).toContainText("05 Feb 1990");
  });
});
