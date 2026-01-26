import { BasePage } from "../../utils/BasePage.js";

export class PartnerDetails extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      partner_name: '[name="partner_name"]',
      error: ".govuk-error-message",
    };
  }

  async fillPartnerName(name) {
    await this.page.locator(this.selectors.partner_name).fill(name);
  }

  async clickContinue() {
    const main = this.page.locator("#main-content");
    const addPartnerButton = main.getByRole("button", { name: /^add partner$/i });
    if (await addPartnerButton.isVisible({ timeout: 1000 })) {
      await addPartnerButton.click();
      return;
    }

    const savePartnerButton = main.getByRole("button", { name: /^save partner$/i });
    if (await savePartnerButton.isVisible({ timeout: 1000 })) {
      await savePartnerButton.click();
      return;
    }

    const saveAndContinueButton = main.getByRole("button", {
      name: /^save and continue$/i,
    });
    if (await saveAndContinueButton.isVisible({ timeout: 1000 })) {
      await saveAndContinueButton.click();
      return;
    }

    await main.getByRole("button", { name: /^continue$/i }).click();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
