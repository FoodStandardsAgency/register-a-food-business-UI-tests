import checkContainsAnyText from "./checkContainsAnyText.js";
import getSelector from "../../pageObjects/page.js";

export default (elementType, element, falseCase) => {
  element = getSelector(element);
  let newFalseCase = true;

  if (typeof falseCase === "function") {
    newFalseCase = false;
  } else if (falseCase === " not") {
    newFalseCase = false;
  }

  checkContainsAnyText(elementType, element, newFalseCase);
};
