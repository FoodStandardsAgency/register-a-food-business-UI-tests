import { BasePage } from "../utils/BasePage.js";

export class BusinessWaterSupply extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      publicCheckbox: "#PUBLIC",
      privateCheckbox: "#PRIVATE",
      boreholeCheckbox: "#BOREHOLE",
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async checkPublic() {
    await this.page.locator(this.selectors.publicCheckbox).check();
  }

  async checkPrivate() {
    await this.page.locator(this.selectors.privateCheckbox).check();
  }

  async checkBorehole() {
    await this.page.locator(this.selectors.boreholeCheckbox).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
