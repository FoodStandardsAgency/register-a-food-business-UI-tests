@trading_standards_check_section
Feature: Trading standards checks Page

    @addtradingstandcheckvalues-happypath
    Scenario: Adding values to the trading standard checks section
        Given I open the adminportal "/"
        Then I expect that element "tradingStandards.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "tradingStandards.enterButton"
        Then I expect the url to contain "la"
        When I set "4295" to the inputfield "tradingStandards.searchField"
        And I click on the element "tradingStandards.editButton"
        Then I expect that element "tradingStandards.editHeading" contains the text "Edit a Local Authority"
        And I set "5" to the inputfield "tradingStandards.initialCheckinput"
        And I set "8" to the inputfield "tradingStandards.regularCheckinput"
        And I click on the element "landingPage.chaseCheckbox"
        When I click on the element "tradingStandards.button"
        Then I expect that element "tradingStandards.heading" contains the text "Check details before submit"
        When I click on the element "tradingStandards.button"
        Then I expect that element "tradingStandards.successMessage" contains the text "Local authority updated successfuly"
        

    @checktradingstandcheckvalues
    Scenario: Check trading standard checks values have saved
    Given I open the adminportal "/"
        Then I expect that element "tradingStandards.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "tradingStandards.enterButton"
        Then I expect the url to contain "la"
        When I set "4295" to the inputfield "tradingStandards.searchField"
        And I click on the element "tradingStandards.viewCouncil"
        Then I expect that element "tradingStandards.viewInitialCheck" contains the text "5"
        Then I expect that element "tradingStandards.viewRegularCheck" contains the text "8"
        Then I expect that element "tradingStandards.chaseCheck" contains the text "Yes"


    @addtradingstandcheckvalues-unhappypath
    Scenario: Entering an invalid character to the trading standard checks section
        Given I open the adminportal "/"
        Then I expect that element "tradingStandards.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "tradingStandards.enterButton"
        Then I expect the url to contain "la"
        When I click on the element "tradingStandards.editButton"
        Then I expect that element "tradingStandards.editHeading" contains the text "Edit a Local Authority"
        And I set "." to the inputfield "tradingStandards.regularCheckinput"
        When I click on the element "tradingStandards.button"
        #Then I expect that element "tradingStandards.error" contains the text "Please enter a number."