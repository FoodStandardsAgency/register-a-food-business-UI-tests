import { BasePage } from "../utils/BasePage.js";

export class EstablishmentContactDetails extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      primaryPhoneNumber: '[name="establishment_primary_number"]',
      optionalPhoneNumber: '[name="establishment_secondary_number"]',
      emailAddress: '[name="establishment_email"]',
      button: ".govuk-button",
      reuseButton:
        "#main-content > div > div > form > fieldset > div.govuk-inset-text > button",
      continueButton: "#main-content > div > div > form > button",
      error: ".govuk-error-message",
    };
  }

  async fillPrimaryPhoneNumber(phone) {
    await this.page.locator(this.selectors.primaryPhoneNumber).fill(phone);
  }

  async fillSecondaryPhoneNumber(phone) {
    await this.page.locator(this.selectors.optionalPhoneNumber).fill(phone);
  }

  async fillEmail(email) {
    await this.page.locator(this.selectors.emailAddress).fill(email);
  }

  async clickReuseButton() {
    await this.page.locator(this.selectors.reuseButton).click();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.continueButton).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
