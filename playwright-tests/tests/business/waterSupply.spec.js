import { test, expect } from "../../utils/fixtures";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";
import { RegistrationSummary } from "../../page-objects/RegistrationSummary.page";
import { BusinessWaterSupply } from "../../page-objects/BusinessWaterSupply.page";

test.describe.parallel("Water Supply @business_water_supply_SDB-1125", () => {
  let businessWaterSupply;
  let registrationSummary;

  test.beforeEach(async ({ page }) => {
    businessWaterSupply = new BusinessWaterSupply(page);
    registrationSummary = new RegistrationSummary(page);
  });

  test("able to select one statement and proceed @water_supply_happy_path_SDB-1125", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-water-supply");
    await businessWaterSupply.checkPrivate();
    await businessWaterSupply.clickContinue();
    await expect(page).not.toHaveURL(/.*business-water-supply/);
  });

  test("not selected any options and tries to continue @water_supply_no_selection_SDB-1125", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-water-supply");
    await businessWaterSupply.clickContinue();
    await expect(page).toHaveURL(/.*business-water-supply/);
    await expect(page.locator(businessWaterSupply.selectors.error)).toContainText(
      "You must select a water supply type before continuing"
    );
  });

  test("selects one option, clicks Continue and goes back @water_supply_private_forward_then_back_SDB-1125", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-water-supply");
    await businessWaterSupply.checkPrivate();
    await businessWaterSupply.clickContinue();
    await expect(page).not.toHaveURL(/.*business-water-supply/);
    
    // Back button handling
    const backLink = page.locator(".govuk-back-link");
    if (await backLink.isVisible()) {
        await backLink.click();
    } else {
        await page.goBack();
    }

    await expect(page.locator(businessWaterSupply.selectors.privateCheckbox)).toBeChecked();
    await expect(page.locator(businessWaterSupply.selectors.publicCheckbox)).not.toBeChecked();
    await expect(page.locator(businessWaterSupply.selectors.publicAndPrivate)).not.toBeChecked();
  });

  test("selects Public and Private and goes to registration-summary @water_supply_public_and_private_registration_summary_SDB-1125", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-water-supply");
    await businessWaterSupply.checkPublicAndPrivate();
    await businessWaterSupply.clickContinue();
    await expect(page).not.toHaveURL(/.*business-water-supply/);
    await injectDataIntoRegSummary(page, "registration-summary-partnership");
    await expect(page.locator(registrationSummary.selectors.waterSupply)).toContainText("Public");
  });

  test("selects one option and then changes it @water_supply_change_option_SDB-1125", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-water-supply");
    await businessWaterSupply.checkPublic();
    await expect(page.locator(businessWaterSupply.selectors.publicCheckbox)).toBeChecked();
    await businessWaterSupply.checkPrivate();
    await expect(page.locator(businessWaterSupply.selectors.privateCheckbox)).toBeChecked();
    await expect(page.locator(businessWaterSupply.selectors.publicCheckbox)).not.toBeChecked();
  });
});
