import { BasePage } from "../../utils/BasePage.js";

export class PartnerName extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      addPartnerButton: "#addPartnerButton",
      partnerOne: "#partner0",
      partnerTwo: "#partner1",
      partnerOneRowChange: "#partner0RowChange",
      deleteButton0: "#deletePartnerButton0",
      deleteButton1: "#deletePartnerButton1",
      deleteButton2: "#deletePartnerButton2",
      deleteButton3: "#deletePartnerButton3",
      button: ".continue",
      error: ".govuk-error-message",
    };
  }

  async clickAddPartner() {
    await this.page.locator(this.selectors.addPartnerButton).click();
  }

  async getPartnerOne() {
    return await this.page.locator(this.selectors.partnerOne).textContent();
  }

  async clickDeletePartner(index = 0) {
    const selector = `#deletePartnerButton${index}`;
    await this.page.locator(selector).click();
  }

  async clickChangePartnerOne() {
    await this.page.locator(this.selectors.partnerOneRowChange).click();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
