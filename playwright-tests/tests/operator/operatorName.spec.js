import { test, expect } from "@playwright/test";
import { OperatorName } from "../../page-objects/OperatorName.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Operator Name section validation", () => {
  let operatorName;

  test.beforeEach(async ({ page }) => {
    operatorName = new OperatorName(page);
  });

  test("happy path for Operator Name @happy_path_SDB-35", async ({ page }) => {
    await openWebsite(page, "url", "/new/operator-name");

    await operatorName.clickContinue(); // Feature has extra click
    await operatorName.fillFirstName("Bob");
    await operatorName.fillLastName("Smith");
    // Date fields are optional? Feature sets them.
    // In PageObject: fillBirthDate(day, month, year)
    // Feature uses "opContactName.day" etc.
    // But OperatorName.page.js has selectors for day, month, year.
    // Wait, are birthdate fields on OperatorName page?
    // Feature says: "And I set '10' to the inputfield 'opContactName.day'"
    // PageObject has selectors for them.
    // So yes.
    // Note: OperatorName page usually doesn't have birthdate in some registrations?
    // But strict conversion requires following the Feature.
    await operatorName.fillBirthDate("10", "10", "1990");

    await operatorName.clickContinue();

    await expect(page).not.toHaveURL(/.*operator-name/);
  });

  test("no first name input @no_first_name_SDB-35", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-name");

    await operatorName.fillLastName("Smith");
    await operatorName.fillBirthDate("10", "10", "1990");
    await operatorName.clickContinue();

    await expect(
      page.locator(operatorName.selectors.lastName)
    ).toHaveValue("Smith");
    await expect(
      page.locator(operatorName.selectors.error)
    ).toContainText("Enter a valid first name");
  });

  test("no last name input @no_last_name_SDB-35", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-name");

    await operatorName.fillFirstName("Bob");
    await operatorName.fillBirthDate("10", "10", "1990");
    await operatorName.clickContinue();

    await expect(
      page.locator(operatorName.selectors.firstName)
    ).toHaveValue("Bob");
    await expect(
      page.locator(operatorName.selectors.error)
    ).toContainText("Enter a valid last name");
  });

  test("no birthdate input @no_birth_date_SDB-35", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-name");

    await operatorName.fillFirstName("Bob");
    await operatorName.fillLastName("Smith");
    await operatorName.clickContinue();

    await expect(
      page.locator(operatorName.selectors.firstName)
    ).toHaveValue("Bob");
    await expect(
      page.locator(operatorName.selectors.lastName)
    ).toHaveValue("Smith");
    // Feature cut off here. Likely expects error for birthdate?
    // Or maybe it's optional?
    // Feature "no birthdate input" scenario implies testing that case.
    // If it expects validation error, I should add it.
    // If not, maybe it passes?
    // But typically "no input" scenario tests validation.
    // I'll check if I can guess the error message or just stop.
    // "Enter a valid birthdate" is likely.
    // But I will stick to what is visible. If needed I'll just check it stays on page.
    await expect(page).toHaveURL(/.*operator-name/);
  });
});
