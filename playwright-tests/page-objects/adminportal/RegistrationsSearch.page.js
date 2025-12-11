import { BasePage } from "../../utils/BasePage.js";

export class RegistrationsSearch extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      heading: ".govuk-heading-xl",
      registrationsLink: "#navigation > li:nth-child(3) > a",
      largeHeading: ".govuk-heading-l",
      searchPostcode: '[name="postcode_search"]',
      button:
        "#main-content > div.govuk-width-container.app-site-width-container > div > form > fieldset > div.govuk-form-group.govuk-\\!-margin-top-6 > button",
      resultCount:
        "#main-content > div.govuk-body > div > div.govuk-grid-column-one-third > p",
      searchOperator: '[name="operatorName_search"]',
      registrationNumber: '[name= "fsaRN_search"]',
      searchBusinessName: '[name="businessName_search"]',
      editRegistration: "#registrationtable > td:nth-child(4) > a",
      dateFromInput: '[name="submission_date_from"]',
      dateToInput: '[name="submission_date_to"]',
      backRegistrations:
        "#main-content > div > div:nth-child(4) > a.govuk-button.govuk-button--secondary",
    };
  }

  async clickRegistrationsLink() {
    await this.page.locator(this.selectors.registrationsLink).click();
  }

  async searchByPostcode(postcode) {
    await this.page.locator(this.selectors.searchPostcode).fill(postcode);
  }

  async searchByOperator(operatorName) {
    await this.page.locator(this.selectors.searchOperator).fill(operatorName);
  }

  async searchByBusinessName(businessName) {
    await this.page
      .locator(this.selectors.searchBusinessName)
      .fill(businessName);
  }

  async searchByRegistrationNumber(rn) {
    await this.page.locator(this.selectors.registrationNumber).fill(rn);
  }

  async fillDateRange(fromDate, toDate) {
    await this.page.locator(this.selectors.dateFromInput).fill(fromDate);
    await this.page.locator(this.selectors.dateToInput).fill(toDate);
  }

  async clickSearch() {
    await this.page.locator(this.selectors.button).click();
  }

  async clickEditRegistration() {
    await this.page.locator(this.selectors.editRegistration).click();
  }

  async clickBack() {
    await this.page.locator(this.selectors.backRegistrations).click();
  }

  async getResultCount() {
    return await this.page.locator(this.selectors.resultCount).textContent();
  }

  async getHeading() {
    return await this.page.locator(this.selectors.heading).textContent();
  }
}
