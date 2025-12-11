import { BasePage } from "../utils/BasePage.js";

export class CharityDetails extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      charityName: '[name="operator_charity_name"]',
      charityNumber: '[name="operator_charity_number"]',
      questionsCharityReference: "#hiddenTextCharityNumbers > summary > span",
      link: "#link-charity-commission",
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async fillCharityName(name) {
    await this.page.locator(this.selectors.charityName).fill(name);
  }

  async fillCharityNumber(number) {
    await this.page.locator(this.selectors.charityNumber).fill(number);
  }

  async clickCharityCommissionLink() {
    await this.page.locator(this.selectors.link).click();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
