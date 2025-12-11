import { BasePage } from "../utils/BasePage.js";

export class LimitedCompanyDetails extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      name: '[name="operator_company_name"]',
      companiesHouseNumber: '[name="operator_companies_house_number"]',
      link: "#link-companies-house",
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async fillCompanyName(name) {
    await this.page.locator(this.selectors.name).fill(name);
  }

  async fillCompaniesHouseNumber(number) {
    await this.page.locator(this.selectors.companiesHouseNumber).fill(number);
  }

  async clickCompaniesHouseLink() {
    await this.page.locator(this.selectors.link).click();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
