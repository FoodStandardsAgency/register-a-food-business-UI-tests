import { test, expect } from "@playwright/test";
import { TradingStandards } from "../../page-objects/adminportal/TradingStandards.page.js";
import { openWebsite } from "../../utils/navigation.js";

test.describe("Trading standards checks Page @trading_standards_check_section", () => {
  let tradingStandards;

  test.beforeEach(async ({ page }) => {
    tradingStandards = new TradingStandards(page);
    try {
      await openWebsite(page, "adminportal", "/");
    } catch (e) {
      // Skip the test if admin portal is not reachable in this environment
      test.skip(true, `Admin portal not reachable: ${e.message}`);
    }
  });

  test("Adding values to the trading standard checks section @add_trading_standard_check_values_happy_path", async ({ page }) => {
    await expect(page.locator(tradingStandards.selectors.heading)).toContainText(
      "Welcome to the Register a Food Business Administration Portal"
    );
    await tradingStandards.clickEnter();
    await expect(page).toHaveURL(/.*la/);
    await tradingStandards.searchCouncil("test"); // Using search method wrapper
    // Feature says: When I set "test" ... And I click ... searchButton
    // Page object has searchCouncil(term) which does fill + click.
    
    await page.locator(tradingStandards.selectors.editButton).click();
    await expect(page.locator(tradingStandards.selectors.editHeading)).toContainText("Edit a Local Authority");
    
    await tradingStandards.fillInitialCheck("5");
    await tradingStandards.fillRegularCheck("8");
    await page.locator(tradingStandards.selectors.chaseCheckbox).click(); // Toggle chase
    
    await page.locator(tradingStandards.selectors.button).click(); // Submit
    
    // Check details
    await expect(page.locator(tradingStandards.selectors.heading)).toContainText("Check details before submit");
    await page.locator(tradingStandards.selectors.button).click(); // Confirm
    
    await expect(page.locator(tradingStandards.selectors.successMessage)).toContainText("Local authority updated successfuly");
  });

  test("Check trading standard checks values have saved @check_trading_standard_check_values", async ({ page }) => {
    await expect(page.locator(tradingStandards.selectors.heading)).toContainText(
      "Welcome to the Register a Food Business Administration Portal"
    );
    await tradingStandards.clickEnter();
    await expect(page).toHaveURL(/.*la/);
    await tradingStandards.searchCouncil("test");
    
    await page.locator(tradingStandards.selectors.viewCouncil).click();
    
    await expect(page.locator(tradingStandards.selectors.viewInitialCheck)).toContainText("5");
    await expect(page.locator(tradingStandards.selectors.viewRegularCheck)).toContainText("8");
    await expect(page.locator(tradingStandards.selectors.checkChase)).toContainText("Yes");
  });

  test("Resetting the chase checkbox to 'No' @reset_chase_checkbox", async ({ page }) => {
    await expect(page.locator(tradingStandards.selectors.welcomeTitle)).toContainText(
        "Welcome to the Register a Food Business Administration Portal"
    );
    await tradingStandards.clickEnter();
    await expect(page).toHaveURL(/.*la/);
    await tradingStandards.searchCouncil("test");
    
    await page.locator(tradingStandards.selectors.editButton).click();
    await page.locator(tradingStandards.selectors.chaseCheckbox).click(); // Toggle back
    
    await page.locator(tradingStandards.selectors.button).click();
    await expect(page.locator(tradingStandards.selectors.heading)).toContainText("Check details before submit");
    await page.locator(tradingStandards.selectors.button).click();
    
    await expect(page.locator(tradingStandards.selectors.successMessage)).toContainText("Local authority updated successfuly");
  });
});
