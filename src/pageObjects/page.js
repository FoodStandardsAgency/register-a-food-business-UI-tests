let firstpage = require("./first.page.js");
let estabAddress = require("./establishmentAddress.page.js");
let estabTradingName = require("./establishmentTradingName.page.js");
let opContactDetails = require("./operatorContactDetails.page.js");
let opContactName = require("./operatorContactName.page.js");
let submitRegistration = require("./submitRegistration.page");
let registrationSummary = require("./registrationSummary.page");

function getSelector(elem) {
    return eval(elem);
}

module.exports = getSelector;
