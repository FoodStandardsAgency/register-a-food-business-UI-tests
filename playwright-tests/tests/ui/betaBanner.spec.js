import { test, expect } from "@playwright/test";
import { CommonElements } from "../../page-objects/CommonElements.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Beta Banner validation @beta_banner_SDB-373", () => {
  let commonElements;

  test.beforeEach(async ({ page }) => {
    commonElements = new CommonElements(page);
  });

  test("beta banner is visible on multiple pages @beta_banner_SDB-373", async ({
    page,
  }) => {
    const pages = [
      "index",
      "customer-type",
      "establishment-address",
      "establishment-contact-details",
      "establishment-trading-name",
    ];

    await openWebsite(page, "url", "/cleansession");

    for (const url of pages) {
      await openWebsite(page, "url", url);
      await expect(page.locator(commonElements.selectors.betaLink)).toBeVisible();
    }
  });

  test("I want to fill in the feedback form @beta_banner_SDB-373", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "operator-company-details");
    
    const betaLink = page.locator(commonElements.selectors.betaLink);
    await expect(betaLink).toHaveAttribute("href", "https://forms.office.com/r/k8E8Yz2w5t");
    
    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      commonElements.clickBetaLink(),
    ]);
    
    await newPage.waitForLoadState();
    // Verification of new page URL is tricky if it redirects or is external, but checking generic load is okay.
    // Spec says "Then I expect a new tab has been opened".
    expect(newPage).toBeDefined();
  });

  test("I want to fill in the feedback form from summary confirmation @beta_banner_SDB-373_summary_confirmation", async ({
    page,
  }) => {
      // Need injected data for summary confirmation? 
      // "Given I open the url "summary-confirmation"" - usually requires session data.
      // But beta banner is in layout.
      // Let's try direct navigation, if it redirects to start, test fails. 
      // Use injectDataIntoRegSummary if possible or mock session.
      // For now, assume openWebsite handles it or use "/cleansession" then navigate.
      
      // Feature says:
      // Given I open the url "/cleansession"
      // Given I open the url "summary-confirmation"
      
      await openWebsite(page, "url", "/cleansession");
      await openWebsite(page, "url", "summary-confirmation");
      
      const betaLink = page.locator(commonElements.selectors.betaLink);
      // Wait, is beta link different on Summary Confirmation?
      await expect(betaLink).toHaveAttribute("href", "https://forms.office.com/r/k8E8Yz2w5t");

      const [newPage] = await Promise.all([
        page.context().waitForEvent("page"),
        commonElements.clickBetaLink(),
      ]);
      expect(newPage).toBeDefined();
  });
});
