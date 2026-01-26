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
      button: "#main-content .govuk-button",
      error: ".govuk-error-message",
    };
  }

  async enterMondayOpeningHours(hours) {
    await this.fillDayHours("monday", hours);
  }

  async enterTuesdayOpeningHours(hours) {
    await this.fillDayHours("tuesday", hours);
  }

  async enterWednesdayOpeningHours(hours) {
    await this.fillDayHours("wednesday", hours);
  }

  async enterThursdayOpeningHours(hours) {
    await this.fillDayHours("thursday", hours);
  }

  async enterFridayOpeningHours(hours) {
    await this.fillDayHours("friday", hours);
  }

  async enterSaturdayOpeningHours(hours) {
    await this.fillDayHours("saturday", hours);
  }

  async enterSundayOpeningHours(hours) {
    await this.fillDayHours("sunday", hours);
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

  async fillMonday(start, end) {
    await this.fillDayHours(
      "monday",
      end === undefined ? start : `${start} to ${end}`
    );
  }

  async fillTuesday(start, end) {
    await this.fillDayHours(
      "tuesday",
      end === undefined ? start : `${start} to ${end}`
    );
  }

  async fillWednesday(start, end) {
    await this.fillDayHours(
      "wednesday",
      end === undefined ? start : `${start} to ${end}`
    );
  }

  async fillThursday(start, end) {
    await this.fillDayHours(
      "thursday",
      end === undefined ? start : `${start} to ${end}`
    );
  }

  async fillFriday(start, end) {
    await this.fillDayHours(
      "friday",
      end === undefined ? start : `${start} to ${end}`
    );
  }

  async fillSaturday(start, end) {
    await this.fillDayHours(
      "saturday",
      end === undefined ? start : `${start} to ${end}`
    );
  }

  async fillSunday(start, end) {
    await this.fillDayHours(
      "sunday",
      end === undefined ? start : `${start} to ${end}`
    );
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).first().click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
