/**
 * Check if the given elements contains text
 * @param  {String}   elementType   Element type (element or button)
 * @param  {String}   selector       Element selector
 * @param  {String}   falseCase     Whether to check if the content contains
 *                                  text or not
 */
export default async (elementType, selector, falseCase) => {
  /**
   * The command to perform on the browser object
   * @type {String}
   */
  let command = "getValue";

  const elem = await $(selector);
  await elem.waitForExist();

  if (elementType === "button" || (await elem.getAttribute("value")) === null) {
    command = "getText";
  }

  /**
   * False case
   * @type {Boolean}
   */
  let boolFalseCase;

  /**
   * The text of the element
   * @type {String}
   */
  const text = await elem[command]();

  if (typeof falseCase === "undefined") {
    boolFalseCase = false;
  } else {
    boolFalseCase = !!falseCase;
  }

  if (boolFalseCase) {
    expect(text).toBe("");
  } else {
    expect(text).not.toBe("");
  }
};
