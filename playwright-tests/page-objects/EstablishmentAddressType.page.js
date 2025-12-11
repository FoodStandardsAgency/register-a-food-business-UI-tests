import { BasePage } from "../utils/BasePage.js";

export class EstablishmentAddressType extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      businessCommercial: "#establishment_type_business_commercial",
      mobileMoveable: "#establishment_type_mobile_moveable",
      homeDomestic: "#establishment_type_home_domestic",
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async selectBusinessCommercial() {
    await this.page.locator(this.selectors.businessCommercial).check();
  }

  async selectMobileMoveable() {
    await this.page.locator(this.selectors.mobileMoveable).check();
  }

  async selectHomeDomestic() {
    await this.page.locator(this.selectors.homeDomestic).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
