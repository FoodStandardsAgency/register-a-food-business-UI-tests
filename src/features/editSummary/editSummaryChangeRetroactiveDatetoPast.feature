@SDB-828_retroactive_to_retroactive
Feature: Change retroactive trading start date to another retroactive date

  @SDB-828_retroactive_to_proactive
  Scenario: Change retroactive trading start date to another retroactive date
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    When I click on the element "registrationSummary.changeTradingStartDate"
    Then I expect the url to contain "establishment-opening-status?edit=establishment-opening-status"
    And I expect that element "estabOpeningDate.alreadyTrading" is selected
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "establishment-opening-date-retroactive?edit=establishment-opening-status"
    And I expect that element "estabOpeningDate.day" is not empty
    And I expect that element "estabOpeningDate.month" is not empty
    And I expect that element "estabOpeningDate.year" is not empty
    When I set "05" to the inputfield "estabOpeningDate.day"
    And I set "02" to the inputfield "estabOpeningDate.month"
    And I set "1990" to the inputfield "estabOpeningDate.year"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.tradingStartDate" contains the text "05 Feb 1990"