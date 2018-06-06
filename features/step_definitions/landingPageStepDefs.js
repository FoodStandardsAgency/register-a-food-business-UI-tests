const assert = require("assert");
const { Given, When, Then } = require("cucumber");
var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);
//const { Builder, By, until, Key } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
var driver;

// Given("I have opened a new window for the landing page", async function() {
//   driver = await new webdriver.Builder().forBrowser("chrome").build();
// });

// require("dotenv").config();

// var beginButton;
// var theUrl;
// Given("that I am on the start page", async function() {
//   await driver.get(`http://${process.env.URLBASE}`);
// });

// When("I click begin registration", async function() {
//   beginButton = await driver.findElement(webdriver.By.className("css-wu1qf"));
//   beginButton.submit();
// });

// Then("I am directed to another page", async function() {
//   theUrl = await driver.getCurrentUrl();
//   console.log("THIS IS THE URL", theUrl);
//   assert.notEqual(theUrl, "http://localhost:3000/", "URLs match");
// });
