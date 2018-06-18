const assert = require("assert");
const { Given, When, Then, setDefaultTimeout, After, Before } = require("cucumber");
setDefaultTimeout(60 * 1000);
//const { Builder, By, until, Key } = require("selenium-webdriver");

const webdriver = require("selenium-webdriver");
let driver;

require("dotenv").config();

// buttons
let saveContinueButton;

//form fields
let establishmentFirstLine;
let establishmentPostCode;
let establishmentTradingName;
let operatorFirstName;
let operatorLastName;

//validdetails
let validPostCode = "W11 4ET";
let validFirstLine = "Example Establishment Address";
let validFirstName = "Joe";
let validLastName = "Brady";
let validTradingName = "Anishas Awful Avocados";

//invaliddetails
let invalidPostCode = "notapostcode";
let invalidTradingName = "§§§§§";
let invalidFirstName = "§§";
let invalidLastName = "§§±±";
let nothing = "";

//current url
let urltest;
let previousUrl;
let currentUrl;

//error
let error;
const errorCss = "css-jdwgdl";
const tradingNameErrorText = "Not a valid establishment trading name";
const firstNameErrorText = "Not a valid first name";
const lastNameErrorText = "Not a valid last name";
const postCodeErrorText = "Not a valid postcode";
const firstLineErrorText = "Not a valid first line of address";

////// GENERAL //////

Before(async () => {
  driver = await new webdriver.Builder().forBrowser("chrome").build();
});

After(async () => {
  return driver.quit();
});

When("I click save and continue", async () => {
  previousUrl = await driver.getCurrentUrl();
  saveContinueButton = await driver.findElement(webdriver.By.className("css-nyvlzd"));
  await saveContinueButton.submit();
});

Then("I am taken to another page", async () => {
  currentUrl = await driver.getCurrentUrl();
  assert.notEqual(
    currentUrl,
    previousUrl,
    "URLs do match"
  );
});

////// ESTABLISHMENT TRADING NAME //////

Given("I am on the establishment trading name page", async () => {
  await driver.get(
    `http://${process.env.URLBASE}${process.env.ESTABLISHMENTTRADINGNAMEPAGE}`
  );
  establishmentTradingName = await driver.findElement(
    webdriver.By.name("establishment_trading_name")
  );
});

When("I put in a valid establishment trading name", async () => {
  await establishmentTradingName.sendKeys(validTradingName);
});

When("I put in an invalid establishment trading name", async () => {
  await establishmentTradingName.sendKeys(invalidTradingName);
});

Then("I am shown the trading name error", async () => {
  const tradingNameError = await driver.findElement(
    webdriver.By.className(errorCss)
  );
  const errorText = await tradingNameError.getText();
  assert.equal(
    errorText,
    tradingNameErrorText,
    "Trading name error text doesn't match"
  );
});

Then("the invalid trading name is still there", async () => {
  establishmentTradingName = await driver.findElement(
    webdriver.By.name("establishment_trading_name")
  );
  const tradingNameText = await establishmentTradingName.getAttribute("value");
  assert.equal(tradingNameText, invalidTradingName, "Trading name no longer there");
});

////// OPERATOR NAME ////// 

Given("I am on the operator name page", async () => {
  await driver.get(
    `http://${process.env.URLBASE}${process.env.OPERATORNAMEPAGE}`
  );
  operatorFirstName = driver.findElement(
    webdriver.By.name("operator_first_name")
  );
  operatorLastName = driver.findElement(
    webdriver.By.name("operator_last_name")
  );
});

When("I put a valid first and middle name in", async () => {
  await operatorFirstName.sendKeys(validFirstName);
});

When("I put a valid last name in", async () => {
  await operatorLastName.sendKeys(validLastName);
});

When("I put an invalid first and middle name in", async () => {
  await operatorFirstName.sendKeys(invalidFirstName);
});

When("I put an invalid last name in", async () => {
  await operatorLastName.sendKeys(invalidLastName);
});

Then("I am shown the first name error", async () => {
  const firstNameError = await driver.findElement(
    webdriver.By.className(errorCss)
  );
  const errorText = await firstNameError.getText();
  assert.equal(
    errorText,
    firstNameErrorText,
    "First name error text doesn't match"
  );
});

Then("I am shown the last name error", async () => {
  const lastNameError = await driver.findElement(
    webdriver.By.className(errorCss)
  );
  const errorText = await lastNameError.getText();
  assert.equal(
    errorText,
    lastNameErrorText,
    "Last name error text doesn't match"
  );
});

Then("I am shown first and last name error messages", async () => {
  const errors = await driver.findElements(
    webdriver.By.className(errorCss)
  );
  const firstNameError = await errors[0].getText();
  const lastNameError = await errors[1].getText();
  assert.equal(
    firstNameError,
    firstNameErrorText,
    "First name error text doesn't match"
  );
  assert.equal(
    lastNameError,
    lastNameErrorText,
    "Last name error text doesn't match"
  );
});

////// ESTABLISHMENT ADDRESS ////// 

