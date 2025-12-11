import { BasePage } from "../utils/BasePage.js";

export class Partnership extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      partner_name: '[name="partner_name"]',
      error: ".govuk-error-message",
    };
  }

  async fillPartnerName(name) {
    await this.page.locator(this.selectors.partner_name).fill(name);
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
