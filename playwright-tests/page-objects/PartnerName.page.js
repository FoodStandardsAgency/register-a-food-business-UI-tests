import { BasePage } from "../utils/BasePage.js";

export class PartnerName extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      addPartnerButton: "#addPartnerButton",
      partnerOne: "#partner0",
      partnerTwo: "#partner1",
      partnerThree: "#partner2",
      partnerFour: "#partner3",
      partnerFive: "#partner4",
      button: "#main-content .govuk-button", // Updated to Specific selector
      error: ".govuk-error-message",
    };
  }

  async clickAddPartner() {
    await this.page.locator(this.selectors.addPartnerButton).click();
  }

  async clickContinue() {
    await this.page
      .locator("#main-content")
      .getByRole("button", { name: /^continue$/i })
      .click();
  }
}
