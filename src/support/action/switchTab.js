/**
 * Switch to the first tab
 */
export default () => {
  const tabs = browser.getWindowHandles();
  browser.switchToWindow(tabs[0]);
};
