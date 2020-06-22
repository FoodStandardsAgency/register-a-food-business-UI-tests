import getSelector from "../../pageObjects/page";

/**
 * Clear a given input field (placeholder for WDIO's clearElement)
 * @param  {String}   selector Element selector
 */
export default (selector) => {
    selector = getSelector(selector);
    $(selector).clearValue();
};
