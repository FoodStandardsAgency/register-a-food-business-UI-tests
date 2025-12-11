import { BasePage } from "../../utils/BasePage.js";

export class MainPartnershipContact extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      partnerOne: "#partner-0",
      partnerTwo: "#partner-1",
      partnerThree: "#partner-2",
      partnerFour: "#partner-3",
      partnerFive: "#partner-4",
      operatorAddressHeader: "#operator-address-header",
      error: ".govuk-error-message",
    };
  }

  async selectPartner(index = 0) {
    const selector = `#partner-${index}`;
    await this.page.locator(selector).check();
  }

  async getOperatorAddressHeader() {
    return await this.page
      .locator(this.selectors.operatorAddressHeader)
      .textContent();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
