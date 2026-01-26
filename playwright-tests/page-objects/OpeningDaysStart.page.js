import { BasePage } from "../utils/BasePage.js";

export class OpeningDaysStart extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      everyday: "#opening_days_start_everyday",
      someDays: "#opening_days_start_some_days",
      irregularDays: "#opening_days_start_irregular_days",
      button: "#main-content .govuk-button",
      error: ".govuk-error-message",
    };
  }

  async chooseEveryDay() {
    await this.page.locator(this.selectors.everyday).check();
  }

  async chooseSomeDays() {
    await this.page.locator(this.selectors.someDays).check();
  }

  async chooseIrregularDays() {
    await this.page.locator(this.selectors.irregularDays).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }
}
