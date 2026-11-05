@trading_standards_check_section
Feature: Trading standards checks Page

    @add_trading_standard_check_values_happy_path
    Scenario: Adding values to the trading standard checks section
        Given I open the adminportal "/"
        Then I expect that element "tradingStandardsChecks.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "tradingStandardsChecks.enterButton"
        Then I expect the url to contain "la"
        When I set "test" to the inputfield "tradingStandardsChecks.searchField"
        And I click on the element "tradingStandardsChecks.searchButton"
        And I click on the element "tradingStandardsChecks.editButton"
        Then I expect that element "tradingStandardsChecks.editHeading" contains the text "Edit a Local Authority"
        And I set "5" to the inputfield "tradingStandardsChecks.initialCheckInput"
        And I set "8" to the inputfield "tradingStandardsChecks.regularCheckInput"
        And I click on the element "tradingStandardsChecks.chaseCheckbox"
        When I click on the element "tradingStandardsChecks.button"
        Then I expect that element "tradingStandardsChecks.heading" contains the text "Check details before submit"
        When I click on the element "tradingStandardsChecks.button"
        Then I expect that element "tradingStandardsChecks.successMessage" contains the text "Local authority updated successfuly"

    @check_trading_standard_check_values
    Scenario: Check trading standard checks values have saved
        Given I open the adminportal "/"
        Then I expect that element "tradingStandardsChecks.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "tradingStandardsChecks.enterButton"
        Then I expect the url to contain "la"
        When I set "test" to the inputfield "tradingStandardsChecks.searchField"
        And I click on the element "tradingStandardsChecks.searchButton"
        And I click on the element "tradingStandardsChecks.viewCouncil"
        Then I expect that element "tradingStandardsChecks.viewInitialCheck" contains the text "5"
        Then I expect that element "tradingStandardsChecks.viewRegularCheck" contains the text "8"
        Then I expect that element "tradingStandardsChecks.checkChase" contains the text "Yes"
        
    @reset_chase_checkbox
    Scenario: Resetting the chase checkbox to 'No'
        Given I open the adminportal "/"
        Then I expect that element "tradingStandardsChecks.welcomeTitle" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "tradingStandardsChecks.enterButton"
        Then I expect the url to contain "la"
        When I set "test" to the inputfield "tradingStandardsChecks.searchField"
        And I click on the element "tradingStandardsChecks.searchButton"
        And I click on the element "tradingStandardsChecks.editButton"
        And I click on the element "tradingStandardsChecks.chaseCheckbox"
        When I click on the element "tradingStandardsChecks.button"
        Then I expect that element "tradingStandardsChecks.heading" contains the text "Check details before submit"
        When I click on the element "tradingStandardsChecks.button"
        Then I expect that element "tradingStandardsChecks.successMessage" contains the text "Local authority updated successfuly"
        