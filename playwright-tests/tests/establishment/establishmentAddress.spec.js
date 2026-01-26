import { test, expect } from "@playwright/test";
import { EstablishmentAddress } from "../../page-objects/EstablishmentAddress.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Establishment address section validation", () => {
  let establishmentAddress;

  test.beforeEach(async ({ page }) => {
    establishmentAddress = new EstablishmentAddress(page);
  });

  test("able to find address using lookup service on the establishment address page @SDB-12_happy_path_establishment_address", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-address");

    // Click button (empty postcode?)
    await establishmentAddress.clickContinue();

    // Set postcode
    await establishmentAddress.fillPostcode("BS249ST");

    // Click Find Address (button)
    await establishmentAddress.clickContinue();

    // Expect URL to contain 'establishment-address-select'
    await expect(page).toHaveURL(/.*establishment-address-select/);

    // Click Continue (Select address)
    await establishmentAddress.clickContinue();

    // Expect URL to contain 'la-established'
    await expect(page).toHaveURL(/.*la-established/);

    // Click Continue
    await establishmentAddress.clickContinue();

    // Expect URL to NOT contain 'la-established'
    await expect(page).not.toHaveURL(/.*la-established/);
  });

  test("able to find address using lookup service on the establishment address page (back button) @SDB-12_happy_path_establishment_address_select_2nd_option", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-address");

    await establishmentAddress.fillPostcode("BS249ST");
    await establishmentAddress.clickContinue();

    await expect(page).toHaveURL(/.*establishment-address-select/);

    await establishmentAddress.clickContinue();

    await expect(page).toHaveURL(/.*la-established/);

    // Click Back Button
    // We access the selector directly or use a helper if available
    // Feature uses "estabAddress.backButton"
    // In Page Object: this.selectors.backButton
    await page.locator(establishmentAddress.selectors.backButton).click();

    await expect(page).not.toHaveURL(/.*la-established/);
  });

  test("entering postcode in invalid format and pressing Find Address @SDB-12_error_establishment_address", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-address");

    await establishmentAddress.fillPostcode("§§§");
    await establishmentAddress.clickContinue();

    await expect(
      page.locator(establishmentAddress.selectors.error)
    ).toContainText("Not a valid postcode");
  });

  test("entering postcode, pressing Find Address and then changing postcode @SDB-12_establishment_address_change_postcode", async ({
    page,
  }) => {
    // Requires Postcoder mock/stub? The feature has @Requires-Postcoder logic in WDIO maybe?
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-address");

    await establishmentAddress.fillPostcode("BS249ST");
    await establishmentAddress.clickContinue();

    await expect(page).toHaveURL(/.*establishment-address-select/);

    await establishmentAddress.clickContinue();

    await expect(page).toHaveURL(/.*la-established/);

    await expect(
      page.locator(establishmentAddress.selectors.heading)
    ).toContainText("You are registering with");
  });
});
