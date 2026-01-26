import { BasePage } from "../utils/BasePage.js";

export class ProcessingActivities extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      firstCheckbox: "#VACUUM_PACKING",
      secondCheckbox: "#SOUS_VIDE",
      thirdCheckbox: "#FERMENTING_OR_CURING",
      fourthCheckbox: "#PASTEURISING",
      fifthCheckbox: "#ANIMAL_UNCOOKED",
      sixthCheckbox: "#REWRAPPING_OR_RELABELLING",
      seventhCheckbox: "#NONE",
      eigthCheckbox: "#DONT_KNOW",
      button: ".govuk-button",
      error: ".govuk-error-message",
    };
  }

  async checkFirstCheckbox() {
    await this.checkVacuumPacking();
  }

  async checkSecondCheckbox() {
    await this.checkSousVide();
  }

  async checkThirdCheckbox() {
    await this.checkFermenting();
  }

  async checkVacuumPacking() {
    await this.page.locator(this.selectors.firstCheckbox).check();
  }

  async checkSousVide() {
    await this.page.locator(this.selectors.secondCheckbox).check();
  }

  async checkFermenting() {
    await this.page.locator(this.selectors.thirdCheckbox).check();
  }

  async checkPasteurising() {
    await this.page.locator(this.selectors.fourthCheckbox).check();
  }

  async checkNone() {
    await this.page.locator(this.selectors.seventhCheckbox).check();
  }

  async checkDontKnow() {
    await this.page.locator(this.selectors.eigthCheckbox).check();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
