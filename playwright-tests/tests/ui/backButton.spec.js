import { test, expect } from "@playwright/test";
import { RegistrationRole } from "../../page-objects/RegistrationRole.page";
import { OperatorType } from "../../page-objects/OperatorType.page";
import { OperatorName } from "../../page-objects/OperatorName.page";
import { CommonElements } from "../../page-objects/CommonElements.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe.parallel("Back button SDB-232 @back_button_SDB-232", () => {
  let registrationRole;
  let operatorType;
  let operatorName;
  let commonElements;

  test.beforeEach(async ({ page }) => {
    registrationRole = new RegistrationRole(page);
    operatorType = new OperatorType(page);
    operatorName = new OperatorName(page);
    commonElements = new CommonElements(page);
  });

  test("go directly to operator name then return to registration role1 @select_sole_trader_direct_route_SDB-232", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "registration-role");
    
    await registrationRole.selectSoleTrader();
    await registrationRole.clickContinue();
    await expect(page).toHaveURL(/.*operator-name/);

    await commonElements.clickBackButton();
    await expect(page).toHaveURL(/.*registration-role/);
  });

  test("go directly to operator name then return to registration role2 @select_representative_indirect_route_SDB-232", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "registration-role");
    
    await registrationRole.selectRepresentative();
    await registrationRole.clickContinue();
    await expect(page).toHaveURL(/.*operator-type/);

    await operatorType.selectPerson();
    await operatorType.clickContinue();
    await expect(page).toHaveURL(/.*operator-name/);

    await commonElements.clickBackButton();
    await expect(page).toHaveURL(/.*operator-type/);

    await commonElements.clickBackButton();
    await expect(page).toHaveURL(/.*registration-role/);
  });

  test("go directly to operator name then return to registration role3 @same_page_via_different_routes_SDB-232", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "registration-role");
    
    await registrationRole.selectSoleTrader();
    await registrationRole.clickContinue();
    await expect(page).toHaveURL(/.*operator-name/);

    await operatorName.fillFirstName("Bob");
    await operatorName.fillLastName("Smith");
    await operatorName.fillBirthDate("01", "01", "2000");
    
    await operatorName.clickContinue();
    await expect(page).not.toHaveURL(/.*operator-name/);
    
    await commonElements.clickBackButton();
    await expect(page).toHaveURL(/.*operator-name/);
    
    await expect(page.locator(operatorName.selectors.firstName)).toHaveValue("Bob");
    await expect(page.locator(operatorName.selectors.lastName)).toHaveValue("Smith");
    await expect(page.locator(operatorName.selectors.day)).toHaveValue("01");
    await expect(page.locator(operatorName.selectors.month)).toHaveValue("01");
    await expect(page.locator(operatorName.selectors.year)).toHaveValue("2000");
    
    await commonElements.clickBackButton();
    await expect(page).toHaveURL(/.*registration-role/);
    await expect(page.locator(registrationRole.selectors.soleTrader)).toBeChecked();

    // Now change route
    await registrationRole.selectRepresentative();
    await registrationRole.clickContinue();
    await expect(page).toHaveURL(/.*operator-type/);
    
    await operatorType.selectPerson();
    await operatorType.clickContinue();
    await expect(page).toHaveURL(/.*operator-name/);
    
    // Data should be cleared
    await expect(page.locator(operatorName.selectors.firstName)).not.toHaveValue("Bob");
    await expect(page.locator(operatorName.selectors.lastName)).not.toHaveValue("Smith");
  });
});
