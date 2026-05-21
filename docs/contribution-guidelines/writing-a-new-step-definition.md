# Writing a new step definition

1. Open the step file that matches your keyword:
   - `src/steps/given.js` for `Given` steps
   - `src/steps/when.js` for `When` steps
   - `src/steps/then.js` for `Then` steps

2. Add a new entry with a regex and a handler.

    Example (`When` step):

    ```js
    import myAction from "../support/action/myAction.js";
    When(
    /^I do something custom "([^"]*)"$/,
    { wrapperOptions: { retry: 2 } },
    myAction
    );

3. Implement the handler in the correct support directory:
    src/support/action/ for Given and When steps (actions)
    src/support/check/ for Then steps (assertions)

4. Keep step text reusable and avoid page-specific details.
5. Reuse existing support functions when possible.
6. If the step needs a new selector, add it to src/pageObjects.
7. Run the new step by executing the relevant feature file or suite.