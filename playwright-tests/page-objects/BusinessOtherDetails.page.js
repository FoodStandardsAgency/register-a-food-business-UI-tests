import { BasePage } from "../utils/BasePage.js";

export class BusinessOtherDetails extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      webAddress: '[name="establishment_web_address"]',
      otherDetails: '[name="business_other_details"]',
      button: "#main-content .govuk-button",
      error: ".govuk-error-message",
    };
  }

  async fillWebAddress(url) {
    await this.page.locator(this.selectors.webAddress).fill(url);
  }

  async fillOtherDetails(details) {
    // Only if selector exists/visible, but fill handles waiting
    await this.page.locator(this.selectors.otherDetails).fill(details);
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
