import { BasePage } from "../utils/BasePage.js";

export class ImportExportActivities extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      directlyImport: "#DIRECTLY_IMPORT",
      directlyExport: "#DIRECTLY_EXPORT",
      none: "#NONE",
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async checkDirectlyImport() {
    await this.page.locator(this.selectors.directlyImport).check();
  }

  async checkDirectlyExport() {
    await this.page.locator(this.selectors.directlyExport).check();
  }

  async checkNone() {
    await this.page.locator(this.selectors.none).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
