const assert = require("assert");
const { Given, When, Then } = require("cucumber");
var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);
const { Builder, By, until, Key } = require("selenium-webdriver");
//const webdriver = require("selenium-webdriver");
let driver = new Builder().forBrowser("chrome").build();
require("dotenv").config();

Given(
  "that I am on the establishment trading name page and put a name in",
  async function() {
    await driver.get(
      `https://${process.env.USERNAME}:${process.env.PASSWORD}@${
        process.env.ESTABLISHMENTADDRESSPAGECUT
      }`
    );
    var tradingName = driver.findElement(By.id("fbo-name"));
    tradingName.sendKeys("Example");
    tradingName.sendKeys(Key.ENTER);
    // console.log("HEEEEEEEEERRRRRRREEEEE", tradingName);
  }
);

When("I press save and continue ", async function() {});

Then("the data is saved to be submitted at the end of the form", function() {
  //is this end to end test? should it instead test that it goes to
});
