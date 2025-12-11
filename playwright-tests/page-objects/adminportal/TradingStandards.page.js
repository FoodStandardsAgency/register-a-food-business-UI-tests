import { BasePage } from "../../utils/BasePage.js";

export class TradingStandards extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      initialCheckInput: '[name="trading_status_initial_check"]',
      regularCheckInput: '[name="trading_status_regular_check"]',
      error: ".govuk-error-message",
      editHeading: "#main-content > div > main > div > div > h1",
      heading: ".govuk-heading-xl",
      enterButton:
        "#main-content > div > div > div.gem-c-cards > ul > li > div > h2 > a",
      button: ".govuk-button",
      searchField: '[name="search"]',
      searchButton:
        "#main-content > div > div > div:nth-child(1) > form > div > div:nth-child(4) > button",
      editButton: "#latable > td:nth-child(4) > a:nth-child(1)",
      successMessage: "#main-content > div > div > div > h1",
      viewCouncil: "#latable > td:nth-child(2) > p:nth-child(1) > a",
      viewInitialCheck:
        "#main-content > div > table > tbody > tr:nth-child(14) > td > table > tbody > tr > td:nth-child(1)",
      viewRegularCheck:
        "#main-content > div > table > tbody > tr:nth-child(14) > td > table > tbody > tr > td:nth-child(2)",
      checkChase:
        "#main-content > div > table > tbody > tr:nth-child(14) > td > table > tbody > tr > td:nth-child(3) > span",
      chaseCheckbox: '[name="trading_status_chase"]',
      backLink: ".govuk-link",
      welcomeTitle:
        "#main-content > div > div > div.govuk-grid-column-full > h1",
    };
  }

  async fillInitialCheck(value) {
    await this.page.locator(this.selectors.initialCheckInput).fill(value);
  }

  async fillRegularCheck(value) {
    await this.page.locator(this.selectors.regularCheckInput).fill(value);
  }

  async clickEnter() {
    await this.page.locator(this.selectors.enterButton).click();
  }

  async searchCouncil(searchTerm) {
    await this.page.locator(this.selectors.searchField).fill(searchTerm);
    await this.page.locator(this.selectors.searchButton).click();
  }

  async clickEdit() {
    await this.page.locator(this.selectors.editButton).click();
  }

  async checkChase() {
    await this.page.locator(this.selectors.chaseCheckbox).check();
  }

  async clickBack() {
    await this.page.locator(this.selectors.backLink).click();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async getHeading() {
    return await this.page.locator(this.selectors.heading).textContent();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
