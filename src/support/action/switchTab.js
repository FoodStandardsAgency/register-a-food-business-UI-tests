/**
 * Switch to the first tab
 */
module.exports = () => {
    const tabs = browser.getWindowHandles();
    browser.switchToWindow(tabs[0]);
};
