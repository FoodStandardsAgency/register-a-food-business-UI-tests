import { BasePage } from "../utils/BasePage.js";

export class OperatorContactDetails extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      primaryPhoneNumber: '[name="operator_primary_number"]',
      optionalPhoneNumber: '[name="operator_secondary_number"]',
      emailAddress: '[name="operator_email"]',
      button: ".govuk-button",
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

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
