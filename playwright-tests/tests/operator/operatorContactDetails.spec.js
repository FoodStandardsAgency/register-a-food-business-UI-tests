import { test, expect } from "@playwright/test";
import { OperatorContactDetails } from "../../page-objects/OperatorContactDetails.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Operator Contact Details", () => {
  let operatorContactDetails;

  test.beforeEach(async ({ page }) => {
    operatorContactDetails = new OperatorContactDetails(page);
  });

  test("happy path without optional field @SDB-156_happy_path", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-contact-details");

    await operatorContactDetails.clickContinue(); // Feature has extra click
    await operatorContactDetails.fillEmail("valid@email.com");
    await operatorContactDetails.fillPrimaryPhoneNumber("07788292373");
    await operatorContactDetails.clickContinue();

    await expect(page).not.toHaveURL(/.*operator-contact-details/);
  });

  test("happy path with optional field @SDB-156_happy_path_all_fields", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-contact-details");

    await operatorContactDetails.fillEmail("valid@email.com");
    await operatorContactDetails.fillPrimaryPhoneNumber("07788292373");
    await operatorContactDetails.fillSecondaryPhoneNumber("07788292121");
    await operatorContactDetails.clickContinue();

    await expect(page).not.toHaveURL(/.*operator-contact-details/);
  });

  test("invalid email address @SDB-156_invalid_email", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-contact-details");

    await operatorContactDetails.fillEmail("invalidemail");
    await operatorContactDetails.fillPrimaryPhoneNumber("07788292373");
    await operatorContactDetails.clickContinue();

    await expect(
      page.locator(operatorContactDetails.selectors.error)
    ).toContainText("Enter a valid operator email address");
    await expect(
      page.locator(operatorContactDetails.selectors.emailAddress)
    ).toHaveValue("invalidemail");
    await expect(
      page.locator(operatorContactDetails.selectors.primaryPhoneNumber)
    ).toHaveValue("07788292373");
  });

  test("invalid phone number @SDB-156_invalid_phone_number", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-contact-details");

    await operatorContactDetails.fillPrimaryPhoneNumber("invalidnumber");
    await operatorContactDetails.fillEmail("valid@email.com");
    await operatorContactDetails.clickContinue();

    await expect(
      page.locator(operatorContactDetails.selectors.error)
    ).toContainText("Enter a valid operator phone number");
    await expect(
      page.locator(operatorContactDetails.selectors.emailAddress)
    ).toHaveValue("valid@email.com");
    await expect(
      page.locator(operatorContactDetails.selectors.primaryPhoneNumber)
    ).toHaveValue("invalidnumber");
  });

  // Feature file cut off at "no email address". I'll implement it as per pattern.
  test("no email address @SDB-156_no_email_address", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/operator-contact-details");
    // Pattern suggests filling phone but not email, then expecting error.
    await operatorContactDetails.fillPrimaryPhoneNumber("07788292373");
    await operatorContactDetails.clickContinue();

    await expect(
      page.locator(operatorContactDetails.selectors.error)
    ).toContainText("Enter a valid operator email address");
  });
});
