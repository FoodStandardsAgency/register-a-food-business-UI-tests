@registration_summary
Feature: Summary Page

  @SDB-8_happy_path_navigation
  Scenario: navigate to declaration page
    Given I open the url "http://localhost:3000/registration-summary"
    When I click on the element "submitRegistration.button"
    Then I expect that the url is "http://localhost:3000/declaration"

  @SDB-8_entered_data
  Scenario: data is displayed

    Given I open the url "http://localhost:3000/establishment-trading-name"
    And I set "Test Trading Name" to the inputfield "estabTradingName.tradingNameInput"
    And I click on the element "estabTradingName.button"
    When I open the url "http://localhost:3000/registration-summary"
    Then I expect that element "registrationSummary.tradingName" contains the text "Test Trading Name"


  @SDB-8_missing_data
  Scenario: missing data not displayed
    Given I open the url "http://localhost:3000/establishment-trading-name"
    And I set "Test Trading Name" to the inputfield "estabTradingName.tradingNameInput"
    And I click on the element "estabTradingName.button"
    When I open the url "http://localhost:3000/registration-summary"
    Then I expect that element "registrationSummary.operatorFirstName" is not visible

