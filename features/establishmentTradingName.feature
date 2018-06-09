@establishment_trading_name
Feature: Establishment Trading Name

Establishment address section validation

    @happy_path_SDB-4
    Scenario: testing happy path
        Given I have opened a new window
        And I am on the establishment trading name page
        When I put in a valid establishment trading name
        And I click save and continue
        Then I am taken to a new page
        And it closes the window

    @incomplete_form_SDB-4
    Scenario: testing when user does not input a trading name
        Given I have opened a new window
        And I am on the establishment trading name page
        When I click save and continue
        Then I am shown an error
        And it closes the window

    @invalid_trading_name_SDB-4
    Scenario: Invalid Trading Name

        Given I have opened a new window
        And I am on the establishment trading name page
        When I put an invalid establishment trading name in
        And I press save and continue
        Then an error appears telling me my trading name is invalid
        And the invalid trading name is still there
        And it closes the window





