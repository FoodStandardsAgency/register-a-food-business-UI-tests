import checkContainsAnyText from "./checkContainsAnyText";
import getSelector from "../../pageObjects/page";

module.exports = (elementType, element, falseCase) => {
    element = getSelector(element);
    let newFalseCase = true;

    if (typeof falseCase === "function") {
        newFalseCase = false;
    } else if (falseCase === " not") {
        newFalseCase = false;
    }

    checkContainsAnyText(elementType, element, newFalseCase);
};
