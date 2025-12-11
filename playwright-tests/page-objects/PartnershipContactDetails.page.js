import { BasePage } from "../utils/BasePage.js";

export class PartnershipContactDetails extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      error: ".govuk-error-message",
      day: "#operator_birthdate_day",
      month: "#operator_birthdate_month",
      year: "#operator_birthdate_year",
      primaryPhoneNumber: '[name="main_partner_primary_number"]',
      optionalPhoneNumber: '[name="main_partner_secondary_number"]',
      emailAddress: '[name="main_partner_email"]',
      continueButton: "#main-content > div > div > form > button",
      button: ".govuk-button",
    };
  }

  async fillBirthDate(day, month, year) {
    await this.page.locator(this.selectors.day).fill(day);
    await this.page.locator(this.selectors.month).fill(month);
    await this.page.locator(this.selectors.year).fill(year);
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
    await this.page.locator(this.selectors.continueButton).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
