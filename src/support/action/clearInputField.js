import getSelector from "../../pageObjects/page.js";

/**
 * Clear a given input field (placeholder for WDIO's clearElement)
 * @param  {String}   selector Element selector
 */
const clearInputField = (selector) => {
  selector = getSelector(selector);
  $(selector).clearValue();
};

export default clearInputField;
