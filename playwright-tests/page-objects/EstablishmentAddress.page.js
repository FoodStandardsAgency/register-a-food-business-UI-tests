import { BasePage } from "../utils/BasePage.js";

export class EstablishmentAddress extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      firstline: '[name="establishment_address_line_1"]',
      postcode: '[name="establishment_postcode_find"]',
      manualPostcode: '[name="establishment_postcode"]',
      findAddress: "#find-address",
      firstOption: "#local_authority__option--0",
      changePostcode:
        "#main-content > div > div > form > dl > div > dd.govuk-summary-list__actions > a",
      postcodeDisplay:
        "#main-content > div > div > form > dl > div > dd.govuk-summary-list__value",
      heading: "#main-content > div > div > form > fieldset > legend > h1",
      cannotFindPostcodeHeading:
        "#main-content > div > div > fieldset > legend > h1",
      postcodeLocator: "#local_authority",
      estabPostcodeFind: "#establishment_postcode_find",
      noCouncilHeading: "#main-heading",
      postcodeDropdown: "#establishmentAddressDropdown",
      street: '[name="establishment_address_line_2"]',
      town: '[name="establishment_town"]',
      locality: '[name="establishment_address_line_3"]',
      button: ".govuk-button",
      error: ".govuk-error-message",
      cantFindAddressLink: "#cantFindAddressLink",
      backButton:
        "body > div.govuk-width-container > nav > div.govuk-grid-row > div.govuk-grid-column-two-thirds > a",
      backButtonEstablished:
        "body > div > nav > div.govuk-grid-row > div.govuk-grid-column-two-thirds > a",
      cantFindLA: "#cantFindLA",
      postcodeFinder: "#postcode",
      errorPostcode: "#error-summary-ba73298e > div > h2",
      LAnotOnboarded: "#main-content > h1.govuk-heading-l",
      LAInvalidError:
        "#main-content > div > div > form > div.govuk-error-summary > div > h2",
    };
  }

  async fillPostcode(postcode) {
    await this.page.locator(this.selectors.postcode).fill(postcode);
  }

  async fillManualPostcode(postcode) {
    await this.page.locator(this.selectors.manualPostcode).fill(postcode);
  }

  async clickFindAddress() {
    await this.page.locator(this.selectors.findAddress).click();
  }

  async fillFirstLine(address) {
    await this.page.locator(this.selectors.firstline).fill(address);
  }

  async fillStreet(street) {
    await this.page.locator(this.selectors.street).fill(street);
  }

  async fillLocality(locality) {
    await this.page.locator(this.selectors.locality).fill(locality);
  }

  async fillTown(town) {
    await this.page.locator(this.selectors.town).fill(town);
  }

  async selectAddressFromDropdown(option) {
    await this.page
      .locator(this.selectors.postcodeDropdown)
      .selectOption(option);
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async clickCantFindAddress() {
    await this.page.locator(this.selectors.cantFindAddressLink).click();
  }

  async getHeading() {
    return await this.page.locator(this.selectors.heading).textContent();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
