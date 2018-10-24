@edit_registration_summary_SDB-157
Feature: As Samantha I need to be able to edit details in the summary of my registration info before I submit it, so that I can assure everything is accurate and change details if needed

  Scenario Outline:
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    When I click on the element <changeButton>
    Then I expect the url to contain <urlText>
    And I expect that element <elementToChange> contains the text <originalContent>
    And I expect that element "commonElements.backButton" is not visible
    When I set <changedContent> to the inputfield <elementToChange>
    And I click on the element "opContactDetails.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element <elementToChange> contains the text <changedContent>

    Examples:
      | changeButton                              | urlText                              | elementToChange                     | originalContent   | changedContent         |
      | "registrationSummary.changeOperatorEmail" | "operator-contact-details?edit=on"   | "opContactDetails.emailAddress"     | "email@email.com" | "changed@email.com"    |
      | "registrationSummary.changeTradingName"   | "establishment-trading-name?edit=on" | "estabTradingName.tradingNameInput" | "Trading name"    | "Changed Trading Name" |

  @SDB-157_happy_path
  Scenario: no changes needed to summary page
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    When I click on the element "registrationSummary.button"
    Then I expect the url to contain "declaration"


  @SDB-157_editing_with_error
  Scenario: editing operator email and testing error validation
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    When I click on the element "registrationSummary.changeOperatorEmail"
    Then I expect the url to contain "operator-contact-details?edit=on"
    And I expect that element "opContactDetails.emailAddress" contains the text "email@email.com"
    And I expect that element "commonElements.backButton" is not visible
    When I set "±±±" to the inputfield "opContactDetails.emailAddress"
    And I click on the element "opContactDetails.button"
    Then I expect that element "opContactDetails.error" contains the text "Not a valid email address"
