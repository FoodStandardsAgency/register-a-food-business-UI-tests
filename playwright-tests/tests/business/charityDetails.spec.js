import { test, expect } from "@playwright/test";
import { CharityDetails } from "../../page-objects/CharityDetails.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Charity Details section validation @charity_details_SDB-40", () => {
  let charityDetails;

  test.beforeEach(async ({ page }) => {
    charityDetails = new CharityDetails(page);
  });

  test("testing charity details happy path @charity_details_happy_path_SDB-40", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-charity-details");

    await charityDetails.clickContinue(); // "charityDetails.button"
    // Wait, feature says "Then I click on the element..."
    // Given ... And ... Then (click button) When (set name) Then (click button) ...
    // Clicking button initially might be to trigger empty validation or just user flow.
    
    await charityDetails.fillCharityName("Charity Name example");
    await charityDetails.clickContinue();
    await expect(page).not.toHaveURL(/.*operator-charity-details/);
  });

  test("testing charity details happy path with number @charity_details_happy_path_with_number_SDB-40", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-charity-details");

    await charityDetails.fillCharityName("Charity Name example");
    await charityDetails.fillCharityNumber("12345678");
    await charityDetails.clickContinue();
    await expect(page).not.toHaveURL(/.*operator-charity-details/);
  });

  test("testing error message when not input charity name @charity_details_not_filled_name_SDB-40", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-charity-details");

    await charityDetails.fillCharityNumber("12345678");
    await charityDetails.clickContinue();

    await expect(page.locator(charityDetails.selectors.error)).toContainText(
      "Enter a valid charity, organisation or trust name"
    );
    await expect(page.locator(charityDetails.selectors.charityNumber)).toHaveValue("12345678");
  });

  test("testing error message when input invalid charity number @charity_details_invalid_number_SDB-40", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-charity-details");

    await charityDetails.fillCharityName("Charity Name example");
    await charityDetails.fillCharityNumber("±±±±");
    await charityDetails.clickContinue();

    await expect(page.locator(charityDetails.selectors.error)).toContainText(
      "Enter a valid charity number"
    );
    await expect(page.locator(charityDetails.selectors.charityName)).toHaveValue(
      "Charity Name example"
    );
  });

  test("I want to find out my charity reference number @charity_details_link_SDB-40", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-charity-details");

    await page.locator(charityDetails.selectors.questionsCharityReference).click();
    
    const link = page.locator(charityDetails.selectors.link);
    await expect(link).toHaveAttribute(
      "href",
      "http://apps.charitycommission.gov.uk/Showcharity/RegisterOfCharities/registerhomepage.aspx"
    );

    // Given I click on the element "charityDetails.link"
    // And I pause for 1000ms
    // Then I expect a new tab has been opened
    
    // Playwright handling new tab
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      link.click()
    ]);
    
    await newPage.waitForLoadState();
    // Expect new page to exist or check title/url
    // Feature just says "expect a new tab has been opened" which we implicitly checked by waitForEvent
  });
});
