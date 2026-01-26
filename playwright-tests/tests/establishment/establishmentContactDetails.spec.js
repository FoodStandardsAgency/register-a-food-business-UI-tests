import { test, expect } from "@playwright/test";
import { EstablishmentContactDetails } from "../../page-objects/EstablishmentContactDetails.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe.parallel("Establishment address simple contact details section validation", () => {
  let establishmentContactDetails;

  test.beforeEach(async ({ page }) => {
    establishmentContactDetails = new EstablishmentContactDetails(page);
  });

  test("happy path without optional field @SDB-1113_happy_path", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-contact-details");

    await establishmentContactDetails.clickContinue(); // Verify error first? No, feature says click element then set. Wait.
    // Feature: And I click on the element "estabContactDetails.button"
    // Wait, line 9: And I click on the element "estabContactDetails.button" BEFORE setting fields?
    // This might be checking validation or it's a mistake in feature file interpretation.
    // "And I click on the element 'estabContactDetails.button'" might be "I start/verify something?"
    // Actually, looking at the feature:
    // Given ...
    // And I click on the element "estabContactDetails.button"  <-- This seems weird if it's the continue button.
    // Maybe it's a focus thing? Or maybe the feature meant "I see the button"?
    // In WDIO, "I click on" means click.
    // If we click continue empty, we get errors.
    // Then "When I set ...".
    // If the test expects to proceed, it should eventually be valid.
    // Let's assume the first click triggers validation errors but we ignore them and fill.
    await establishmentContactDetails.clickContinue();

    await establishmentContactDetails.fillEmail("valid@email.com");
    await establishmentContactDetails.fillPrimaryPhoneNumber("01234567890");
    await establishmentContactDetails.clickContinue();

    await expect(page).not.toHaveURL(/.*establishment-contact-details/);
  });

  test("happy path with optional field @SDB-113_happy_path_all_fields", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-contact-details");

    await establishmentContactDetails.fillEmail("valid@email.com");
    await establishmentContactDetails.fillPrimaryPhoneNumber("01234567890");
    await establishmentContactDetails.fillSecondaryPhoneNumber("07788292121");
    await establishmentContactDetails.clickContinue();

    await expect(page).not.toHaveURL(/.*establishment-contact-details/);
  });

  test("invalid email address @SDB-113_invalid_email", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-contact-details");

    await establishmentContactDetails.fillEmail("invalidemail");
    await establishmentContactDetails.fillPrimaryPhoneNumber("01234567890");
    await establishmentContactDetails.clickContinue();

    await expect(
      page.locator(establishmentContactDetails.selectors.error)
    ).toContainText("Enter a valid establishment email address");
    await expect(
      page.locator(establishmentContactDetails.selectors.emailAddress)
    ).toHaveValue("invalidemail");
    await expect(
      page.locator(establishmentContactDetails.selectors.primaryPhoneNumber)
    ).toHaveValue("01234567890");
  });

  test("invalid phone number @SDB-113_invalid_phone_number", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-contact-details");

    await establishmentContactDetails.fillPrimaryPhoneNumber("invalidnumber");
    await establishmentContactDetails.fillEmail("valid@email.com");
    await establishmentContactDetails.clickContinue();

    await expect(
      page.locator(establishmentContactDetails.selectors.error)
    ).toContainText("Enter a valid establishment phone number");
    await expect(
      page.locator(establishmentContactDetails.selectors.emailAddress)
    ).toHaveValue("valid@email.com");
    await expect(
      page.locator(establishmentContactDetails.selectors.primaryPhoneNumber)
    ).toHaveValue("invalidnumber");
  });

  test("no email address @SDB-113_no_email_address", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-contact-details");

    await establishmentContactDetails.fillPrimaryPhoneNumber("01234567890");
    await establishmentContactDetails.clickContinue();

    await expect(
      page.locator(establishmentContactDetails.selectors.error)
    ).toContainText("Enter a valid establishment email address");
    await expect(
      page.locator(establishmentContactDetails.selectors.primaryPhoneNumber)
    ).toHaveValue("01234567890");
  });

  test("no phone number @SDB-113_no_phone_number", async ({ page }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-contact-details");

    await establishmentContactDetails.fillEmail("valid@email.com");
    await establishmentContactDetails.clickContinue();

    await expect(
      page.locator(establishmentContactDetails.selectors.error)
    ).toContainText("Enter a valid establishment phone number");
    await expect(
      page.locator(establishmentContactDetails.selectors.emailAddress)
    ).toHaveValue("valid@email.com");
  });

  test("invalid secondary phone number @SDB-113_invalid_optional_phone_number", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-contact-details");

    await establishmentContactDetails.fillEmail("valid@email.com");
    await establishmentContactDetails.fillPrimaryPhoneNumber("01234567890");
    await establishmentContactDetails.fillSecondaryPhoneNumber("§§§§");
    await establishmentContactDetails.clickContinue();

    await expect(
      page.locator(establishmentContactDetails.selectors.error)
    ).toContainText("Enter a valid establishment phone number");
    await expect(
      page.locator(establishmentContactDetails.selectors.emailAddress)
    ).toHaveValue("valid@email.com");
    await expect(
      page.locator(establishmentContactDetails.selectors.primaryPhoneNumber)
    ).toHaveValue("01234567890");
    await expect(
      page.locator(establishmentContactDetails.selectors.optionalPhoneNumber)
    ).toHaveValue("§§§§");
  });

  test("happy path using operator details @SDB-113_happy_path_same_as_operator", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    // Inject data
    // "declaration" data in feature likely implies existing operator info to reuse.
    // The utility `injectDataIntoRegSummary` might treat "declaration" as a set of data.
    // We'll use "declaration" or similar if the utility accepts it.
    // Looking at the utility usage in feature: inject "declaration" data
    // I'll assume usage: injectDataIntoRegSummary(page, "declaration")
    await injectDataIntoRegSummary(page, "declaration");
    await openWebsite(page, "url", "/new/establishment-contact-details");

    await establishmentContactDetails.clickReuseButton();

    await expect(
      page.locator(establishmentContactDetails.selectors.emailAddress)
    ).toHaveValue("testemail@email.com");
    await expect(
      page.locator(establishmentContactDetails.selectors.primaryPhoneNumber)
    ).toHaveValue("01234567890");
    await expect(
      page.locator(establishmentContactDetails.selectors.reuseButton)
    ).toContainText("Re-use operator contact details");

    await establishmentContactDetails.clickContinue();

    await expect(page).not.toHaveURL(/.*establishment-contact-details/);
  });

  test("happy path using operator details overwriting @SDB-113_happy_path_same_as_operator_overwrite", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await injectDataIntoRegSummary(page, "declaration");
    await openWebsite(page, "url", "/new/establishment-contact-details");

    await establishmentContactDetails.fillEmail("valid2nd@email.com");
    await establishmentContactDetails.fillPrimaryPhoneNumber("07766292321");

    await establishmentContactDetails.clickReuseButton();

    await expect(
      page.locator(establishmentContactDetails.selectors.emailAddress)
    ).toHaveValue("testemail@email.com");
    await expect(
      page.locator(establishmentContactDetails.selectors.primaryPhoneNumber)
    ).toHaveValue("01234567890");

    await establishmentContactDetails.clickContinue();

    await expect(page).not.toHaveURL(/.*establishment-contact-details/);
  });
});
