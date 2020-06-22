import getSelector from "../../pageObjects/page";
/**
 * Check if the given elements contains text
 * @param  {String}   elementType   Element type (element or button)
 * @param  {String}   selector       Element selector
 * @param  {String}   falseCase     Whether to check if the content contains
 *                                  the given text or not
 * @param  {String}   expectedText  The text to check against
 */
export default (elementType, selector, falseCase, expectedText) => {
    selector = getSelector(selector);
    /**
     * The command to perform on the browser object
     * @type {String}
     */
    let command = 'getValue';

    /**
     * The text of the element
     * @type {String}
     */
    const elem = $(selector);
    elem.waitForExist();

    if (
        ['button', 'container'].includes(elementType)
        || elem.getAttribute('value') === null
    ) {
        command = 'getText';
    }

    /**
     * False case
     * @type {Boolean}
     */
    let boolFalseCase;

    /**
     * The expected text
     * @type {String}
     */
    let stringExpectedText = expectedText;


    const text = elem[command]();

    if (typeof expectedText === 'undefined') {
        stringExpectedText = falseCase;
        boolFalseCase = false;
    } else {
        boolFalseCase = (falseCase === ' not');
    }

    if (boolFalseCase) {
        expect(text).not.toContain(stringExpectedText);
    } else {
        expect(text).toContain(stringExpectedText);
    }
};
