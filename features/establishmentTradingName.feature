@establishment_trading_name
Feature: Establishment Trading Name

Establishment address section validation

    @happy_path_SDB-4
    Scenario: happy path
        Given I am on the establishment trading name page
        When I put in a valid establishment trading name
        And I click save and continue
        Then I am taken to another page

    @incomplete_form_SDB-4
    Scenario: user does not input a trading name
        Given I am on the establishment trading name page
        When I click save and continue
        Then I am shown the trading name error

    @invalid_trading_name_SDB-4
    Scenario: Invalid Trading Name
        Given I am on the establishment trading name page
        When I put in an invalid establishment trading name
        And I click save and continue
        Then I am shown the trading name error
        And the invalid trading name is still there





