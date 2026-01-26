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
    const legacyRadio = this.page.locator(selector);
    if (await legacyRadio.isVisible({ timeout: 1000 })) {
      await legacyRadio.check();
      return;
    }

    await this.page.locator("#main-content").getByRole("radio").nth(index).check();
  }

  async selectPartnerThree() {
    await this.selectPartner(2);
  }

  async clickContinue() {
    await this.page
      .locator("#main-content")
      .getByRole("button", { name: /^(save and continue|continue)$/i })
      .click();
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
