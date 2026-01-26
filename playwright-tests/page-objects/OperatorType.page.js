import { BasePage } from "../utils/BasePage.js";

export class OperatorType extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      operatorPerson: "#operator_type_person",
      operatorCompany: "#operator_type_company",
      operatorCharity: "#operator_type_charity",
      button: "#main-content .govuk-button",
      error: ".govuk-error-message",
    };
  }

  async selectPerson() {
    await this.page.locator(this.selectors.operatorPerson).check();
  }

  async selectCompany() {
    await this.page.locator(this.selectors.operatorCompany).check();
  }

  async selectLimitedCompany() {
    await this.selectCompany();
  }

  async selectCharity() {
    await this.page.locator(this.selectors.operatorCharity).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
