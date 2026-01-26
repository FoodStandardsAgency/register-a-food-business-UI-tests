import { BasePage } from "../utils/BasePage.js";

export class BusinessWaterSupply extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      publicCheckbox: "#water_supply_public",
      privateCheckbox: "#water_supply_private",
      publicAndPrivate: "#water_supply_both",
      button: "#main-content .govuk-button",
      error: ".govuk-error-message",
    };
  }

  async choosePublic() {
    await this.checkPublic();
  }

  async checkPublic() {
    await this.page.locator(this.selectors.publicCheckbox).check();
  }

  async checkPrivate() {
    await this.page.locator(this.selectors.privateCheckbox).check();
  }

  async checkPublicAndPrivate() {
    // robustly selecting by label
    await this.page.locator(this.selectors.publicAndPrivate).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }
}
