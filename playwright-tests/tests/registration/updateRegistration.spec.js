import { test, expect } from "@playwright/test";
import { NewOrUpdateRegistration } from "../../page-objects/NewOrUpdateRegistration.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe("Update Registration", () => {
  let newOrUpdateRegistration;

  test.beforeEach(async ({ page }) => {
    newOrUpdateRegistration = new NewOrUpdateRegistration(page);
  });

  test("testing happy path for update registration @update_registration", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");

    // The update-registration page needs the local authority to be present in session.
    await injectDataIntoRegSummary(page, "registration-summary", "/update-registration");

    // And I expect that element "newOrUpdateReg.heading" contains the text "Your local authority is"
    // Using NewOrUpdateRegistration page object for heading as per feature file reference
    const heading = page.locator(newOrUpdateRegistration.selectors.heading);
    await expect(heading).toContainText("Your local authority is");
    await expect(heading).not.toContainText("undefined");
  });
});
