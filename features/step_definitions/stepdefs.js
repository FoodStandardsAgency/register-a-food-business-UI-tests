const assert = require("assert");
const { Given, When, Then } = require("cucumber");
var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);
const { Builder, By, until, Key } = require("selenium-webdriver");
//const webdriver = require("selenium-webdriver");
let driver = new Builder().forBrowser("chrome").build();
require("dotenv").config();

var establishmentFirstLine;

var establishmentPostCode;

Given("I am on the establishment address page", async function() {
  await driver.get(
    `http://${process.env.USERNAME}:${process.env.PASSWORD}@${
      process.env.URLBASE
    }${process.env.ESTABLISHMENTADDRESSPAGE}`
  );
  establishmentFirstLine = driver.findElement(
    By.id("establishment_first_line")
  );
  establishmentPostCode = driver.findElement(By.id("establishment_postcode"));
});

When(
  'I put the Establishment first line and post code in and I press "save and continue"',
  async function() {
    await establishmentFirstLine.sendKeys("Example");
    await establishmentPostCode.sendKeys("W11 4ET");
    establishmentPostCode.sendKeys(Key.ENTER);
  }
);

Then("I am taken to another page", function() {
  //test that the url is equal to the submit one
  assert.equal(this.getCurrentUrl, "http://localhost:3000/submit");
});
