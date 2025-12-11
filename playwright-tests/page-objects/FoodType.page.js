import { BasePage } from "../utils/BasePage.js";

export class FoodType extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      firstCheckbox: "#RAW_MEAT_FISH_SHELLFISH",
      secondCheckbox: "#READY_TO_EAT",
      thirdCheckbox: "#COOKED_OR_REHEATED",
      fourthCheckbox: "#IMPORTED",
      fifthCheckbox: "#NONE",
      sixthCheckbox: "#DONT_KNOW",
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async checkRawMeat() {
    await this.page.locator(this.selectors.firstCheckbox).check();
  }

  async checkReadyToEat() {
    await this.page.locator(this.selectors.secondCheckbox).check();
  }

  async checkCookedOrReheated() {
    await this.page.locator(this.selectors.thirdCheckbox).check();
  }

  async checkImported() {
    await this.page.locator(this.selectors.fourthCheckbox).check();
  }

  async checkNone() {
    await this.page.locator(this.selectors.fifthCheckbox).check();
  }

  async checkDontKnow() {
    await this.page.locator(this.selectors.sixthCheckbox).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
