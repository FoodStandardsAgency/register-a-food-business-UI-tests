import { test, expect } from "@playwright/test";
import { RegistrationRole } from "../../page-objects/RegistrationRole.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Registration Role SDB-54", () => {
  let registrationRole;

  test.beforeEach(async ({ page }) => {
    registrationRole = new RegistrationRole(page);
  });

  test("able to change registration role @change_registration_role_SDB-54", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/new/registration-role");

    await registrationRole.clickContinue(); // Validation check / initial interaction
    await registrationRole.selectSoleTrader();
    await registrationRole.selectPartnership();

    await expect(
      page.locator(registrationRole.selectors.partnership)
    ).toBeChecked();
    await expect(
      page.locator(registrationRole.selectors.soleTrader)
    ).not.toBeChecked();
  });

  test("happy path for registration role sole trader @happy_path_sole_trader_SDB-54", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/registration-role");

    await registrationRole.selectSoleTrader();
    await registrationRole.clickContinue();

    await expect(page).toHaveURL(/.*operator-name/);
  });

  test("happy path for registration role partnership @happy_path__partnership_SDB-54", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/registration-role");

    await registrationRole.selectPartnership();
    await registrationRole.clickContinue();

    await expect(page).toHaveURL(/.*partner-name/);
  });

  test("happy path for registration role representative @happy_path__representative_SDB-54", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/registration-role");

    await registrationRole.selectRepresentative();
    await registrationRole.clickContinue();

    await expect(page).toHaveURL(/.*operator-type/);
  });

  test("error shows when no registration is selected @not_selected_registration_role_SDB-54", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/registration-role");

    await registrationRole.clickContinue();

    await expect(
      page.locator(registrationRole.selectors.error)
    ).toContainText("You must select a role before continuing");
  });

  test("I can not deselect a role @can_not_deselect_role_SDB-54", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/registration-role");

    await registrationRole.selectSoleTrader();
    await registrationRole.selectSoleTrader(); // Clicking again

    await expect(
      page.locator(registrationRole.selectors.soleTrader)
    ).toBeChecked();
  });
});
