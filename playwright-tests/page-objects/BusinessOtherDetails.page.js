import { BasePage } from "../utils/BasePage.js";

export class BusinessOtherDetails extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      webAddress: '[name="establishment_web_address"]',
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async fillWebAddress(url) {
    await this.page.locator(this.selectors.webAddress).fill(url);
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
