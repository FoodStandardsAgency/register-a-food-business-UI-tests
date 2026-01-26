import { test, expect } from "@playwright/test";
import { RegistrationSummary } from "../../page-objects/RegistrationSummary.page";
import { OpeningDaysStart } from "../../page-objects/editSummary/OpeningDaysStart.page";
import { OpeningDaysSome } from "../../page-objects/editSummary/OpeningDaysSome.page";
import { OpeningHours } from "../../page-objects/OpeningHours.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe.parallel("Edit Summary - Change trading days from every day to some days a week", () => {
  let registrationSummary;
  let openingDaysStart;
  let openingDaysSome;
  let openingHours;

  test.beforeEach(async ({ page }) => {
    registrationSummary = new RegistrationSummary(page);
    openingDaysStart = new OpeningDaysStart(page);
    openingDaysSome = new OpeningDaysSome(page);
    openingHours = new OpeningHours(page);
  });

  test("Change trading days from every day to some days a week @SDB-1091_Change_Trading_Days_Every_Day_to_Some_Days", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    
    // Using the dataset we added to navigation.js
    await injectDataIntoRegSummary(page, "registration-summary-trading-every-day");

    // Skipping "click commonElements.button" as it likely submits the form on the summary page.
    
    await registrationSummary.changeOpeningDays();

    await expect(page).toHaveURL(/.*opening-days-start\?edit=opening-days-start/);
    await expect(page.locator(openingDaysStart.selectors.everyday)).toBeChecked();

    await openingDaysStart.selectSomeDays();
    await openingDaysStart.clickContinue();

    await expect(page).toHaveURL(/.*opening-days-some\?edit=opening-days-start/);

    await openingDaysSome.checkMonday();
    await openingDaysSome.checkTuesday();
    await openingDaysSome.clickContinue();

    await expect(page).toHaveURL(/.*opening-hours/);

    await openingHours.enterMondayOpeningHours("09:00 to 20:00");
    await openingHours.enterTuesdayOpeningHours("09:00 to 15:00");
    await openingHours.clickContinue();

    await expect(page).toHaveURL(/.*registration-summary/);
    await expect(page.locator(registrationSummary.selectors.openingDaysMonday)).toContainText("Monday");
    await expect(page.locator(registrationSummary.selectors.openingDaysTuesday)).toContainText("Tuesday");
  });
});
