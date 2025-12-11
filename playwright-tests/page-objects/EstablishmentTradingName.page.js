import { BasePage } from "../utils/BasePage.js";

export class EstablishmentTradingName extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      tradingNameInput: "#establishment_trading_name",
      additionalTradingNameInput: "#trading_name",
      button: "#continue-button",
      cancelButton: "#cancelButton",
      error: ".govuk-error-message",
      errorAdditional:
        "#establishment_trading_name_form > div > div > div > ul > li > a",
      additionalTradingNamePageTitle: "h1",
      addAdditionalTradingNameBtn: "#addTradingNameLink",
      changeFirstTradingNameLink: "#tradingName0RowChange",
      deleteFirstAdditionalTradingNameBtn: "#deleteTradingNameButton0",
      firstAdditionalTradingNameLabel: "#tradingName0",
    };
  }

  async fillTradingName(name) {
    await this.page.locator(this.selectors.tradingNameInput).fill(name);
  }

  async fillAdditionalTradingName(name) {
    await this.page
      .locator(this.selectors.additionalTradingNameInput)
      .fill(name);
  }

  async clickAddAdditionalTradingName() {
    await this.page.locator(this.selectors.addAdditionalTradingNameBtn).click();
  }

  async clickChangeFirstTradingName() {
    await this.page.locator(this.selectors.changeFirstTradingNameLink).click();
  }

  async clickDeleteFirstAdditionalTradingName() {
    await this.page
      .locator(this.selectors.deleteFirstAdditionalTradingNameBtn)
      .click();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async clickCancel() {
    await this.page.locator(this.selectors.cancelButton).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
