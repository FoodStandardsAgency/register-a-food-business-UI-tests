import { BasePage } from "../utils/BasePage.js";

export class SubmissionPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      foodSafetyLink: "#foodSafetyLink",
      safetyManagementLink: "#safetyManagementLink",
      safeCateringLink: "#safeCateringLink",
      fhrsScoreLink: "#fhrsScoreLink",
      foodLabellingLink: "#foodLabellingLink",
      businessGuidanceLink: "#businessGuidanceLink",
      businessSupportHelplineEnglishLink: "#businessSupportHelplineEnglishLink",
      establishmentAddress: "#establishmentAddressRow",
      establishmentDetailsTable: "#establishment-details",
      operatorDetailsTable: "#operator-details",
      foodActivitiesTable: "#activity-details",
      declarationTable: "#declaration-details",
      button: "#continue-button",
      error: "#errorSummary",
    };
  }

  async clickFoodSafetyLink() {
    await this.page.locator(this.selectors.foodSafetyLink).click();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async isEstablishmentDetailsVisible() {
    return await this.page
      .locator(this.selectors.establishmentDetailsTable)
      .isVisible();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
