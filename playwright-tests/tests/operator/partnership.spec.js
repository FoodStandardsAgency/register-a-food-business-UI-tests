import { test, expect } from "@playwright/test";
import { Partnership } from "../../page-objects/Partnership.page";
import { PartnershipChange } from "../../page-objects/PartnershipChange.page";
import { MainPartnershipContact } from "../../page-objects/editSummary/MainPartnershipContact.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe("partnership", () => {
  let partnership;
  let partnershipChange; // if needed
  let mainPartnershipContact;

  test.beforeEach(async ({ page }) => {
    partnership = new Partnership(page);
    partnershipChange = new PartnershipChange(page);
    mainPartnershipContact = new MainPartnershipContact(page);
  });

  test("Deleting partner", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    // Seed a session then open the partner-name page (this environment does not expose /qa/partner-name).
    await injectDataIntoRegSummary(page, "registration-summary-partnership", "/partner-name?edit=partner-name");

    // Create two partners
    await partnershipChange.clickAddPartner();
    await expect(page).toHaveURL(/.*partnership\/partner-details\?edit=partner-name/);
    await page.locator(partnership.selectors.partner_name).fill("one");
    await page.getByRole("button", { name: /add partner/i }).click();

    await expect(page).toHaveURL(/.*partner-name\?edit=partner-name/);
    await partnershipChange.clickAddPartner();
    await expect(page).toHaveURL(/.*partnership\/partner-details\?edit=partner-name/);
    await page.locator(partnership.selectors.partner_name).fill("two");
    await page.getByRole("button", { name: /add partner/i }).click();

    // Verify both appear and delete one
    const partnersTable = page.getByRole("table", { name: /partners/i });
    await expect(partnersTable).toContainText("one");
    await expect(partnersTable).toContainText("two");

    await page.getByRole("button", { name: /delete partner/i }).first().click();
    await expect(partnersTable).not.toContainText(/\bone\b/i);
    await expect(partnersTable).toContainText("two");
  });

  test("no selection on main-partnership-contact @unhappy_paths_selection", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(
      page,
      "registration-summary-partnership",
      "/main-partnership-contact?edit=main-partnership-contact"
    );

    await mainPartnershipContact.clickContinue();
    await expect(page.locator(".govuk-error-summary")).toBeVisible();
    await expect(page.locator(".govuk-error-summary")).toContainText(
      "You must select the main partnership contact before continuing"
    );
  });

  // Continuing with other scenarios in `partnership.feature`
  test("no name on partner details @unhappy_paths_no_name", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(page, "registration-summary-partnership");
    await openWebsite(page, "url", "/partnership/partner-details?edit=partner-name");

    await page
      .locator("#main-content")
      .getByRole("button", { name: /^(add partner|save partner|save and continue|continue)$/i })
      .click();

    await partnership.fillPartnerName(" ");
    await page
      .locator("#main-content")
      .getByRole("button", { name: /^(add partner|save partner|save and continue|continue)$/i })
      .click();

    await expect(
      page.locator(".govuk-error-message")
    ).toContainText("Enter a valid partner name");
  });

  test("Very long name on partner details @unhappy_paths_long_name", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(page, "registration-summary-partnership");
    await openWebsite(page, "url", "/partnership/partner-details?edit=partner-name");

    await page
      .locator("#main-content")
      .getByRole("button", { name: /^(add partner|save partner|save and continue|continue)$/i })
      .click();

    const longName =
      "This is text containing more than 255 characters. This is text containing more than 255 characters. This is text containing more than 255 characters. This is text containing more than 255 characters. This is text containing more than 255 characters. 012345";
    await partnership.fillPartnerName(longName);
    await page
      .locator("#main-content")
      .getByRole("button", { name: /^(add partner|save partner|save and continue|continue)$/i })
      .click();

    await expect(
      page.locator(".govuk-error-message")
    ).toContainText("Enter a valid partner name");
  });
});
