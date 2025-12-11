import { BasePage } from "../../utils/BasePage.js";

export class OperatorContactName extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      firstName: "#operator_first_name",
      lastName: "#operator_last_name",
      button: ".govuk-button",
      error: ".govuk-error-message",
      day: "#operator_birthdate_day",
      month: "#operator_birthdate_month",
      year: "#operator_birthdate_year",
    };
  }

  async fillFirstName(name) {
    await this.page.locator(this.selectors.firstName).fill(name);
  }

  async fillLastName(name) {
    await this.page.locator(this.selectors.lastName).fill(name);
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
