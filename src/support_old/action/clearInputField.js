import getSelector from "../../pageObjects/page";
/**
 * Clear a given input field (placeholder for WDIO's clearElement)
 * @param  {String}   element Element selector
 */
module.exports = element => {
    element = getSelector(element);
    browser.clearElement(element);
};
