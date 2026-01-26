import { BasePage } from "../utils/BasePage.js";

export class BusinessScale extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      firstCheckbox: "#LOCAL",
      secondCheckbox: "#NATIONAL",
      thirdCheckbox: "#EXPORT",
      fourthCheckbox: "#ONLINE",
      fifthCheckbox: "#FBO",
      sixthCheckbox: "#SENIOR_YOUTH",
      seventhCheckbox: "#HEALTHCARE",
      eigthCheckbox: "#NONE",
      ninthCheckbox: "#DONT_KNOW",
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async checkFirstCheckbox() {
    await this.checkLocal();
  }

  async checkSecondCheckbox() {
    await this.checkNational();
  }

  async checkThirdCheckbox() {
    await this.checkExport();
  }

  async checkLocal() {
    await this.page.locator(this.selectors.firstCheckbox).check();
  }

  async checkNational() {
    await this.page.locator(this.selectors.secondCheckbox).check();
  }

  async checkExport() {
    await this.page.locator(this.selectors.thirdCheckbox).check();
  }

  async checkOnline() {
    await this.page.locator(this.selectors.fourthCheckbox).check();
  }

  async checkFBO() {
    await this.page.locator(this.selectors.fifthCheckbox).check();
  }

  async checkOption(selector) {
    await this.page.locator(selector).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
