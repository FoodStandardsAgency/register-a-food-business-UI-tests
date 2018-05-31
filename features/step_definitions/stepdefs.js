const assert = require("assert");
const { Given, When, Then } = require("cucumber");
var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);
const { Builder, By, until } = require("selenium-webdriver");
//const webdriver = require("selenium-webdriver");
let driver = new Builder().forBrowser("firefox").build();
require("dotenv").config();

Given(
  "that I am on the establishment trading name page and put a name in",
  async function() {
    await driver.get(
      `https://${process.env.USERNAME}:${
        process.env.PASSWORD
      }@food-business-registration.herokuapp.com/reg-pages/establishment-name`
    );
    var tradingName = driver.findElement(By.id("fbo-name"));
    tradingName.sendKeys("Example Trading Name");
  }
);

When('I press "save and continue" ', function() {
  //press save and continue
  saveAndContinueButton.click();
});

Then("the data is saved to be submitted at the end of the form", function() {
  //is this end to end test? should it instead test that it goes to
});
