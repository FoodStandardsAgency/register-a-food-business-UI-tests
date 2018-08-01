const commonElements = require("./commonElements.page.js");

const firstpage = require("./first.page.js");

const estabAddress = require("./establishmentAddress.page.js");
const estabAddressType = require("./establishmentAddressType.page.js");
const estabTradingName = require("./establishmentTradingName.page.js");
const estabContactDetails = require("./establishmentContactDetails.page.js");
const estabOpeningDate = require("./establishmentOpeningDate.page.js");

const regRole = require("./registrationRole.page.js");

const opType = require("./operatorType.page.js");
const opContactDetails = require("./operatorContactDetails.page.js");
const opContactName = require("./operatorContactName.page.js");
const opAddress = require("./operatorAddress.page.js");
const repOpContactDetails = require("./representativeOperatorContactDetails.page.js");

const custType = require("./customerType.page.js");

const companyDetails = require("./limitedCompanyDetails.page.js");
const charityDetails = require("./charityDetails.page.js");

const submitRegistration = require("./submitRegistration.page.js");
const registrationSummary = require("./registrationSummary.page.js");
const summaryConfirmation = require("./summaryConfirmation.page.js");

function getSelector(elem) {
    return eval(elem);
}

module.exports = getSelector;
