@SDB-828_retroactive_proactive_back_navigation
Feature: Change retroactive to proactive, continue, then navigate back and change to retroactive

  @SDB-828_retroactive_proactive_back_navigation
  Scenario: Change retroactive to proactive, continue, then navigate back and change to retroactive
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    When I click on the element "registrationSummary.changeTradingStartDate"
    Then I expect the url to contain "establishment-opening-status?edit=establishment-opening-status"
    And I expect that element "commonElements.backButton" does not exist
    And I expect that element "estabOpeningDate.alreadyTrading" is selected
    When I click on the element "estabOpeningDate.notTrading"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "establishment-opening-date-proactive?edit=establishment-opening-status"
    And I expect that element "commonElements.backButton" does exist
    When I click on the element "commonElements.backButton"
    Then I expect the url to contain "establishment-opening-status?edit=establishment-opening-status"
    And I expect that element "commonElements.backButton" does not exist
    And I expect that element "estabOpeningDate.notTrading" is selected
    When I click on the element "estabOpeningDate.alreadyTrading"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "establishment-opening-date-retroactive?edit=establishment-opening-status"
    And I expect that element "commonElements.backButton" does exist
    When I set "05" to the inputfield "estabOpeningDate.day"
    And I set "02" to the inputfield "estabOpeningDate.month"
    And I set "1990" to the inputfield "estabOpeningDate.year"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.tradingStartDate" contains the text "05 Feb 1990"
