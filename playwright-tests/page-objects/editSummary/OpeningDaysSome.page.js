import { BasePage } from "../../utils/BasePage.js";

export class OpeningDaysSome extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      monday: "#opening_day_monday",
      tuesday: "#opening_day_tuesday",
      wednesday: "#opening_day_wednesday",
      thursday: "#opening_day_thursday",
      friday: "#opening_day_friday",
      saturday: "#opening_day_saturday",
      sunday: "#opening_day_sunday",
      button:
        "#main-content button.govuk-button[type='submit'], #main-content .govuk-button",
      error: ".govuk-error-message",
    };
  }

  async checkMonday() {
    await this.page.locator(this.selectors.monday).check();
  }

  async checkTuesday() {
    await this.page.locator(this.selectors.tuesday).check();
  }

  async checkWednesday() {
    await this.page.locator(this.selectors.wednesday).check();
  }

  async checkThursday() {
    await this.page.locator(this.selectors.thursday).check();
  }

  async checkFriday() {
    await this.page.locator(this.selectors.friday).check();
  }

  async checkSaturday() {
    await this.page.locator(this.selectors.saturday).check();
  }

  async checkSunday() {
    await this.page.locator(this.selectors.sunday).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).first().click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
