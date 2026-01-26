import { BasePage } from "../utils/BasePage.js";

export class MainPartnershipContact extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      partnerOne: "#partner-0",
      partnerTwo: "#partner-1",
      partnerThree: "#partner-2",
      partnerFour: "#partner-3",
      partnerFive: "#partner-4",
      button: "#main-content .govuk-button",
      error: ".govuk-error-message",
    };
  }

  async selectPartnerOne() {
    await this.page.locator(this.selectors.partnerOne).check();
  }

  async selectPartnerTwo() {
    await this.page.locator(this.selectors.partnerTwo).check();
  }

  async selectPartnerThree() {
    await this.page.locator(this.selectors.partnerThree).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }
}
