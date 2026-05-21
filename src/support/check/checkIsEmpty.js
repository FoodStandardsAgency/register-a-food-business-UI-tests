import checkContainsAnyText from "./checkContainsAnyText.js";
import getSelector from "../../pageObjects/page.js";

export default async (elementType, element, falseCase) => {
  element = await getSelector(element);
  let newFalseCase = true;

  if (typeof falseCase === "function") {
    newFalseCase = false;
  } else if (falseCase === " not") {
    newFalseCase = false;
  }

  await checkContainsAnyText(elementType, element, newFalseCase);
};
