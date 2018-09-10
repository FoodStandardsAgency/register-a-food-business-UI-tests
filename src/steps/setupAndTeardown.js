// Before(async () => {
//     driver = await new webdriver.Builder().forBrowser("chrome").build();
// });

// After(async () => {
//     return driver.quit();
// });
const { Given } = require("cucumber");

Given("I reload my session", () => {
    browser.reload();
});

Given("I change my viewport", () => {
    browser.setViewportSize({
        width: 2048,
        height: 1536
    });
});
