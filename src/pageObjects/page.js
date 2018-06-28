let firstpage = require("./first.page.js");

let estabAddress = require("./establishmentAddress.page.js");
let estabTradingName = require("./establishmentTradingName.page.js");

let regRole = require("./registrationRole.page.js");

let opContactType = require("./operatorType.page.js");
let opContactDetails = require("./operatorContactDetails.page.js");
let opContactName = require("./operatorContactName.page.js");

let companyDetails = require("./limitedCompanyDetails.page.js");
let charityDetails = require("./charityDetails.page.js");

let submitRegistration = require("./submitRegistration.page.js");
let registrationSummary = require("./registrationSummary.page.js");

function getSelector(elem) {
    return eval(elem);
}

module.exports = getSelector;
