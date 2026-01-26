import { test, expect } from "@playwright/test";
import { BusinessScale } from "../../page-objects/BusinessScale.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Business Scale Page @business_scale", () => {
  let businessScale;

  test.beforeEach(async ({ page }) => {
    businessScale = new BusinessScale(page);
  });

  test("business scale page check one box @business_scale_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-scale");

    await businessScale.clickContinue(); // "businessScale.button"
    await businessScale.checkLocal(); // "businessScale.firstCheckbox"
    await expect(page.locator(businessScale.selectors.firstCheckbox)).toBeChecked();

    await businessScale.clickContinue();
    // And I pause for 1000ms
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*business-scale/);
  });

  test("business scale page check all boxes @business_scale_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-scale");

    await businessScale.checkLocal(); // firstSelection
    await expect(page.locator(businessScale.selectors.firstCheckbox)).toBeChecked();

    await businessScale.checkNational(); // secondCheckbox
    await expect(page.locator(businessScale.selectors.secondCheckbox)).toBeChecked();

    await businessScale.checkExport(); // thirdCheckbox
    await expect(page.locator(businessScale.selectors.thirdCheckbox)).toBeChecked();

    await businessScale.checkOnline(); // fourthCheckbox
    await expect(page.locator(businessScale.selectors.fourthCheckbox)).toBeChecked();

    await businessScale.checkFBO(); // fifthCheckbox
    await expect(page.locator(businessScale.selectors.fifthCheckbox)).toBeChecked();

    // The feature file lists 6th and 7th checkbox but the Page Object only has specific methods for up to FBO (5th).
    // Let's check Page Object provided previously.
    // Page Object has sixthCheckbox: "#SENIOR_YOUTH", seventhCheckbox: "#HEALTHCARE" in selectors.
    // It doesn't have explicit methods checkSeniorYouth etc, but has checkOption(selector).
    // Or I can use locator direct.
    // I will use checkOption with the selector.

    await businessScale.checkOption(businessScale.selectors.sixthCheckbox);
    await expect(page.locator(businessScale.selectors.sixthCheckbox)).toBeChecked();

    await businessScale.checkOption(businessScale.selectors.seventhCheckbox);
    await expect(page.locator(businessScale.selectors.seventhCheckbox)).toBeChecked();

    await businessScale.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*business-scale/);
  });

  test("business scale page check none box @business_scale_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-scale");

    await businessScale.clickContinue(); // This line was in feature but seems redundant if it's just checking valid selection. Ah, maybe verification it stays? Feature says: When I click on element button, And I click on element eigthCheckbox. Wait, clicking button first submits?
    // Feature says "When I click on the element "businessScale.button"" then "And I click on the element "businessScale.eigthCheckbox"".
    // If button submits, creating error, then clicking checkbox.
    // Let's follow feature exactly.
    await businessScale.clickContinue(); 
    
    await businessScale.checkOption(businessScale.selectors.eigthCheckbox); // NONE
    await expect(page.locator(businessScale.selectors.eigthCheckbox)).toBeChecked();

    await businessScale.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*business-scale/);
  });

  test("business scale page check dont know box @business_scale_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-scale");

    await businessScale.clickContinue();
    await businessScale.checkOption(businessScale.selectors.ninthCheckbox); // DONT_KNOW
    await expect(page.locator(businessScale.selectors.ninthCheckbox)).toBeChecked();

    await businessScale.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*business-scale/);
  });

  test("business scale page check first checkbox is unchecked after dont know checkbox is checked @business_scale_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-scale");

    await businessScale.clickContinue();
    await businessScale.checkLocal(); // firstCheckbox
    await expect(page.locator(businessScale.selectors.firstCheckbox)).toBeChecked();

    await businessScale.checkOption(businessScale.selectors.ninthCheckbox); // DONT_KNOW
    await expect(page.locator(businessScale.selectors.ninthCheckbox)).toBeChecked();
    await expect(page.locator(businessScale.selectors.firstCheckbox)).not.toBeChecked();

    await businessScale.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*business-scale/);
  });

  test("business scale page check first checkbox is unchecked after none checkbox is checked @business_scale_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-scale");

    await businessScale.clickContinue();
    await businessScale.checkLocal();
    await expect(page.locator(businessScale.selectors.firstCheckbox)).toBeChecked();

    await businessScale.checkOption(businessScale.selectors.eigthCheckbox); // NONE
    await expect(page.locator(businessScale.selectors.eigthCheckbox)).toBeChecked();
    await expect(page.locator(businessScale.selectors.firstCheckbox)).not.toBeChecked();

    await businessScale.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*business-scale/);
  });

  test("business scale page check invalid selection @business_scale_page_invalid", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-scale");

    await businessScale.clickContinue();
    await expect(page.locator(businessScale.selectors.error)).toContainText(
      "Please select all options that apply to your business"
    );
  });
});
