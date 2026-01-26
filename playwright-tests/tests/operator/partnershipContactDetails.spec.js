import { test, expect } from "@playwright/test";
import { PartnershipContactDetails } from "../../page-objects/PartnershipContactDetails.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Partnership Contact Details", () => {
  let partnershipContactDetails;

  test.beforeEach(async ({ page }) => {
    partnershipContactDetails = new PartnershipContactDetails(page);
  });

  test("happy path for Partnership Contact Details without optional field @happy_path_SDB-35", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/new/partnership-contact-details");

    await partnershipContactDetails.clickContinue(); // Initial click as per feature
    await partnershipContactDetails.fillBirthDate("10", "10", "1990");
    await partnershipContactDetails.fillEmail("valid@email.com");
    await partnershipContactDetails.fillPrimaryPhoneNumber("01234567890");
    await partnershipContactDetails.clickContinue();

    await expect(page).not.toHaveURL(/.*partnership-contact-details/);
  });

  test("happy path for Partnership Contact Details with optional field @happy_path_SDB-35_all_fields", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/new/partnership-contact-details");

    await partnershipContactDetails.clickContinue(); // Initial click
    await partnershipContactDetails.fillBirthDate("10", "10", "1990");
    await partnershipContactDetails.fillEmail("valid@email.com");
    await partnershipContactDetails.fillPrimaryPhoneNumber("01234567890");
    await partnershipContactDetails.fillSecondaryPhoneNumber("01234567890");
    await partnershipContactDetails.clickContinue();

    await expect(page).not.toHaveURL(/.*partnership-contact-details/);
  });

  test("invalid email @invalid_email_SDB-35", async ({ page }) => {
    await openWebsite(page, "url", "/new/partnership-contact-details");

    await partnershipContactDetails.clickContinue(); // Initial click
    await partnershipContactDetails.fillBirthDate("10", "10", "1990");
    await partnershipContactDetails.fillEmail("invalidemail");
    await partnershipContactDetails.fillPrimaryPhoneNumber("01234567890");
    await partnershipContactDetails.fillSecondaryPhoneNumber("01234567890");
    await partnershipContactDetails.clickContinue();

    await expect(
      page.locator(partnershipContactDetails.selectors.error)
    ).toContainText("Enter a valid operator email address");
    await expect(
      page.locator(partnershipContactDetails.selectors.emailAddress)
    ).toHaveValue("invalidemail");
  });

  test("invalid phone number @invalid_phone_number_SDB-35", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/new/partnership-contact-details");

    await partnershipContactDetails.clickContinue();
    await partnershipContactDetails.fillBirthDate("10", "10", "1990");
    await partnershipContactDetails.fillEmail("valid@email.com");
    await partnershipContactDetails.fillPrimaryPhoneNumber("invalidnumber");
    await partnershipContactDetails.clickContinue();

    await expect(
      page.locator(partnershipContactDetails.selectors.error)
    ).toContainText("Enter a valid operator phone number");
    await expect(
      page.locator(partnershipContactDetails.selectors.primaryPhoneNumber)
    ).toHaveValue("invalidnumber");
  });

  test("invalid optional phone number @invalid_optional_phone_number_SDB-35", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/new/partnership-contact-details");

    await partnershipContactDetails.clickContinue();
    await partnershipContactDetails.fillBirthDate("10", "10", "1990");
    await partnershipContactDetails.fillEmail("valid@email.com");
    await partnershipContactDetails.fillPrimaryPhoneNumber("01234567890");
    await partnershipContactDetails.fillSecondaryPhoneNumber("invalidnumber");
    await partnershipContactDetails.clickContinue();

    await expect(
      page.locator(partnershipContactDetails.selectors.error)
    ).toContainText("Enter a valid operator phone number");
    await expect(
      page.locator(partnershipContactDetails.selectors.optionalPhoneNumber)
    ).toHaveValue("invalidnumber");
  });

  test("no email address @SDB-113_no_email_address", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/partnership-contact-details");

    await partnershipContactDetails.fillPrimaryPhoneNumber("01234567890");
    await partnershipContactDetails.fillBirthDate("10", "10", "1990");
    await partnershipContactDetails.clickContinue();

    await expect(
      page.locator(partnershipContactDetails.selectors.error)
    ).toContainText("Enter a valid operator email address");
  });

  test("no phone number @SDB-113_no_phone_number", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/partnership-contact-details");

    await partnershipContactDetails.fillEmail("valid@email.com");
    await partnershipContactDetails.fillBirthDate("10", "10", "1990");
    await partnershipContactDetails.clickContinue();

    await expect(
      page.locator(partnershipContactDetails.selectors.error)
    ).toContainText("Enter a valid operator phone number");
  });
});
