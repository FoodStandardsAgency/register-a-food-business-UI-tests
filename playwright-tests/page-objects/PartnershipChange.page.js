import { BasePage } from "../utils/BasePage.js";

export class PartnershipChange extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      addPartnerButton: "#addPartnerButton",
      partnersTable: "table[aria-label=\"Partners\"]",
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

  async clickChangePartner(partnerName) {
    const table = this.page.getByRole("table", { name: /partners/i });
    const row = table.getByRole("row", { name: new RegExp(partnerName, "i") });
    await row.getByRole("link", { name: /change partner name/i }).click();
  }

  async deletePartner(index) {
    const deleteSelector = this.selectors[`deleteButton${index}`];
    if (deleteSelector) {
      await this.page.locator(deleteSelector).click();
    }
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
