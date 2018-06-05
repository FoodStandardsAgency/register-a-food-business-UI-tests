const assert = require("assert");
const { Given, When, Then } = require("cucumber");
var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);
const { Builder, By, until, Key } = require("selenium-webdriver");
//const webdriver = require("selenium-webdriver");
let driver = new Builder().forBrowser("chrome").build();
require("dotenv").config();

//form fields
var establishmentFirstLine;
var establishmentPostCode;
//current url
var urltest;

Given("I am on the establishment address page", async function() {
  await driver.get(
    `http://${process.env.URLBASE}${process.env.ESTABLISHMENTADDRESSPAGE}`
  );
  establishmentFirstLine = driver.findElement(
    By.id("establishment_first_line")
  );
  establishmentPostCode = driver.findElement(By.id("establishment_postcode"));
});

When("I put a valid Establishment first line in", async function() {
  await establishmentFirstLine.sendKeys("Example");

  //establishmentPostCode.sendKeys(Key.ENTER);
});
When("I put a valid post code in", async function() {
  await establishmentPostCode.sendKeys("W11 4ET");
});

When("I put an invalid post code in", async function() {
  await establishmentPostCode.sendKeys("notapostcode");
});

When("I press save and continue", async function() {
  await establishmentPostCode.sendKeys(Key.ENTER);
});

Then("I am taken to another page", async function() {
  var urltest = await driver.getCurrentUrl();
  console.log("THIS IS THE URL", urltest);
  assert.equal(urltest, "http://localhost:3000/submit", "URLs don't match");
});

Given(
  "I have filled in the post code with invalid characters",
  async function() {
    await establishmentFirstLine.sendKeys("Example");
    await establishmentPostCode.sendKeys("adfjanfanfa");
    establishmentPostCode.sendKeys(Key.ENTER);
  }
);

Then("an error appears", async function() {
  var error = await driver.getElement();
  console.log("Error message", error);
  assert.equal(error, "error text here", "error message doesnt match");
});
