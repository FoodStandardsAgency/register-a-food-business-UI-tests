import { BasePage } from "../utils/BasePage.js";

export class BusinessType extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      search: 'input[name="business_type"]',
      autocomplete: ".autocomplete__wrapper",
      option1: "#my-autocomplete__option--0",
      option2: "#my-autocomplete__option--1",
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async searchBusinessType(text) {
    await this.page.locator(this.selectors.search).fill(text);
  }

  async selectFirstOption() {
    await this.page.locator(this.selectors.option1).click();
  }

  async selectSecondOption() {
    await this.page.locator(this.selectors.option2).click();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
