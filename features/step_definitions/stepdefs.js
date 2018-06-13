const assert = require("assert");
const { Given, When, Then, setDefaultTimeout, After, Before } = require("cucumber");
setDefaultTimeout(60 * 1000);
//const { Builder, By, until, Key } = require("selenium-webdriver");

const webdriver = require("selenium-webdriver");
var driver;

require("dotenv").config();

//form fields
var establishmentFirstLine;
var establishmentPostCode;

//validdetails
var validPostCode = "W11 4ET";
var validFirstLine = "Example Establishment Address";

//invaliddetails
var invalidPostCode = "notapostcode";
var nothing = "";

//current url
var urltest;

//error
var error;

//////ESTABLISHMENT ADDRESS /////////

Given("I have opened a new window", async function() {
  driver = await new webdriver.Builder().forBrowser("chrome").build();
});

Before(async () => {
  driver = await new webdriver.Builder().forBrowser("chrome").build();
});

After(async () => {
  return driver.quit();
});

Given("I am on the establishment address page", async function() {
  //newWindow = await driver.webdriver.createSession();
  // await new webdriver.Builder().forBrowser("chrome").build();

  await driver.get(
    `http://${process.env.URLBASE}${process.env.ESTABLISHMENTADDRESSPAGE}`
  );
  establishmentFirstLine = driver.findElement(
    webdriver.By.name("establishment_first_line")
  );
  establishmentPostCode = driver.findElement(
    webdriver.By.name("establishment_postcode")
  );
});

When("I put a valid Establishment first line in", async function() {
  await establishmentFirstLine.sendKeys(validFirstLine);

  //establishmentPostCode.sendKeys(Key.ENTER);
});

When("I put a valid post code in", async function() {
  await establishmentPostCode.sendKeys(validPostCode);
});

When("I put an invalid post code in", async function() {
  await establishmentPostCode.sendKeys("notapostcode");
});

When("I press save and continue", async function() {
  //await establishmentPostCode.sendKeys(webdriver.Key.ENTER);
  await establishmentPostCode.submit();
});

Then("I am taken to another page", async function() {
  urltest = await driver.getCurrentUrl();
  console.log("THIS IS THE URL", urltest);
  assert.notEqual(
    urltest,
    `http://${process.env.URLBASE}${process.env.ESTABLISHMENTADDRESSPAGE}`,
    "URLs do match"
  );
});

Then("the valid Establishment first line is still there", async function() {
  var currentFirstLine = await driver
    .findElement(webdriver.By.name("establishment_first_line"))
    .getAttribute("value");
  console.log("FIRST LINE", currentFirstLine);
  assert.equal(currentFirstLine, validFirstLine, "text is no longer there");
});

Then("the invalid PostCode is still there", async function() {
  currentPostCode = await driver
    .findElement(webdriver.By.name("establishment_postcode"))
    .getAttribute("value");
  console.log("CURRENT POST CODE", currentPostCode);
  assert.equal(currentPostCode, invalidPostCode, "text is no longer there");
});

Then("an error appears telling me my postcode is invalid", async function() {
  //the following works but using classname, which isnt ideal as is likely to change
  postCodeError = await driver.findElement(
    webdriver.By.className("css-jdwgdl")
  );
  postCodeErrorText = await postCodeError.getText();
  console.log("Postcode Error Text", postCodeErrorText);
  assert.equal(
    postCodeErrorText,
    "Not a valid Postcode",
    "error message doesnt match"
  );
  //the below doesn't work
  // postcode = await driver.findElement(
  //   webdriver.By.js(function() {
  //     var pcode = document.getElementsByTagName("span");
  //   })
  // );
  // console.log("POSTCODE", postcode);
});

Then("an error appears telling me my first line is invalid", async function() {
  //the following works but using classname, which isnt ideal as is likely to change
  firstLineError = await driver.findElement(
    webdriver.By.className("css-jdwgdl")
  );
  firstLineErrorText = await firstLineError.getText();
  console.log("First Line Error Text", firstLineErrorText);
  assert.equal(
    firstLineErrorText,
    "Not a valid First Line of address",
    "error message doesnt match"
  );
});

Then("the valid PostCode is still there", async function() {
  currentPostCode = await driver
    .findElement(webdriver.By.name("establishment_postcode"))
    .getAttribute("value");
  console.log("CURRENT POST CODE", currentPostCode);
  assert.equal(currentPostCode, validPostCode, "text is no longer there");
});

Then("it closes the window", async function() {
  quit = driver.quit();
});

///////// LANDING PAGE /////////

require("dotenv").config();

var beginButton;
var theUrl;

Given("I am on the start page", async function() {
  await driver.get(`http://${process.env.URLBASE}`);
});

When("I click begin registration", async function() {
  beginButton = await driver.findElement(webdriver.By.className("css-1b7o5ue"));
  beginButton.submit();
});

Then("I am directed to another page", async function() {
  theUrl = await driver.getCurrentUrl();
  console.log("THIS IS THE URL", theUrl);
  assert.notEqual(theUrl, "http://localhost:3000/", "URLs match");
});

////////SUBMIT REGISTRATION ////

require("dotenv").config();
var declarataion1;
var declarataion2;
var declarataion3;

//current url
var currentUrl;
var boxSelected;

Given("I am on the declaration page", async function() {
  await driver.get(`http://${process.env.URLBASE}${process.env.DECLARATION}`);
  declarataion1 = driver.findElement(webdriver.By.name("declaration1"));
  declarataion2 = driver.findElement(webdriver.By.name("declaration2"));
  declarataion3 = driver.findElement(webdriver.By.name("declaration3"));
});

Given("I have ticked all the boxes", async function() {
  declarataion1.click();
  declarataion2.click();
  declarataion3.click();
});

Given("I have ticked one of the boxes", async function() {
  declarataion1.click();
});

When("I click submit", async function() {
  submitButton = await driver.findElement(webdriver.By.className("css-nyvlzd"));
  await submitButton.submit();
});

Then("I am shown an error", async function() {
  declarationError = await driver.findElement(
    webdriver.By.className("css-jdwgdl")
  );
  declarationErrorText = await declarationError.getText();
  console.log("First Line Error Text", declarationErrorText);
  assert.equal(
    declarationErrorText,
    "You must tick all the declarations before continuing",
    "error message doesnt match"
  );
});

Then("I am directed to the application complete page", async function() {
  currentUrl = await driver.getCurrentUrl();
  console.log("THIS IS THE URL", currentUrl);
  assert.equal(
    currentUrl,
    "http://localhost:3000/application-complete",
    "URLs don't match"
  );
});

Then("my box is still ticked", async function() {
  declarataion1 = driver.findElement(webdriver.By.name("declaration1"));
  boxSelected = await declarataion1.isSelected();
  console.log("box selected", boxSelected);
  assert.equal(boxSelected, true, "box isn't selected");
});
