import { BasePage } from "../utils/BasePage.js";

/**
 * Landing Page Object
 * Contains selectors and methods for the landing/home page
 */
export class LandingPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.selectors = {
      heading: ".govuk-heading-l",
      enterButton:
        "#main-content > div > div > div.gem-c-cards > ul > li > div > h2 > a",
      searchField: '[name="search"]',
      editHeading: ".govuk-heading-l",
      editButton: "#latable > td:nth-child(4) > a:nth-child(1)",
      countyName: '[name="local_council"]',
      successMessage: "#main-content > div > div > div > h1",
      button: ".govuk-button",
      newCouncilName: ".govuk-panel__body",
      emailField: '[name="local_council_email"]',
      backLink: ".govuk-link",
      emailSummary: "#latable > td:nth-child(2) > p:nth-child(2)",
      tableField: "#main-content > div > table > tbody",
      numberField: '[name="local_council_phone_number"]',
      numberSummary:
        "#main-content > div > form > main > div > div > dl > div:nth-child(5) > dd.govuk-summary-list__value",
      addButton: "#main-content > div > a",
      idInput: '[name="_id"]',
      nameInput: '[name="local_council"]',
      emailInput: '[name="local_council_email"]',
      notifyEmailInput: '[name="local_council_notify_emails"]',
      phoneNumberInput: '[name="local_council_phone_number"]',
      countryInput: '[name="country"]',
      localUrlInput: '[name="local_council_url"]',
      countryDropdown: ".govuk-select",
      newCouncil: ".govuk-panel__body",
      deleteLink: "#latable > td:nth-child(4) > a:nth-child(2)",
      deleteCheckbox: '[name="confirm_delete"]',
    };
  }

  // Navigation
  async open() {
    await this.goto("/");
  }

  // Heading interactions
  async getHeading() {
    return await this.page.locator(this.selectors.heading).textContent();
  }

  async getEditHeading() {
    return await this.page.locator(this.selectors.editHeading).textContent();
  }

  async getSuccessMessage() {
    return await this.page.locator(this.selectors.successMessage).textContent();
  }

  // Button actions
  async clickEnterButton() {
    await this.page.locator(this.selectors.enterButton).click();
  }

  async clickButton() {
    await this.page.locator(this.selectors.button).click();
  }

  async clickEditButton() {
    await this.page.locator(this.selectors.editButton).click();
  }

  async clickAddButton() {
    await this.page.locator(this.selectors.addButton).click();
  }

  async clickDeleteLink() {
    await this.page.locator(this.selectors.deleteLink).click();
  }

  async clickBackLink() {
    await this.page.locator(this.selectors.backLink).click();
  }

  // Form interactions
  async searchFor(text) {
    await this.page.locator(this.selectors.searchField).fill(text);
  }

  async fillCouncilName(name) {
    await this.page.locator(this.selectors.countyName).fill(name);
  }

  async fillEmail(email) {
    await this.page.locator(this.selectors.emailField).fill(email);
  }

  async fillPhoneNumber(number) {
    await this.page.locator(this.selectors.numberField).fill(number);
  }

  async fillIdInput(id) {
    await this.page.locator(this.selectors.idInput).fill(id);
  }

  async fillNameInput(name) {
    await this.page.locator(this.selectors.nameInput).fill(name);
  }

  async fillEmailInput(email) {
    await this.page.locator(this.selectors.emailInput).fill(email);
  }

  async fillNotifyEmailInput(email) {
    await this.page.locator(this.selectors.notifyEmailInput).fill(email);
  }

  async fillPhoneNumberInput(number) {
    await this.page.locator(this.selectors.phoneNumberInput).fill(number);
  }

  async fillCountryInput(country) {
    await this.page.locator(this.selectors.countryInput).fill(country);
  }

  async fillLocalUrlInput(url) {
    await this.page.locator(this.selectors.localUrlInput).fill(url);
  }

  async selectCountry(country) {
    await this.page
      .locator(this.selectors.countryDropdown)
      .selectOption(country);
  }

  async checkDeleteCheckbox() {
    await this.page.locator(this.selectors.deleteCheckbox).check();
  }

  // Information retrieval
  async getNewCouncilName() {
    return await this.page.locator(this.selectors.newCouncilName).textContent();
  }

  async getEmailSummary() {
    return await this.page.locator(this.selectors.emailSummary).textContent();
  }

  async getNumberSummary() {
    return await this.page.locator(this.selectors.numberSummary).textContent();
  }

  async getTableContent() {
    return await this.page.locator(this.selectors.tableField).textContent();
  }

  // Visibility checks
  async isHeadingVisible() {
    return await this.page.locator(this.selectors.heading).isVisible();
  }

  async isEnterButtonVisible() {
    return await this.page.locator(this.selectors.enterButton).isVisible();
  }

  async isEditButtonVisible() {
    return await this.page.locator(this.selectors.editButton).isVisible();
  }

  async isDeleteLinkVisible() {
    return await this.page.locator(this.selectors.deleteLink).isVisible();
  }

  async isTableVisible() {
    return await this.page.locator(this.selectors.tableField).isVisible();
  }

  async clickStartNow() {
    // Try multiple strategies to find the start button
    const startButton = this.page.locator(".govuk-button--start");
    if (await startButton.isVisible()) {
        await startButton.click();
    } else {
        // Fallback to role
        await this.page.getByRole('button', { name: 'Begin registration' }).click();
    }
  }

  async clickStartButton() {
    await this.clickStartNow();
  }
}
