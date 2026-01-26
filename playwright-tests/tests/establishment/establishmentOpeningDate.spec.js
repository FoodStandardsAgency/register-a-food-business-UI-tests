import { test, expect } from "@playwright/test";
import { EstablishmentOpeningDate } from "../../page-objects/EstablishmentOpeningDate.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Establishment opening status and date", () => {
  let establishmentOpeningDate;

  test.beforeEach(async ({ page }) => {
    establishmentOpeningDate = new EstablishmentOpeningDate(page);
  });

  test("proactive trading date happy path @SDB-114_trading_date_proactive_happy_path", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-opening-status");

    // Click continue button first?
    await establishmentOpeningDate.clickContinue();

    await establishmentOpeningDate.selectNotTrading();
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-proactive/);

    await establishmentOpeningDate.fillDate("29", "03", "2999");
    await establishmentOpeningDate.clickContinue();

    await expect(page).not.toHaveURL(/.*establishment-opening-date-proactive/);
  });

  test("proactive trading date no dates @SDB-114_trading_date_proactive_no_dates", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-opening-status");

    await establishmentOpeningDate.selectNotTrading();
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-proactive/);

    await establishmentOpeningDate.clickContinue();
    await expect(page).toHaveURL(/.*establishment-opening-date-proactive/);
    await expect(
      page.locator(establishmentOpeningDate.selectors.error).first()
    ).toContainText("Enter a valid opening date");
  });

  test("proactive trading date past date @SDB-114_trading_date_proactive_past_date", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-opening-status");

    await establishmentOpeningDate.selectNotTrading();
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-proactive/);

    await establishmentOpeningDate.fillDate("29", "03", "1999");
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-proactive/);
    await expect(
      page.locator(establishmentOpeningDate.selectors.error).first()
    ).toContainText("Enter a valid opening date");
    // Wait, the test expects error "Enter a valid opening date" for PAst date in Proactive flow?
    // Proactive means future date. So past date is invalid.
    // The message "Enter a valid opening date" is what the feature says.
  });

  test("proactive trading date invalid date @SDB-114_trading_date_proactive_invalid_date", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-opening-status");

    await establishmentOpeningDate.selectNotTrading();
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-proactive/);

    await establishmentOpeningDate.fillDate("123", "28974", "1234");
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-proactive/);
    await expect(
      page.locator(establishmentOpeningDate.selectors.error).first()
    ).toContainText("Enter a valid opening date");
  });

  test("retroactive trading date happy path @SDB-115_trading_date_retroactive_happy_path", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-opening-status");

    await establishmentOpeningDate.selectAlreadyTrading();
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-retroactive/);

    await establishmentOpeningDate.fillDate("29", "03", "1999");
    await establishmentOpeningDate.clickContinue();

    await expect(page).not.toHaveURL(/.*establishment-opening-date-retroactive/);
  });

  test("retroactive trading date no dates @SDB-115_trading_date_reatroactive_no_dates", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-opening-status");

    await establishmentOpeningDate.selectAlreadyTrading();
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-retroactive/);

    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-retroactive/);
    await expect(
      page.locator(establishmentOpeningDate.selectors.error).first()
    ).toContainText("Enter a valid opening date");
  });

  test("retroactive trading date future date @SDB-115_trading_date_retroactive_future_date", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-opening-status");

    await establishmentOpeningDate.selectAlreadyTrading();
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-retroactive/);

    await establishmentOpeningDate.fillDate("29", "03", "2999");
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-retroactive/);
    await expect(
      page.locator(establishmentOpeningDate.selectors.error).first()
    ).toContainText("Enter a valid opening date");
  });

  test("retroactive trading date invalid date @SDB-115_trading_date_retroactive_invalid_date", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-opening-status");

    await establishmentOpeningDate.selectAlreadyTrading();
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-retroactive/);

    // Scenario ends in feature file before steps are defined in my reading?
    // Let me check the feature file content again.
    // It was cut off.
    // Assuming same steps as proactive invalid date.
    await establishmentOpeningDate.fillDate("123", "28974", "1234");
    await establishmentOpeningDate.clickContinue();

    await expect(page).toHaveURL(/.*establishment-opening-date-retroactive/);
    await expect(
      page.locator(establishmentOpeningDate.selectors.error).first()
    ).toContainText("Enter a valid opening date"); // Assuming same error text
  });
});
