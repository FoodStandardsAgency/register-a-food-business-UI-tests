import { BasePage } from "../utils/BasePage.js";

export class OperatorAddress extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      firstline: '[name="operator_address_line_1"]',
      street: '[name="operator_address_line_2"]',
      locality: '[name="operator_address_line_3"]',
      town: '[name="operator_town"]',
      postcode: "#operator_postcode_find",
      manualPostcode: '[name="operator_postcode"]',
      findAddress: "#find-address",
      postcodeDisplay:
        "#main-content > div > div > form > dl > div > dd.govuk-summary-list__value",
      changePostcode:
        "#main-content > div > div > form > dl > div > dd.govuk-summary-list__actions > a",
      postcodeDropdown: "#operatorAddressDropdown",
      cantFindAddressLink: "#cantFindAddressLink",
      button: ".govuk-button",
      error: ".govuk-error-message",
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

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
