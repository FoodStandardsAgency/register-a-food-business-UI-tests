const assert = require("assert");
const { Given, When, Then } = require("cucumber");
var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);
//const { Builder, By, until, Key } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
var driver;

// require("dotenv").config();
// var form1;
// var form2;
// var form3;

// //current url
// var currentUrl;
// var boxSelected;

// Given(
//   "I have opened a new window for the submit registration",
//   async function() {
//     driver = await new webdriver.Builder().forBrowser("chrome").build();
//   }
// );

// Given("that I am on the declaration page", async function() {
//   await driver.get(`http://${process.env.URLBASE}${process.env.DECLARATION}`);
//   form1 = driver.findElement(webdriver.By.name("declaration1"));
//   form2 = driver.findElement(webdriver.By.name("declaration2"));
//   form3 = driver.findElement(webdriver.By.name("declaration3"));
// });

// Given("I have ticked all the boxes", async function() {
//   form1.click();
//   form2.click();
//   form3.click();
// });

// Given("I have ticked one of the boxes", async function() {
//   form1.click();
// });

// When("I click submit", async function() {
//   await form3.submit();
// });

// Then("I am shown an error", async function() {
//   declarationError = await driver.findElement(
//     webdriver.By.className("css-jdwgdl")
//   );
//   declarationErrorText = await declarationError.getText();
//   console.log("First Line Error Text", declarationErrorText);
//   assert.equal(
//     declarationErrorText,
//     "You must tick all the declarations before continuing",
//     "error message doesnt match"
//   );
// });

// Then("I am directed to the application complete page", async function() {
//   currentUrl = await driver.getCurrentUrl();
//   console.log("THIS IS THE URL", currentUrl);
//   assert.equal(
//     currentUrl,
//     "http://localhost:3000/application-complete",
//     "URLs don't match"
//   );
// });

// Then("my box is still ticked", async function() {
//   form1 = driver.findElement(webdriver.By.name("declaration1"));
//   boxSelected = await form1.isSelected();
//   console.log("box selected", boxSelected);
//   assert.equal(boxSelected, true, "box isn't selected");
// });
