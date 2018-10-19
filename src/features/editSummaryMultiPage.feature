@SDB-828_change_trading_start_date
Feature: As Samantha I need to be able to change the trading date of my registration from the summary page, so that I can register using the correct details

  @SDB-828_retroactive_to_retroactive
  Scenario: Change retroactive trading start date to another retroactive date
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    When I click on the element "registrationSummary.changeTradingStartDate"
    Then I expect the url to contain "establishment-opening-status?edit=on"
    And I expect that element "estabOpeningDate.alreadyTrading" is selected
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "establishment-opening-date-retroactive?edit=on"
    And I expect that element "estabOpeningDate.day" is not empty
    And I expect that element "estabOpeningDate.month" is not empty
    And I expect that element "estabOpeningDate.year" is not empty
    When I set "05" to the inputfield "estabOpeningDate.day"
    And I set "02" to the inputfield "estabOpeningDate.month"
    And I set "1990" to the inputfield "estabOpeningDate.year"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.tradingStartDate" contains the text "05 Feb 1990"

  @SDB-828_retroactive_to_proactive
  Scenario: Change retroactive trading start date to a proactive date
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    When I click on the element "registrationSummary.changeTradingStartDate"
    Then I expect the url to contain "establishment-opening-status?edit=on"
    And I expect that element "estabOpeningDate.alreadyTrading" is selected
    When I click on the element "estabOpeningDate.notTrading"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "establishment-opening-date-proactive?edit=on"
    And I expect that element "estabOpeningDate.day" is empty
    And I expect that element "estabOpeningDate.month" is empty
    And I expect that element "estabOpeningDate.year" is empty
    When I set "01" to the inputfield "estabOpeningDate.day"
    And I set "01" to the inputfield "estabOpeningDate.month"
    And I set "2050" to the inputfield "estabOpeningDate.year"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.tradingStartDate" contains the text "01 Jan 2050"

  @SDB-828_retroactive_proactive_back_navigation
  Scenario: Change retroactive to proactive, continue, then navigate back and change to retroactive
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    When I click on the element "registrationSummary.changeTradingStartDate"
    Then I expect the url to contain "establishment-opening-status?edit=on"
    And I expect that element "commonElements.backButton" is not visible
    And I expect that element "estabOpeningDate.alreadyTrading" is selected
    When I click on the element "estabOpeningDate.notTrading"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "establishment-opening-date-proactive?edit=on"
    And I expect that element "commonElements.backButton" is visible
    When I click on the element "commonElements.backButton"
    Then I expect the url to contain "establishment-opening-status?edit=on"
    And I expect that element "commonElements.backButton" is not visible
    And I expect that element "estabOpeningDate.notTrading" is selected
    When I click on the element "estabOpeningDate.alreadyTrading"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "establishment-opening-date-retroactive?edit=on"
    And I expect that element "commonElements.backButton" is visible
    And I expect that element "estabOpeningDate.day" is empty
    And I expect that element "estabOpeningDate.month" is empty
    And I expect that element "estabOpeningDate.year" is empty
    When I set "05" to the inputfield "estabOpeningDate.day"
    And I set "02" to the inputfield "estabOpeningDate.month"
    And I set "1990" to the inputfield "estabOpeningDate.year"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.tradingStartDate" contains the text "05 Feb 1990"
