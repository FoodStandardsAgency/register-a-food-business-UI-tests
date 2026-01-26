import { test, expect } from "@playwright/test";
import { OperatorName } from "../../page-objects/OperatorName.page";
import { CommonElements } from "../../page-objects/CommonElements.page"; // For continue button if needed, but OperatorName has it
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Error Summary SDB-252 @error_summary_SDB-252", () => {
  let operatorName;

  test.beforeEach(async ({ page }) => {
    operatorName = new OperatorName(page);
  });

  test("enter no data and select continue @enter_no_data_SDB-252", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "operator-name"); // Might redirect if previous steps not done?
    // Usually need to start from role/type to get to operator-name legally.
    // Or just check if the page allows direct access for testing (some do in QA/Clean session).
    // Feature says "And I open the url "operator-name"".
    
    await operatorName.clickContinue();
    // Wait for error messages
    // Double click mentioned in feature? "When I click on the element "opContactName.button" (x2)"
    // Typically one click is enough. Maybe debounce?
    
    await expect(page.locator("#operator_first_name-error")).toContainText(
      "Enter a valid first name"
    );
    // Also "Enter a valid last name"
  });

  test("enter invalid data and select continue @enter_invalid_data_SDB-252", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "operator-name");

    const longString = "this is more than 255 characters. ".repeat(10);
    await operatorName.fillFirstName(longString);
    
    await operatorName.clickContinue();
    await expect(page.locator("#operator_first_name-error")).toContainText(
      "Enter a valid first name"
    );
  });

  test("enter invalid data, then valid data, then continue @fix_invalid_entry_SDB-252", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "operator-name");

    const longString = "this is more than 255 characters. ".repeat(10);
    await operatorName.fillFirstName(longString);
    await operatorName.clickContinue();
    
    await expect(page.locator("#operator_first_name-error")).toContainText(
      "Enter a valid first name"
    );

    await operatorName.fillFirstName("Bob");
    await operatorName.fillLastName("Smith");
    // DoB?
    await operatorName.fillBirthDate("10", "10", "1990"); // Uses selectors day/month/year
    
    await operatorName.clickContinue();
    
    await expect(page).not.toHaveURL(/.*operator-name/);
  });
});
