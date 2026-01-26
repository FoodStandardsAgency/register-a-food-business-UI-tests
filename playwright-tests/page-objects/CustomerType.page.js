import { BasePage } from "../utils/BasePage.js";

export class CustomerType extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      supplyOther: "#customer_type_supply_other",
      supplyDirectly: "#customer_type_supply_directly",
      button: "#main-content .govuk-button",
      error: ".govuk-error-message",
    };
  }

  async selectSupplyOther() {
    await this.page.locator(this.selectors.supplyOther).check();
  }

  async selectSupplyDirectly() {
    await this.page.locator(this.selectors.supplyDirectly).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).first().click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
