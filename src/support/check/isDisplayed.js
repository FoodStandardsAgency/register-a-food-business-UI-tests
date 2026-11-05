import getSelector from "../../pageObjects/page.js";

/**
 * Check if the given element is (not) visible
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Check for a visible or a hidden element
 */
export default async (selector, falseCase) => {
  selector = getSelector(selector);

  /**
   * Visible state of the give element
   * @type {String}
   */
  const isDisplayed = await $(selector).then((e) => e.isDisplayed());

  if (falseCase) {
    expect(isDisplayed).not.toEqual(
      true,
      `Expected element "${selector}" not to be displayed`
    );
  } else {
    expect(isDisplayed).toEqual(
      true,
      `Expected element "${selector}" to be displayed`
    );
  }
};
