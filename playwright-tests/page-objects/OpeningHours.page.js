import { BasePage } from "../utils/BasePage.js";

export class OpeningHours extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      // Opening days start
      everyday: "#opening_days_start_everyday",
      someDays: "#opening_days_start_some_days",
      irregularDays: "#opening_days_start_irregular_days",
      // Specific days (some days)
      monday: "#opening_day_monday",
      tuesday: "#opening_day_tuesday",
      wednesday: "#opening_day_wednesday",
      thursday: "#opening_day_thursday",
      friday: "#opening_day_friday",
      saturday: "#opening_day_saturday",
      sunday: "#opening_day_sunday",
      // Opening hours
      mondayHours: '[name="opening_hours_monday"]',
      tuesdayHours: '[name="opening_hours_tuesday"]',
      wednesdayHours: '[name="opening_hours_wednesday"]',
      thursdayHours: '[name="opening_hours_thursday"]',
      fridayHours: '[name="opening_hours_friday"]',
      saturdayHours: '[name="opening_hours_saturday"]',
      sundayHours: '[name="opening_hours_sunday"]',
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async selectEveryday() {
    await this.page.locator(this.selectors.everyday).check();
  }

  async selectSomeDays() {
    await this.page.locator(this.selectors.someDays).check();
  }

  async selectIrregularDays() {
    await this.page.locator(this.selectors.irregularDays).check();
  }

  async checkDay(day) {
    const daySelector = this.selectors[day.toLowerCase()];
    if (daySelector) {
      await this.page.locator(daySelector).check();
    }
  }

  async fillDayHours(day, hours) {
    const hoursSelector = this.selectors[`${day.toLowerCase()}Hours`];
    if (hoursSelector) {
      await this.page.locator(hoursSelector).fill(hours);
    }
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
