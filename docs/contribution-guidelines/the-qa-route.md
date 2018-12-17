<<<<<<< HEAD
# Injecting Data via the QA Route

## Summary

You can inject data via the QA Route custom step definition. Using this in a scenario allows you to jump to any page in the form with pre-injected data, as if the form had been completed up to that point.

## How/When/Why the QA route is used in a feature file

**How to use it:**
The step definition can be found in the [given steps file](../../src/steps/given.js) . Here you can see the regex format for writing a step in a feature file: `Given I go to a special QA page at url "([^"]*)?" with injected "([^"]*)?" data`.
You must remember to start the url path with "/qa", include the council name, url path and name of the dataset that you want to inject:
`Given I go to a special QA page at url "/qa/<local-council>/<url-path>" with injected "<dataset-name>" data`

For example:
`Given I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data`

Before running any scenario that involves the QA route, you must remember to populate the .env file with the QA key. This must be handed over from existing developers.

**Why:**
The QA Route makes it much easier to inject data and skip pages. For example, one of the use cases is to test a scenario on the registration summary page. Here you would want to skip to the registration summary page with all the registration data, and then to change data from there. By injecting the data, it means you don't have to do steps for going through all the preceding pages. You can also have multiple datasets, so you can choose which path the 'user' has taken to get there.

**When:**
Below are a set of scenario you may want to test using the QA route, where a 'user':

- gets to the registration summary and wants to change their operator email address
- gets to the declaration page and only checks one declaration box before trying to submit
- gets to the declaration page, checks all the boxes, submits and gets to the summary confirmation page where they can see their confirmation number
- gets to the registration summary having filled it in with trading days as every day and changes it to trading some days
- gets to the registration summary and wants to change their operator type from a representative of a charity to a sole trader
  all without having to go through the previous pages

## How it works

The QA route uses [`injectDataIntoRegSummary.js`](../../src/support/action/injectDataIntoRegSummary.js). Within this is
`Datasets`, an object that contains nested objects that are the datasets that can be fed into the QA route step definition. If you want to test a scenario with different data/that has followed a different path to the existing QA route scenarios then you will need to create a new dataset.

### Creating a new dataset:

1. Create another object within the `datasets` object
2. Populate the fields such that the key is the same as the entries in the [validation schema](https://github.com/FoodStandardsAgency/register-a-food-business-service/blob/master/src/services/validation.schema.js).
3. If the scenario involves submitting then you will need to make sure the dataset contains all of the required data. You should refer to the validation schema to ensure you have included a minimum data set.

[`injectDataIntoRegSummary.js`](../../src/support/action/injectDataIntoRegSummary.js) works by injecting the data via inputting the data fields from the dataset into the url query string. It also inputs the QA key into the query. The QA key must be populated in your .env file. For example, if you wanted to inject the operator first name and last name field, the url with its queries would look like:

`/qa/mid-and-east-antrim/declaration?operator_first_name=Fred&operator_last_name=Bloggs&QA_KEY=exampleqakey`
=======
## The QA route
>>>>>>> 6dccb7f4adc6b6cc1e15ada186d907253312c708
