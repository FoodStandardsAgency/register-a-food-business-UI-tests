import { BasePage } from "../utils/BasePage.js";

export class SubmitRegistration extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      firstCheckbox: '[name="declaration1"]',
      secondCheckbox: '[name="declaration2"]',
      thirdCheckbox: '[name="declaration3"]',
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async checkFirstDeclaration() {
    await this.page.locator(this.selectors.firstCheckbox).check();
  }

  async checkSecondDeclaration() {
    await this.page.locator(this.selectors.secondCheckbox).check();
  }

  async checkThirdDeclaration() {
    await this.page.locator(this.selectors.thirdCheckbox).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
