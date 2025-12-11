import { BasePage } from "../utils/BasePage.js";

export class NewOrUpdateRegistration extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      button: ".govuk-button",
      heading:
        "#main-content > div > div > form > div > fieldset > legend > h1",
      newRegistration: "#new_registration",
      updateReg: "#update_registration",
    };
  }

  async selectNewRegistration() {
    await this.page.locator(this.selectors.newRegistration).check();
  }

  async selectUpdateRegistration() {
    await this.page.locator(this.selectors.updateReg).check();
  }

  async getHeading() {
    return await this.page.locator(this.selectors.heading).textContent();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }
}
