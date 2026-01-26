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
      button:
        "#main-content button.govuk-button[type='submit'], #main-content .govuk-button",
    };
  }

  async setDay(day) {
    await this.page.locator(this.selectors.day).fill(day);
  }

  async setMonth(month) {
    await this.page.locator(this.selectors.month).fill(month);
  }

  async setYear(year) {
    await this.page.locator(this.selectors.year).fill(year);
  }

  async fillDay(day) {
    await this.setDay(day);
  }

  async fillMonth(month) {
    await this.setMonth(month);
  }

  async fillYear(year) {
    await this.setYear(year);
  }

  async chooseAlreadyTrading() {
    await this.selectAlreadyTrading();
  }

  async chooseNotTrading() {
    await this.selectNotTrading();
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
    await this.page.locator(this.selectors.button).first().click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
