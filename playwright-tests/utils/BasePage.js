/**
 * Base Page Object class for Playwright tests
 * Provides common functionality for all page objects
 */
export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for page to be loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Get element by selector
   * @param {string} selector - CSS selector
   */
  getElement(selector) {
    return this.page.locator(selector);
  }

  /**
   * Click element
   * @param {string} selector - CSS selector
   */
  async click(selector) {
    await this.page.locator(selector).click();
  }

  /**
   * Fill input field
   * @param {string} selector - CSS selector
   * @param {string} value - Value to fill
   */
  async fill(selector, value) {
    await this.page.locator(selector).fill(value);
  }

  /**
   * Select option from dropdown
   * @param {string} selector - CSS selector
   * @param {string} value - Option value or label
   */
  async selectOption(selector, value) {
    await this.page.locator(selector).selectOption(value);
  }

  /**
   * Check if element is visible
   * @param {string} selector - CSS selector
   */
  async isVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Check if element is enabled
   * @param {string} selector - CSS selector
   */
  async isEnabled(selector) {
    return await this.page.locator(selector).isEnabled();
  }

  /**
   * Get text content of element
   * @param {string} selector - CSS selector
   */
  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - CSS selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(selector, timeout = 10000) {
    await this.page.locator(selector).waitFor({ state: "visible", timeout });
  }

  /**
   * Get current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getTitle() {
    return await this.page.title();
  }
}
