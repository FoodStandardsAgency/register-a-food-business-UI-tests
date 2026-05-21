@SDB-828_retroactive_to_proactive
Feature: Change retroactive trading start date to a proactive date

  @SDB-828_retroactive_to_proactive
  Scenario: Change retroactive trading start date to a proactive date
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/registration-summary" with injected "registration-summary" data
    When I click on the element "registrationSummary.changeTradingStartDate"
    Then I expect the url to contain "establishment-opening-status?edit=establishment-opening-status"
    And I expect that element "estabOpeningDate.alreadyTrading" is selected
    When I click on the element "estabOpeningDate.notTrading"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "establishment-opening-date-proactive?edit=establishment-opening-status"
    When I set "01" to the inputfield "estabOpeningDate.day"
    And I set "01" to the inputfield "estabOpeningDate.month"
    And I set "2050" to the inputfield "estabOpeningDate.year"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.tradingStartDate" contains the text "01 Jan 2050"
