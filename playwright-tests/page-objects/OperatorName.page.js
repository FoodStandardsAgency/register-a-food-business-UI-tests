import { BasePage } from "../utils/BasePage.js";

export class OperatorName extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      firstName: "#operator_first_name",
      lastName: "#operator_last_name",
      button: "#main-content .govuk-button",
      error: ".govuk-error-message",
      day: "#operator_birthdate_day",
      month: "#operator_birthdate_month",
      year: "#operator_birthdate_year",
    };
  }

  async fillFirstName(firstName) {
    await this.page.locator(this.selectors.firstName).fill(firstName);
  }

  async fillLastName(lastName) {
    await this.page.locator(this.selectors.lastName).fill(lastName);
  }

  async fillBirthDate(day, month, year) {
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
