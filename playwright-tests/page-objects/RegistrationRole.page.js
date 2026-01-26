import { BasePage } from "../utils/BasePage.js";

export class RegistrationRole extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      soleTrader: "#registration_role_sole_trader",
      partnership: "#registration_role_partnership",
      representative: "#registration_role_representative",
      button: "#main-content .govuk-button",
      error: ".govuk-error-message",
    };
  }

  async selectSoleTrader() {
    await this.page.locator(this.selectors.soleTrader).check();
  }

  async selectPartnership() {
    await this.page.locator(this.selectors.partnership).check();
  }

  async selectRepresentative() {
    await this.page.locator(this.selectors.representative).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
