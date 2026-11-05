/**
 * Wait for the given element to become visible
 * @param  {String}   selector      Element selector
 * @param  {String}   falseCase Whether or not to expect a visible or hidden
 *                              state
 *
 * @todo  merge with waitfor
 */
export default async (selector, falseCase) => {
  /**
   * Maximum number of milliseconds to wait for
   * @type {Int}
   */
  const ms = 20000;

  await $(selector).then((e) => e.waitForDisplayed(ms, !!falseCase));
};
