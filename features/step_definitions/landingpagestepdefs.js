const assert = require("assert");
const { Given, When, Then } = require("cucumber");
var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);
const {
  Builder,
  By,
  until,
  Key,
  ThenableWebDriver
} = require("selenium-webdriver");
//const webdriver = require("selenium-webdriver");
let driver = new Builder().forBrowser("firefox").build();
require("dotenv").config();

Given("that I am on the start page", async function() {
  await driver.get(
    `https://${process.env.USERNAME}:${process.env.PASSWORD}@${
      process.env.STARTPAGECUT
    }`
  );
});

When(' I click "begin registration"', async function() {
  var startPageButton = driver.findElement(By.id("operator-continue-button"));
  startPageButton.sendKeys(Key.ENTER);
});

Then(
  "I am directed to the next page to begin the registration information",
  function() {
    console.log(this.getCurrentUrl());
    //either check page is equal to the next page or check that the page is not the same as the existing one
    // need to do something for URL
    assert.notEqual(URL, process.env.STARTPAGE);
  }
);

this.quit;
