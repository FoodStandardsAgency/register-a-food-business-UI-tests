/**
 * Scroll the page to the given element
 * @param  {String}   selector Element selector
 */
export default async (selector) => {
  await $(selector).then((e) => e.scrollIntoView());
};
