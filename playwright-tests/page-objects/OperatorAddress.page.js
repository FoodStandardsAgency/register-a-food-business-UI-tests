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
      button: "#main-content .govuk-button",
      error: ".govuk-error-message",
    };
  }

  async fillPostcode(postcode) {
    await this.page.locator(this.selectors.postcode).fill(postcode);
  }

  async findPostcode(postcode) {
    await this.fillPostcode(postcode);
  }

  async fillManualPostcode(postcode) {
    await this.page.locator(this.selectors.manualPostcode).fill(postcode);
  }

  async clickFindAddress() {
    const findButton = this.page.locator(this.selectors.findAddress);
    if ((await findButton.count()) > 0 && (await findButton.isVisible())) {
      await findButton.click();
      return;
    }

    // Current flow uses a standard Continue button on the postcode page.
    await this.clickContinue();
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
    const dropdown = this.page.locator(this.selectors.postcodeDropdown);

    // Accept either a Playwright selectOption value, a numeric index, or fall back to first option.
    if (typeof option === "number") {
      await dropdown.selectOption({ index: option });
      return;
    }

    try {
      await dropdown.selectOption(option);
    } catch (e) {
      const optionCount = await this.page
        .locator(`${this.selectors.postcodeDropdown} option`)
        .count();
      if (optionCount > 0) {
        await dropdown.selectOption({ index: 0 });
        return;
      }
      throw e;
    }
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).first().click();
  }

  async clickCantFindAddress() {
    await this.page.locator(this.selectors.cantFindAddressLink).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
