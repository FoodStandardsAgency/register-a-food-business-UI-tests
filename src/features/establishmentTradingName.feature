@establishment_trading_name
Feature: Establishment Trading Name

Establishment address section validation

    @happy_path_SDB-4
    Scenario: happy path
        Given I open the url "establishment-trading-name"
        When I set "Test Trading Name" to the inputfield "estabTradingName.tradingNameInput"
        And I click on the element "estabTradingName.button"
        Then I expect the url to not contain "establishment-trading-name"

    @incomplete_form_SDB-4
    Scenario: user does not input a trading name
        Given I open the url "/cleansession"
        And I open the url "establishment-trading-name"
        When I click on the element "estabTradingName.button"
        Then I expect that element "estabTradingName.error" contains the text "Not a valid establishment trading name"

    @invalid_trading_name_SDB-4
    Scenario: Invalid Trading Name
        Given I open the url "/cleansession"
        And I open the url "establishment-trading-name"
        When I set "±±§§§" to the inputfield "estabTradingName.tradingNameInput"
        When I click on the element "estabTradingName.button"
        Then I expect that element "estabTradingName.error" contains the text "Not a valid establishment trading name"
        And I expect that element "estabTradingName.tradingNameInput" contains the text "±±§§§"
