import { test, expect } from "@playwright/test";
import { LandingPage } from "../../page-objects/LandingPage.page";
import { EstablishmentAddress } from "../../page-objects/EstablishmentAddress.page";
import { RegistrationRole } from "../../page-objects/RegistrationRole.page";
import { OperatorType } from "../../page-objects/OperatorType.page";
import { LimitedCompanyDetails } from "../../page-objects/LimitedCompanyDetails.page";
import { OperatorAddress } from "../../page-objects/OperatorAddress.page";
import { RepresentativeOperatorContactDetails } from "../../page-objects/RepresentativeOperatorContactDetails.page";
import { EstablishmentTradingName } from "../../page-objects/EstablishmentTradingName.page";
import { EstablishmentAddressType } from "../../page-objects/EstablishmentAddressType.page";
import { EstablishmentContactDetails } from "../../page-objects/EstablishmentContactDetails.page";
import { EstablishmentOpeningDate } from "../../page-objects/EstablishmentOpeningDate.page";
import { OpeningDaysStart } from "../../page-objects/OpeningDaysStart.page";
import { OpeningDaysIrregular } from "../../page-objects/OpeningDaysIrregular.page";
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

test.describe.parallel("End-to-End Testing Jamie @end_to_end_testing_Jamie_SDB-735", () => {
  test("happy path @happy_path_", async ({ page }) => {
    test.setTimeout(120000);
    const landingPage = new LandingPage(page);
    const establishmentAddress = new EstablishmentAddress(page);
    const registrationRole = new RegistrationRole(page);
    const operatorType = new OperatorType(page);
    const limitedCompanyDetails = new LimitedCompanyDetails(page);
    const operatorAddress = new OperatorAddress(page);
    const repOpContactDetails = new RepresentativeOperatorContactDetails(page);
    const estabTradingName = new EstablishmentTradingName(page);
    const estabAddressType = new EstablishmentAddressType(page);
    const estabContactDetails = new EstablishmentContactDetails(page);
    const estabOpeningDate = new EstablishmentOpeningDate(page);
    const openingDaysStart = new OpeningDaysStart(page);
    const openingDaysIrregular = new OpeningDaysIrregular(page);
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

    // Establishment Address
    await establishmentAddress.fillPostcode("PE12 8JA");
    await establishmentAddress.clickFindAddress();
    await establishmentAddress.selectAddressFromDropdown("PE12 8JA"); 
    await establishmentAddress.clickContinue();

    // LA established page
    await expect(page).toHaveURL(/.*la-established/);
    await establishmentAddress.clickContinue();
    await expect(page).toHaveURL(/.*registration-role/);

    // Registration Role
    await registrationRole.selectRepresentative();
    await registrationRole.clickContinue();

    // Operator Type
    await operatorType.selectLimitedCompany();
    await operatorType.clickContinue();

    // Limited Company Details
    await limitedCompanyDetails.fillCompanyName("The Busy Bean Ltd");
    await limitedCompanyDetails.fillCompaniesHouseNumber("10303702");
    await limitedCompanyDetails.clickContinue();

    // Operator Address
    await operatorAddress.fillPostcode("PE12 8JA");
    await operatorAddress.clickFindAddress();
    await operatorAddress.selectAddressFromDropdown("PE12 8JA");
    await operatorAddress.clickContinue();

    // Representative Operator Contact Details
    await repOpContactDetails.fillContactName("Jamie Henderson");
    await repOpContactDetails.fillRole("Director & Manager");
    await repOpContactDetails.fillPhoneNumber("0207685746");
    await repOpContactDetails.fillEmail("taf.nordgren@gmail.com");
    await repOpContactDetails.clickContinue();

    // Establishment Trading Name
    await estabTradingName.fillTradingName("The Busy Bean Cornerhouse");
    await estabTradingName.clickContinue();

    // Establishment Address Type
    await estabAddressType.selectBusinessCommercial();
    await estabAddressType.clickContinue();

    // Establishment Contact Details
    await estabContactDetails.fillPrimaryPhoneNumber("0207685746");
    await estabContactDetails.fillOptionalPhoneNumber("07500867690");
    await estabContactDetails.fillEmail("taf.nordgren@gmail.com");
    await estabContactDetails.clickContinue();

    // Establishment Opening Date
    await estabOpeningDate.selectAlreadyTrading();
    await estabOpeningDate.clickContinue();
    await estabOpeningDate.fillDate("20", "08", "2018");
    await estabOpeningDate.clickContinue();

    // Opening Days
    await openingDaysStart.chooseIrregularDays();
    await openingDaysStart.clickContinue();
    
    await openingDaysIrregular.fillOtherDaysIrregular("Christmas Period");
    await openingDaysIrregular.clickContinue();

    // Business Type
    await businessType.searchBusinessType("Coffee");
    await businessType.selectSecondOption();
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

    // Business Water Supply
    await businessWaterSupply.checkPrivate();
    await businessWaterSupply.clickContinue();

    // Business Other Details
    await businessOtherDetails.clickContinue();

    // Registration Summary
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
