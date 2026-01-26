import { test, expect } from "@playwright/test";
import { RepresentativeOperatorContactDetails } from "../../page-objects/RepresentativeOperatorContactDetails.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Representative operator contact details", () => {
  let repOpContactDetails;

  test.beforeEach(async ({ page }) => {
    repOpContactDetails = new RepresentativeOperatorContactDetails(page);
  });

  test("happy path without optional field @SDB-241_happy_path", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/contact-representative");

    await repOpContactDetails.clickContinue(); // Validation trigger or initial click
    await repOpContactDetails.fillContactName("Test McTestface");
    await repOpContactDetails.fillPhoneNumber("07788292373");
    await repOpContactDetails.fillEmail("representative@email.com");
    await repOpContactDetails.clickContinue();

    await expect(page).not.toHaveURL(/.*contact-representative/);
  });

  test("happy path with optional field @SDB-241_happy_path_all_fields", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/contact-representative");

    await repOpContactDetails.fillContactName("Test McTestface");
    await repOpContactDetails.fillPhoneNumber("07788292373");
    await repOpContactDetails.fillRole("Tester");
    await repOpContactDetails.fillEmail("representative@email.com");
    await repOpContactDetails.clickContinue();

    await expect(page).not.toHaveURL(/.*contact-representative/);
  });

  test("invalid email address @SDB-241_invalid_email", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/contact-representative");

    await repOpContactDetails.fillContactName("Test McTestface");
    await repOpContactDetails.fillPhoneNumber("07788292373");
    await repOpContactDetails.fillEmail("±±±§§§§");
    await repOpContactDetails.clickContinue();

    await expect(
      page.locator(repOpContactDetails.selectors.error)
    ).toContainText("Enter a valid representative email address");
    await expect(
      page.locator(repOpContactDetails.selectors.emailAddress)
    ).toHaveValue("±±±§§§§");
    await expect(
      page.locator(repOpContactDetails.selectors.primaryPhoneNumber)
    ).toHaveValue("07788292373");
    await expect(
      page.locator(repOpContactDetails.selectors.contactName)
    ).toHaveValue("Test McTestface");
  });

  test("invalid phone number @SDB-241_invalid_phone_number", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/contact-representative");

    await repOpContactDetails.fillContactName("Test McTestface");
    await repOpContactDetails.fillPhoneNumber("§§§±±");
    await repOpContactDetails.fillEmail("representative@email.com");
    await repOpContactDetails.clickContinue();

    await expect(
      page.locator(repOpContactDetails.selectors.error)
    ).toContainText("Enter a valid representative phone number");
    await expect(
      page.locator(repOpContactDetails.selectors.contactName)
    ).toHaveValue("Test McTestface");
    await expect(
      page.locator(repOpContactDetails.selectors.primaryPhoneNumber)
    ).toHaveValue("§§§±±");
    await expect(
      page.locator(repOpContactDetails.selectors.emailAddress)
    ).toHaveValue("representative@email.com");
  });

  test("no email address @SDB-241_no_email_address", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/contact-representative");

    await repOpContactDetails.fillContactName("Test McTestface");
    await repOpContactDetails.fillPhoneNumber("07788292373");
    await repOpContactDetails.clickContinue();

    await expect(
      page.locator(repOpContactDetails.selectors.error)
    ).toContainText("Enter a valid representative email address");
    await expect(
      page.locator(repOpContactDetails.selectors.primaryPhoneNumber)
    ).toHaveValue("07788292373");
    await expect(
      page.locator(repOpContactDetails.selectors.contactName)
    ).toHaveValue("Test McTestface");
  });

  test("no phone number @SDB-241_no_phone_number", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/contact-representative");

    await repOpContactDetails.fillContactName("Test McTestface");
    await repOpContactDetails.fillEmail("representative@email.com");
    await repOpContactDetails.clickContinue();

    await expect(
      page.locator(repOpContactDetails.selectors.error)
    ).toContainText("Enter a valid representative phone number");
    await expect(
      page.locator(repOpContactDetails.selectors.contactName)
    ).toHaveValue("Test McTestface");
    await expect(
      page.locator(repOpContactDetails.selectors.emailAddress)
    ).toHaveValue("representative@email.com");
  });
});
