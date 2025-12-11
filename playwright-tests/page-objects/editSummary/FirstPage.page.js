import { BasePage } from "../../utils/BasePage.js";

export class FirstPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      button: ".govuk-button",
    };
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }
}
