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
      backButton: "a.govuk-back-link",
      betaLink: ".govuk-phase-banner a[href*='forms.office.com']",

      cookieBanner: ".govuk-cookie-banner",
      cookieInfo: ".govuk-cookie-banner a[href='https://www.gov.uk/help/cookies']",
      cookiePolicy: ".govuk-cookie-banner a[href='https://www.food.gov.uk/cookie-policy']",
      cookieAccept:
        ".govuk-cookie-banner button:has-text('Accept'), .govuk-cookie-banner a[href*='acceptAllCookies/true']",
      cookieReject:
        ".govuk-cookie-banner button:has-text('Reject'), .govuk-cookie-banner a[href*='acceptAllCookies/false']",
      cookieClose:
        ".govuk-cookie-banner button:has-text('Hide'), .govuk-cookie-banner button:has-text('Close')",
      fsaFooter: ".govuk-footer",
      cookiePolicyFooter: ".govuk-footer a[href='https://www.food.gov.uk/cookie-policy']",
      privacyPolicyFooter:
        ".govuk-footer a[href='https://www.food.gov.uk/about-us/register-a-food-business-privacy-notice']",
      languageFooter: ".govuk-footer a[href*='lang=cy'], .govuk-footer a[href*='lang=en']",
      languageEnHeader: "#languageEnHeader",
      languageCyHeader: "#languageCyHeader",
      button: "#main-content .govuk-button",
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
    await this.page.locator(this.selectors.cookieAccept).first().click();
  }

  async rejectCookies() {
    await this.page.locator(this.selectors.cookieReject).first().click();
  }

  async closeCookieBanner() {
    await this.page.locator(this.selectors.cookieClose).first().click();
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
