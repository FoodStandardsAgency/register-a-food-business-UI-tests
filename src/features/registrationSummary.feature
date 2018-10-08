@registration_summary
Feature: Summary Page

  @SDB-8_happy_path_navigation
  Scenario: navigate to declaration page
    Given I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    When I click on the element "registrationSummary.button"
    Then I expect the url to not contain "registration-summary"

  @SDB-8_missing_data
  Scenario: missing data not displayed
    Given I open the url "/cleansession"
    And I open the url "mid-and-east-antrim/establishment-trading-name"
    And I set "Test Trading Name" to the inputfield "estabTradingName.tradingNameInput"
    And I click on the element "estabTradingName.button"
    When I open the url "mid-and-east-antrim/registration-summary"
    Then I expect that element "registrationSummary.operatorFirstName" is not visible

  @SDB-8_full_data_injection
  Scenario: all possible data is displayed
    Given I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    Then I expect that element "registrationSummary.tradingName" contains the text "Trading name"

