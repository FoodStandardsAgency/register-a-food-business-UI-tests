import getSelector from "../../pageObjects/page.js";

/**
 * Clear a given input field (placeholder for WDIO's clearElement)
 * @param  {String}   selector Element selector
 */
const clearInputField = async (selector) => {
  selector = getSelector(selector);
  await $(selector).then((e) => e.clearValue());
};

export default clearInputField;
