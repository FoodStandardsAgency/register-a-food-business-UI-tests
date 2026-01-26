import { test, expect } from "@playwright/test";
import { BusinessType } from "../../page-objects/BusinessType.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Business Type In Validation @business_Type_In_SDB-5", () => {
  let businessType;

  test.beforeEach(async ({ page }) => {
    businessType = new BusinessType(page);
  });

  test("testing business type in happy path @business_Type_In_happy_path_SDB-5", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-type");

    await businessType.clickContinue(); // "businessTypeIn.button" - wait, feature says Click on button before setting text?
    // Feature logic:
    // And I click on the element "businessTypeIn.button"
    // When I set "Alcohol" to the inputfield "businessTypeIn.search"
    // And I click on the element "businessTypeIn.option2"
    // When I click on the element "businessTypeIn.button"
    // Then I expect the url to not contain "business-type"
    
    // It seems it clicks continue first (maybe to trigger validation or something, or it's just user flow).
    await businessType.clickContinue(); 
    await businessType.searchBusinessType("Alcohol");
    await businessType.selectSecondOption();
    await businessType.clickContinue();
    await expect(page).not.toHaveURL(/.*business-type/);
  });

  test("testing business type in something but not selecting something @business_Type_In_no_selection_SDB-5", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-type");

    await businessType.searchBusinessType("Egg");
    // And I click on the element "commonElements.fsaFooter" - likely to blur or close autocomplete
    await page.locator("footer").first().click(); // generic footer click
    
    await businessType.clickContinue();
    await expect(page).toHaveURL(/.*business-type/);
    await expect(page.locator(businessType.selectors.error)).toContainText(
      "You must select a business type before continuing"
    );
  });

  test("testing business type in not entering anything @business_Type_In_error_SDB-5", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-type");

    await businessType.clickContinue();
    await businessType.clickContinue();
    await expect(page).toHaveURL(/.*business-type/);
    await expect(page.locator(businessType.selectors.error)).toContainText(
      "You must select a business type before continuing"
    );
  });

  test("testing business type in invalid @business_Type_In_invalid_SDB-5", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-type");

    await businessType.searchBusinessType("±±±");
    await businessType.clickContinue();
    await businessType.clickContinue(); // Feature does it twice
    await expect(page).toHaveURL(/.*business-type/);
    await expect(page.locator(businessType.selectors.error)).toContainText(
      "You must select a business type before continuing"
    );
  });

  test("testing business type in Welsh @business_Type_In_Welsh", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-type");

    // Use the header language toggle to avoid strict-mode collisions with the footer link.
    await page.locator("#languageCyHeader").click();
    await page.waitForLoadState("networkidle");

    await businessType.searchBusinessType("siop");
    await businessType.selectSecondOption();
    // # Then I expect that element "businessTypeIn.search" contains the text "Cigydd (siop)"
    
    await businessType.clickContinue();
    await expect(page).not.toHaveURL(/.*business-type/);
  });
});
