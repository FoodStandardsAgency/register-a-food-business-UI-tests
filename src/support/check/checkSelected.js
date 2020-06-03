import getSelector from "../../pageObjects/page";
/**
 * Check the selected state of the given element
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Whether to check if the element is elected or
 *                              not
 */
export default (selector, falseCase) => {
    selector = getSelector(selector);
    /**
     * The selected state
     * @type {Boolean}
     */
    let elem = $(selector);
    elem.waitForExist();

    const isSelected = elem.isSelected();

    if (falseCase) {
        expect(isSelected)
            .not.toEqual(true, `"${selector}" should not be selected`);
    } else {
        expect(isSelected)
            .toEqual(true, `"${selector}" should be selected`);
    }
};
