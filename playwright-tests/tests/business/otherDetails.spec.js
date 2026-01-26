import { test, expect } from "@playwright/test";
import { BusinessOtherDetails } from "../../page-objects/BusinessOtherDetails.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Business Other Details @business_other_details", () => {
  let businessOtherDetails;

  test.beforeEach(async ({ page }) => {
    businessOtherDetails = new BusinessOtherDetails(page);
  });

  test("Happy path @happy_path_SDB-111", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession"); // Added cleansession for consistency
    await openWebsite(page, "url", "/new/business-other-details");

    // Use the "other details" free-text field on this page.
    await businessOtherDetails.fillOtherDetails("Test Trading Name");
    await businessOtherDetails.clickContinue();
    await expect(page).not.toHaveURL(/.*business-other-details/);
  });

  test("Invalid other details @invalid_other_details_SDB-111", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/business-other-details");

    const longText =
      "This is a paragraph containing more than 1500 characters. ".repeat(32);
    // 32 * 56 chars approx > 1500.
    
    await businessOtherDetails.fillOtherDetails(longText);
    await businessOtherDetails.clickContinue();

    await expect(page.locator(businessOtherDetails.selectors.error)).toContainText(
      "Your message is too long. Please shorten it to less than 1500 characters"
    );
    await expect(page.locator(businessOtherDetails.selectors.otherDetails)).toHaveValue(
      longText.trimEnd()
    );
  });
});
