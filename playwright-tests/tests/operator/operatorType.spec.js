import { test, expect } from "@playwright/test";
import { OperatorType } from "../../page-objects/OperatorType.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Operator Type section validation", () => {
  let operatorType;

  test.beforeEach(async ({ page }) => {
    operatorType = new OperatorType(page);
  });

  test("able to change Operator Type @change_operator_type_SDB-55", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/new/operator-type");

    await operatorType.clickContinue(); // Check validation? Or just ensure loaded.
    await operatorType.selectPerson();
    await operatorType.selectCompany();

    await expect(
      page.locator(operatorType.selectors.operatorCompany)
    ).toBeChecked();
    await expect(
      page.locator(operatorType.selectors.operatorPerson)
    ).not.toBeChecked();
  });

  test("happy path for Operator Type @happy_path_SDB-55", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-type");

    await operatorType.selectPerson();
    await operatorType.clickContinue();

    await expect(page).not.toHaveURL(/.*operator-type/);
  });

  test("error shows when no operator type is selected @not_selected_operator_type_SDB-55", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-type");

    await operatorType.clickContinue();

    await expect(
      page.locator(operatorType.selectors.error)
    ).toContainText("You must select an operator type before continuing");
  });
});
