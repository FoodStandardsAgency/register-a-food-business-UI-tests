const assert = require("assert");
const { Given, When, Then } = require("cucumber");
var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);
const { Builder, By, until, Key } = require("selenium-webdriver");
//const webdriver = require("selenium-webdriver");
let driver = new Builder().forBrowser("chrome").build();
require("dotenv").config();

Given('that I am on the "declaration page"', async function() {
  await driver.get(
    `https://${process.env.USERNAME}:${
      process.env.PASSWORD
    }@food-business-registration.herokuapp.com/reg-pages/establishment-name`
  );
});

And("I have ticked all the boxes", async function() {
  var declarationBoxes = driver.findElements(By.id("DECLARATION_ID"));
  assert.equal(declarationBoxes.isSelected(), true); //this just checks it, doesn't work?
});

this.quit;

When('I click "submit registration"', async function() {});

And("I don't get a server response", async function() {
  //how do i do this?
});

Then("I am shown an error message and asked to try again", async function() {
  //assert error
});
