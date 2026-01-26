import { test, expect } from "@playwright/test";
import { LandingPage } from "../../page-objects/LandingPage.page";
import { EstablishmentAddress } from "../../page-objects/EstablishmentAddress.page";
import { RegistrationRole } from "../../page-objects/RegistrationRole.page";
import { PartnerName } from "../../page-objects/PartnerName.page";
import { Partnership } from "../../page-objects/Partnership.page";
import { MainPartnershipContact } from "../../page-objects/MainPartnershipContact.page";
import { OperatorAddress } from "../../page-objects/OperatorAddress.page";
import { PartnershipContactDetails } from "../../page-objects/PartnershipContactDetails.page";
import { EstablishmentTradingName } from "../../page-objects/EstablishmentTradingName.page";
import { EstablishmentAddressType } from "../../page-objects/EstablishmentAddressType.page";
import { EstablishmentContactDetails } from "../../page-objects/EstablishmentContactDetails.page";
import { EstablishmentOpeningDate } from "../../page-objects/EstablishmentOpeningDate.page";
import { OpeningDaysStart } from "../../page-objects/OpeningDaysStart.page";
import { OpeningDaysSome } from "../../page-objects/OpeningDaysSome.page";
import { OpeningHours } from "../../page-objects/OpeningHours.page";
import { BusinessType } from "../../page-objects/BusinessType.page";
import { BusinessScale } from "../../page-objects/BusinessScale.page";
import { FoodType } from "../../page-objects/FoodType.page";
import { ProcessingActivities } from "../../page-objects/ProcessingActivities.page";
import { BusinessWaterSupply } from "../../page-objects/BusinessWaterSupply.page";
import { BusinessOtherDetails } from "../../page-objects/BusinessOtherDetails.page";
import { RegistrationSummary } from "../../page-objects/RegistrationSummary.page";
import { SubmitRegistration } from "../../page-objects/SubmitRegistration.page";
import { SubmissionPage } from "../../page-objects/SubmissionPage.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("End-to-End Testing Partnership @end_to_end_testing_partnership", () => {
  test("Happy path @happy_path_SDB-111", async ({ page }) => {
    test.setTimeout(120000);
    const landingPage = new LandingPage(page);
    const establishmentAddress = new EstablishmentAddress(page);
    const registrationRole = new RegistrationRole(page);
    const partnerName = new PartnerName(page);
    const partnership = new Partnership(page); // Deals with Partner Details input
    const mainPartnershipContact = new MainPartnershipContact(page);
    const operatorAddress = new OperatorAddress(page);
    const partnershipContactDetails = new PartnershipContactDetails(page);
    const estabTradingName = new EstablishmentTradingName(page);
    const estabAddressType = new EstablishmentAddressType(page);
    const estabContactDetails = new EstablishmentContactDetails(page);
    const estabOpeningDate = new EstablishmentOpeningDate(page);
    const openingDaysStart = new OpeningDaysStart(page);
    const openingDaysSome = new OpeningDaysSome(page);
    const openingHours = new OpeningHours(page);
    const businessType = new BusinessType(page);
    const businessScale = new BusinessScale(page);
    const foodType = new FoodType(page);
    const processingActivities = new ProcessingActivities(page);
    const businessWaterSupply = new BusinessWaterSupply(page);
    const businessOtherDetails = new BusinessOtherDetails(page);
    const registrationSummary = new RegistrationSummary(page);
    const submitRegistration = new SubmitRegistration(page);
    const submissionPage = new SubmissionPage(page);

    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "index");
    await landingPage.clickStartNow();

    // Est Address
    await establishmentAddress.fillPostcode("BS24 9ST");
    await establishmentAddress.clickFindAddress();
    await establishmentAddress.selectAddressFromDropdown("BS24 9ST"); // or select first
    await establishmentAddress.clickContinue();

    // LA established page
    await expect(page).toHaveURL(/.*la-established/);
    await establishmentAddress.clickContinue();
    await expect(page).toHaveURL(/.*registration-role/);

    // Role: Partnership
    await registrationRole.selectPartnership();
    await registrationRole.clickContinue();

    // Add 5 partners
    const partners = ["partner one", "partner two", "partner three", "partner four", "partner five"];
    
    // First partner (Assuming flow starts with adding one or list is empty?)
    // Flow check: "When I click on the element partnerName.addPartnerButton" -> "Details"
    // Usually the list page is shown first? Or maybe directly details if 0 partners?
    // Feature says: "When I click on the element 'partnerName.addPartnerButton'"
    // This implies we correspond to the 'partner-name' page.
    // Let's assume we are on 'partner-name' page initially?
    // Or maybe the loop handles it.
    
    for (const partner of partners) {
      await partnerName.clickAddPartner();
      await partnership.fillPartnerName(partner);
      // partnership page (PartnerDetails) has a continue button?
      // My Partnership.page.js has no clickContinue, inherited from BasePage.
      // BasePage uses .govuk-button. This should work.
      await page
        .locator("#main-content button.govuk-button[type='submit'], #main-content .govuk-button[type='submit']")
        .first()
        .click();
    }

    // Continue from Partner Name list
    await partnerName.clickContinue();

    // Main Partnership Contact
    await mainPartnershipContact.selectPartnerTwo();
    await mainPartnershipContact.clickContinue();

    // Operator Address (Use Est Address)
    await operatorAddress.fillPostcode("BS24 9ST");
    await operatorAddress.clickFindAddress();
    await operatorAddress.selectAddressFromDropdown("BS24 9ST");
    await operatorAddress.clickContinue();

    // Partnership Contact Details
    await partnershipContactDetails.fillBirthDate("10", "10", "1990");
    await partnershipContactDetails.fillEmail("sophie.vale-morris@gmail.com");
    await partnershipContactDetails.fillPrimaryPhoneNumber("02749 482642");
    await partnershipContactDetails.fillSecondaryPhoneNumber("07937 485112");
    await partnershipContactDetails.clickContinue();

    // Trading Name
    await estabTradingName.fillTradingName("Old Lyme Cafe");
    await estabTradingName.clickContinue();

    // Est Address Type
    await estabAddressType.selectBusinessCommercial();
    await estabAddressType.clickContinue();

    // Est Contact Details (Reuse)
    await estabContactDetails.clickReuseButton(); // Reuses partner contact
    await estabContactDetails.fillPrimaryPhoneNumber("023 475 2455"); // Update primary
    await estabContactDetails.clickContinue();

    // Est Opening Date
    await estabOpeningDate.selectAlreadyTrading();
    await estabOpeningDate.clickContinue(); // Reveals date fields?
    // Feature: "When I click on the element 'estabOpeningDate.alreadyTrading' And I click ... button ... Then I expect url ... retroactive"
    // So yes, select -> continue -> fill date.
    await estabOpeningDate.fillDate("08", "12", "2017");
    await estabOpeningDate.clickContinue();

    // Opening Days
    await openingDaysStart.chooseSomeDays();
    await openingDaysStart.clickContinue();

    await openingDaysSome.checkMonday();
    await openingDaysSome.checkTuesday();
    await openingDaysSome.checkThursday();
    await openingDaysSome.clickContinue();

    // Opening Hours
    await openingHours.fillDayHours("monday", "09:00 to 20:00");
    await openingHours.fillDayHours("tuesday", "09:00 to 15:00");
    await openingHours.fillDayHours("thursday", "09:00 to 13:00");
    await openingHours.clickContinue();

    // Business Type
    await businessType.searchBusinessType("Cafe");
    await businessType.selectFirstOption(); // Feature: option1
    await businessType.clickContinue();

    // Business Scale
    await businessScale.checkLocal();
    await businessScale.clickContinue();

    // Food Type
    await foodType.checkRawMeat();
    await foodType.clickContinue();

    // Processing Activities
    await processingActivities.checkVacuumPacking();
    await processingActivities.clickContinue();

    // Water Supply
    await businessWaterSupply.checkPublicAndPrivate();
    await businessWaterSupply.clickContinue();

    // Other Details
    await businessOtherDetails.fillOtherDetails("I occasionally bake cakes for parties and deliver them to the customer in my car.");
    await businessOtherDetails.clickContinue();

    // Summary
    await registrationSummary.clickContinue();

    // Declaration
    await submitRegistration.checkFirstCheckbox();
    await submitRegistration.checkSecondCheckbox();
    await submitRegistration.checkThirdCheckbox();
    await submitRegistration.clickSubmit();

    // Confirmation
    await expect(page).toHaveURL(/summary-confirmation/);
    await expect(page.locator("h1")).toContainText("Submission complete");
  });
});
