import getSelector from "../../pageObjects/page";
/**
 * Check if the given selector is enabled
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Whether to check if the given selector
 *                              is enabled or not
 */
export default (selector, falseCase) => {
    selector = getSelector(selector);
    /**
     * The enabled state of the given selector
     * @type {Boolean}
     */

    const elements = $(selector);
    elements.waitForExist({reverse:falseCase});

    const isEnabled = elements.isEnabled();

    if (falseCase) {
        expect(isEnabled).not.toEqual(
            true,
            `Expected element "${selector}" not to be enabled`
        );
    } else {
        expect(isEnabled).toEqual(
            true,
            `Expected element "${selector}" to be enabled`
        );
    }
};