Given("I am on the establishment address page", async function() {
  await driver.get(
    `http://${process.env.URLBASE}${process.env.ESTABLISHMENTADDRESSPAGE}`
  );
  establishmentFirstLine = await driver.findElement(
    webdriver.By.name("establishment_first_line")
  );
  establishmentPostCode = await driver.findElement(
    webdriver.By.name("establishment_postcode")
  );
});

When("I put a valid Establishment first line in", async function() {
  await establishmentFirstLine.sendKeys(validFirstLine);
});

When("I put a valid post code in", async function() {
  await establishmentPostCode.sendKeys(validPostCode);
});

When("I put an invalid post code in", async function() {
  await establishmentPostCode.sendKeys("notapostcode");
});

Then("the valid Establishment first line is still there", async function() {
  var currentFirstLine = await driver
    .findElement(webdriver.By.name("establishment_first_line"))
    .getAttribute("value");
  assert.equal(currentFirstLine, validFirstLine, "text is no longer there");
});

Then("the invalid PostCode is still there", async function() {
  currentPostCode = await driver
    .findElement(webdriver.By.name("establishment_postcode"))
    .getAttribute("value");
  assert.equal(currentPostCode, invalidPostCode, "text is no longer there");
});

Then("an error appears telling me my postcode is invalid", async function() {
  //the following works but using classname, which isnt ideal as is likely to change
  postCodeError = await driver.findElement(
    webdriver.By.className("css-jdwgdl")
  );
  const errorText = await postCodeError.getText();
  assert.equal(
    errorText,
    postCodeErrorText,
    "Postcode error text doesn't match"
  );
});

Then("an error appears telling me my first line is invalid", async function() {
  //the following works but using classname, which isnt ideal as is likely to change
  firstLineError = await driver.findElement(
    webdriver.By.className("css-jdwgdl")
  );
  const errorText = await firstLineError.getText();
  assert.equal(
    errorText,
    firstLineErrorText,
    "First line error text doesn't match"
  );
});

Then("the valid PostCode is still there", async function() {
  currentPostCode = await driver
    .findElement(webdriver.By.name("establishment_postcode"))
    .getAttribute("value");
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
  assert.notEqual(theUrl, "http://localhost:3000/", "URLs match");
});

////////SUBMIT REGISTRATION ////

require("dotenv").config();
var declaration1;
var declaration2;
var declaration3;

var boxSelected;

Given("I am on the declaration page", async function() {
  await driver.get(`http://${process.env.URLBASE}${process.env.DECLARATION}`);
  declaration1 = driver.findElement(webdriver.By.name("declaration1"));
  declaration2 = driver.findElement(webdriver.By.name("declaration2"));
  declaration3 = driver.findElement(webdriver.By.name("declaration3"));
});

Given("I have ticked all the boxes", async function() {
  await declaration1.click();
  await declaration2.click();
  await declaration3.click();
});

Given("I have ticked one of the boxes", async function() {
  await declaration1.click();
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
  assert.equal(
    declarationErrorText,
    "You must tick all the declarations before continuing",
    "error message doesnt match"
  );
});

Then("I am directed to the application complete page", async function() {
  currentUrl = await driver.getCurrentUrl();
  assert.equal(
    currentUrl,
    "http://localhost:3000/application-complete",
    "URLs don't match"
  );
});

Then("my box is still ticked", async function() {
  declaration1 = driver.findElement(webdriver.By.name("declaration1"));
  boxSelected = await declaration1.isSelected();
  assert.equal(boxSelected, true, "box isn't selected");
});

///////// REGISTRATION SUMMARY /////////

Given("I am on the registration summary page", async () => {
  await driver.get(`http://${process.env.URLBASE}${process.env.SUMMARY}`);
});

Given("I have filled out the data in the previous sections", async () => {
  await driver.get(`http://${process.env.URLBASE}${process.env.ESTABLISHMENTTRADINGNAMEPAGE}`);
  establishmentTradingName = await driver.findElement(
    webdriver.By.name("establishment_trading_name")
  );
  await establishmentTradingName.sendKeys(validTradingName);
  saveContinueButton = await driver.findElement(webdriver.By.className("css-nyvlzd"));
  await saveContinueButton.submit();
});

Then("I am taken to the declaration page", async () => {
  currentUrl = await driver.getCurrentUrl();
  assert.equal(
    currentUrl,
    `http://${process.env.URLBASE}${process.env.DECLARATION}`,
    "URL is not declaration"
  );
});

Then("The data I entered should be displayed", async() => {
  const summaryTradingName = await driver.findElement(
    webdriver.By.id("establishment_trading_name")
  ).getText();
  assert.equal(summaryTradingName, validTradingName, "Trading name does not match");
});

Then("The data I did not enter should not be displayed", async() => {
  let summaryTradingName;
  try {
    summaryTradingName = await driver.findElement(
      webdriver.By.id("operator_name")
    );
  } catch(err) {
    assert.equal(err.message.split(":")[0], 'no such element', "Operator name is displayed");
  }
});
