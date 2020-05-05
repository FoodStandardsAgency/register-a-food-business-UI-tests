module.exports = () => {
    const tabs = browser.windowHandles().value;

    browser.switchTab(tabs[1]);
};
