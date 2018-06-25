let firstpage = require("./first.page.js");
let estabAddress = require("./establishmentAddress.page.js");

function getSelector(elem) {
    return eval(elem);
}

module.exports = getSelector;
