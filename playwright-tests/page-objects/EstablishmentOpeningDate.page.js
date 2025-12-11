import { BasePage } from "../utils/BasePage.js";

export class EstablishmentOpeningDate extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      alreadyTrading: "#establishment_opening_status_already_trading",
      notTrading: "#establishment_opening_status_not_trading",
      day: '[name="day"]',
      month: '[name="month"]',
      year: '[name="year"]',
      error: ".govuk-error-message",
      button: "form .govuk-button",
    };
  }

  async selectAlreadyTrading() {
    await this.page.locator(this.selectors.alreadyTrading).check();
  }

  async selectNotTrading() {
    await this.page.locator(this.selectors.notTrading).check();
  }

  async fillDate(day, month, year) {
    await this.page.locator(this.selectors.day).fill(day);
    await this.page.locator(this.selectors.month).fill(month);
    await this.page.locator(this.selectors.year).fill(year);
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
