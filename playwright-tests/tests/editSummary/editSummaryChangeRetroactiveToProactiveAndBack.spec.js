import { test, expect } from "@playwright/test";
import { RegistrationSummary } from "../../page-objects/RegistrationSummary.page";
import { EstablishmentOpeningDate } from "../../page-objects/EstablishmentOpeningDate.page";
import { CommonElements } from "../../page-objects/CommonElements.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe.parallel("Edit Summary - Change retroactive to proactive, continue, then navigate back and change to retroactive", () => {
  let registrationSummary;
  let establishmentOpeningDate;
  let commonElements;

  test.beforeEach(async ({ page }) => {
    registrationSummary = new RegistrationSummary(page);
    establishmentOpeningDate = new EstablishmentOpeningDate(page);
    commonElements = new CommonElements(page);
  });

  test("Change retroactive to proactive, continue, then navigate back and change to retroactive @SDB-828_retroactive_proactive_back_navigation", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(page, "registration-summary");

    await registrationSummary.changeTradingStartDate();

    await expect(page).toHaveURL(
      /.*establishment-opening-status\?edit=establishment-opening-status/
    );
    await expect(
      page.locator(commonElements.selectors.backButton)
    ).not.toBeVisible();
    await expect(
      page.locator(establishmentOpeningDate.selectors.alreadyTrading)
    ).toBeChecked();

    await establishmentOpeningDate.selectNotTrading();
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(
      /.*establishment-opening-date-proactive\?edit=establishment-opening-status/
    );
    await expect(
      page.locator(commonElements.selectors.backButton)
    ).toBeVisible();

    await commonElements.clickBackButton();

    await expect(page).toHaveURL(
      /.*establishment-opening-status\?edit=establishment-opening-status/
    );
    await expect(
      page.locator(commonElements.selectors.backButton)
    ).not.toBeVisible();
    await expect(
      page.locator(establishmentOpeningDate.selectors.notTrading)
    ).toBeChecked();

    await establishmentOpeningDate.selectAlreadyTrading();
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(
      /.*establishment-opening-date-retroactive\?edit=establishment-opening-status/
    );
    await expect(
      page.locator(commonElements.selectors.backButton)
    ).toBeVisible();

    await establishmentOpeningDate.fillDate("05", "02", "1990");
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*registration-summary/);
    await expect(
      page.locator(registrationSummary.selectors.tradingStartDate)
    ).toContainText("05 Feb 1990");
  });
});
