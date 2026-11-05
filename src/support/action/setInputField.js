import getSelector from "../../pageObjects/page.js";
import checkIfElementExists from "../lib/checkIfElementExists.js";

/**
 * Set the value of the given input field to a new value or add a value to the
 * current selector value
 * @param  {String}   method  The method to use (add or set)
 * @param  {String}   value   The value to set the selector to
 * @param  {String}   selector Element selector
 */
export default async (method, value, selector) => {
  selector = getSelector(selector);

  /**
   * The command to perform on the browser object (addValue or setValue)
   * @type {String}
   */
  const command = method === "add" ? "addValue" : "setValue";

  let checkValue = value;
  if (!value) {
    checkValue = "";
  }

  await checkIfElementExists(selector, false);
  const elements = await $(selector);
  await elements.scrollIntoView();
  await elements[command](checkValue);
};
