import { BasePage } from "../../utils/BasePage.js";

export class OpeningDaysStart extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      everyday: "#opening_days_start_everyday",
      someDays: "#opening_days_start_some_days",
      irregularDays: "#opening_days_start_irregular_days",
      button:
        "#main-content button.govuk-button[type='submit'], #main-content .govuk-button",
      error: ".govuk-error-message",
    };
  }

  async selectEveryday() {
    await this.page.locator(this.selectors.everyday).check();
  }

  async selectSomeDays() {
    await this.page.locator(this.selectors.someDays).check();
  }

  async selectIrregularDays() {
    await this.page.locator(this.selectors.irregularDays).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).first().click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
