import { BasePage } from "../utils/BasePage.js";

/**
 * Common Elements Page Object
 * Contains selectors and methods for elements that appear across multiple pages
 */
export class CommonElements extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.selectors = {
      backButton:
        "body > div.govuk-width-container > nav > div.govuk-grid-row > div.govuk-grid-column-two-thirds > a",
      betaLink: "body > div > nav > div.govuk-phase-banner > p > span > a",
      cookieBanner: "#cookieBanner",
      cookieInfo:
        "body > div.govuk-cookie-banner > div > div.govuk-button-group > a:nth-child(3)",
      cookiePolicy:
        "body > div.govuk-cookie-banner > div > div.govuk-button-group > a:nth-child(4)",
      cookieAccept: "#cookieAccept",
      cookieReject:
        "body > div.govuk-cookie-banner > div > div.govuk-button-group > a:nth-child(2)",
      cookieClose: "#cookieClose",
      fsaFooter: ".govuk-footer",
      cookiePolicyFooter:
        "body > footer > div > div > div > ul > li:nth-child(1) > a",
      privacyPolicyFooter:
        "body > footer > div > div > div > ul > li:nth-child(2) > a",
      languageFooter:
        "body > footer > div > div > div > ul > li:nth-child(5) > a",
      languageEnHeader: "#languageEnHeader",
      languageCyHeader: "#languageCyHeader",
      button: ".govuk-button",
      continueToNextPageButton: "#continue-button",
      continueButton:
        "#main-content > div > div > fieldset > form:nth-child(7) > button",
      fullPartnerContinue:
        "#main-content > div > div > fieldset > form:nth-child(5) > button",
      error: ".govuk-error-message",
    };
  }

  // Navigation actions
  async clickBackButton() {
    await this.page.locator(this.selectors.backButton).click();
  }

  async clickContinueButton() {
    await this.page.locator(this.selectors.button).click();
  }

  async clickContinueToNextPage() {
    await this.page.locator(this.selectors.continueToNextPageButton).click();
  }

  // Cookie banner actions
  async isCookieBannerVisible() {
    return await this.page.locator(this.selectors.cookieBanner).isVisible();
  }

  async acceptCookies() {
    await this.page.locator(this.selectors.cookieAccept).click();
  }

  async rejectCookies() {
    await this.page.locator(this.selectors.cookieReject).click();
  }

  async closeCookieBanner() {
    await this.page.locator(this.selectors.cookieClose).click();
  }

  async clickCookieInfo() {
    await this.page.locator(this.selectors.cookieInfo).click();
  }

  async clickCookiePolicy() {
    await this.page.locator(this.selectors.cookiePolicy).click();
  }

  // Footer actions
  async clickCookiePolicyFooter() {
    await this.page.locator(this.selectors.cookiePolicyFooter).click();
  }

  async clickPrivacyPolicyFooter() {
    await this.page.locator(this.selectors.privacyPolicyFooter).click();
  }

  async clickLanguageFooter() {
    await this.page.locator(this.selectors.languageFooter).click();
  }

  // Language switching
  async switchToEnglish() {
    await this.page.locator(this.selectors.languageEnHeader).click();
  }

  async switchToWelsh() {
    await this.page.locator(this.selectors.languageCyHeader).click();
  }

  // Beta banner
  async clickBetaLink() {
    await this.page.locator(this.selectors.betaLink).click();
  }

  // Error checking
  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }

  async getErrorText() {
    return await this.page.locator(this.selectors.error).textContent();
  }

  async waitForErrorMessage() {
    await this.page.locator(this.selectors.error).waitFor({ state: "visible" });
  }

  // Footer visibility
  async isFooterVisible() {
    return await this.page.locator(this.selectors.fsaFooter).isVisible();
  }
}
