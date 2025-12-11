import { BasePage } from "../utils/BasePage.js";

export class SummaryConfirmation extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      fsaRn: "#fsa-rn",
      fsaRnUnresponsive: "#fsa-rn-unresponsive",
      button: "#continue-button",
      error: "#errorSummary",
      hygieneAndStandardsCouncil: "#hygieneAndStandardsCouncil",
      hygieneCouncil: "#hygieneCouncil",
      standardsCouncil: "#standardsCouncil",
    };
  }

  async getFSARN() {
    return await this.page.locator(this.selectors.fsaRn).textContent();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }

  async getHygieneCouncil() {
    return await this.page.locator(this.selectors.hygieneCouncil).textContent();
  }
}
