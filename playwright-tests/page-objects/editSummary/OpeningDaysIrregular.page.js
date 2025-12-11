import { BasePage } from "../../utils/BasePage.js";

export class OpeningDaysIrregular extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      otherDaysIrregular: "#opening_days_irregular",
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async fillIrregularDays(text) {
    await this.page.locator(this.selectors.otherDaysIrregular).fill(text);
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
