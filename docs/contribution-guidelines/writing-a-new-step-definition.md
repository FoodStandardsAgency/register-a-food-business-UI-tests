# Writing a new step definition

1. Open `src/steps/given.js`.
2. Find the existing `Given(...)` style steps.
3. Add a new `Given`, `When` or `Then` entry with a regex and a handler.

Example:

```js
import myAction from "../support/action/myAction.js";

Given(
  /^I do something custom "([^"]*)"$/,
  { wrapperOptions: { retry: 2 } },
  myAction
);
```

4. Implement the action in `src/support/action/`.
5. Keep step text reusable and avoid page-specific details.
6. Reuse existing support actions when possible.
7. If the step needs a new selector, add it to `src/pageObjects`.

Run the new step by executing the relevant feature file or suite.
