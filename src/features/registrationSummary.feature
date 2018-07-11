@registration_summary
Feature: Summary Page

  @SDB-8_happy_path_navigation
  Scenario: navigate to declaration page
    Given I open the url "/registration-summary"
    When I click on the element "registrationSummary.button"
    Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/registration-summary"

  @SDB-8_entered_data
  Scenario: data is displayed
    Given I reload my session
    And I open the url "/establishment-trading-name"
    And I set "Test Trading Name" to the inputfield "estabTradingName.tradingNameInput"
    And I click on the element "estabTradingName.button"
    When I open the url "/registration-summary"
    Then I expect that element "registrationSummary.tradingName" contains the text "Test Trading Name"


  @SDB-8_missing_data
  Scenario: missing data not displayed
    Given I reload my session
    And I open the url "/establishment-trading-name"
    And I set "Test Trading Name" to the inputfield "estabTradingName.tradingNameInput"
    And I click on the element "estabTradingName.button"
    When I open the url "/registration-summary"
    Then I expect that element "registrationSummary.operatorFirstName" is not visible

  @SDB-8_full_data_injection
  Scenario: all possible data is displayed
    Given I go to a special QA page at url "https://register-a-food-business-dev.azurewebsites.net/qa/registration-summary" with injected "registration-summary" data
    Then I expect that element "registrationSummary.tradingName" contains the text "Trading name"
# Then I expect that the url is "hadkadada"