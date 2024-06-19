/**
 * Check if the given element exists in the current DOM
 * @param  {String}   selector  Element selector
 * @param  {String}   falseCase Whether to check if the element exists or not
 */
export default async (selector, falseCase) => {
  /**
   * Elements found in the DOM
   * @type {Object}
   */
  const elements = await $(selector);
  await elements.waitForExist({ reverse: falseCase });
};
