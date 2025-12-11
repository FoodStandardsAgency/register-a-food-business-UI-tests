import { BasePage } from "../utils/BasePage.js";

export class RepresentativeOperatorContactDetails extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      contactName: '[name="contact_representative_name"]',
      role: '[name="contact_representative_role"]',
      primaryPhoneNumber: '[name="contact_representative_number"]',
      emailAddress: '[name="contact_representative_email"]',
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async fillContactName(name) {
    await this.page.locator(this.selectors.contactName).fill(name);
  }

  async fillRole(role) {
    await this.page.locator(this.selectors.role).fill(role);
  }

  async fillPhoneNumber(phone) {
    await this.page.locator(this.selectors.primaryPhoneNumber).fill(phone);
  }

  async fillEmail(email) {
    await this.page.locator(this.selectors.emailAddress).fill(email);
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
