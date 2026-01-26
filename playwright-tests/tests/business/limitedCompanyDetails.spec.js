import { test, expect } from "@playwright/test";
import { LimitedCompanyDetails } from "../../page-objects/LimitedCompanyDetails.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Limited Company SDB-36 @limited_company_details_SDB-36", () => {
  let limitedCompanyDetails;

  test.beforeEach(async ({ page }) => {
    limitedCompanyDetails = new LimitedCompanyDetails(page);
  });

  test("happy path @happy_path_SDB-36", async ({ page }) => {
    // Feature doesn't have /cleansession here but usually it's implied or not strictly needed if isolation works.
    // However, other tests use it. "Given I open the url "operator-company-details""
    // I'll add cleansession for consistency and safety.
    await openWebsite(page, "url", "/cleansession"); 
    await openWebsite(page, "url", "/new/operator-company-details");

    await limitedCompanyDetails.clickContinue(); // "companyDetails.button"
    await limitedCompanyDetails.fillCompanyName("Bob's Burgers");
    await limitedCompanyDetails.fillCompaniesHouseNumber("12345678");
    await limitedCompanyDetails.clickContinue();
    
    await expect(page).not.toHaveURL(/.*operator-company-details/);
  });

  test("not filled in company name @not_filled_in_name_SDB-36", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-company-details");

    await limitedCompanyDetails.fillCompaniesHouseNumber("12345678");
    await limitedCompanyDetails.clickContinue();

    await expect(page.locator(limitedCompanyDetails.selectors.error)).toContainText(
      "Enter a valid company name"
    );
    await expect(page.locator(limitedCompanyDetails.selectors.companiesHouseNumber)).toHaveValue("12345678");
  });

  test("not filled in company number @not_filled_in_number_SDB-36", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-company-details");

    await limitedCompanyDetails.fillCompanyName("Bob's Burgers");
    await limitedCompanyDetails.clickContinue();

    await expect(page.locator(limitedCompanyDetails.selectors.error)).toContainText(
      "Enter a valid Companies House reference number"
    );
    await expect(page.locator(limitedCompanyDetails.selectors.name)).toHaveValue("Bob's Burgers");
  });

  test("invalid company number @invalid_number_SDB-36", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-company-details");

    await limitedCompanyDetails.fillCompanyName("Diane's Diner");
    await limitedCompanyDetails.fillCompaniesHouseNumber("§§21");
    await limitedCompanyDetails.clickContinue();

    await expect(page.locator(limitedCompanyDetails.selectors.error)).toContainText(
      "Enter a valid Companies House reference number"
    );
    await expect(page.locator(limitedCompanyDetails.selectors.name)).toHaveValue("Diane's Diner");
    await expect(page.locator(limitedCompanyDetails.selectors.companiesHouseNumber)).toHaveValue("§§21");
  });
});
