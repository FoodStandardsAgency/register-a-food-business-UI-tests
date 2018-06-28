@registration_role_SDB-54
Feature: Registration Role SDB-54

Operator Type section validation


    @change_registration_role_SDB-54
    Scenario: able to change registration role
        Given I reload my session
        And I open the url "http://localhost:3000/registration-role"
        When I click on the element "regRole.soleTrader"
        And I click on the element "regRole.partnership"
        Then I expect that element "regRole.partnership" is selected
        And I expect that checkbox "regRole.soleTrader" is not checked

    @happy_path_sole_trader_SDB-54
    Scenario: happy path for registration role sole trader
        Given I reload my session
        And I open the url "http://localhost:3000/registration-role"
        When I click on the element "regRole.soleTrader"
        And I click on the element "regRole.button"
        Then I expect that the url is "http://localhost:3000/operator-name"

    @happy_path__partnership_SDB-54
    Scenario: happy path for registration role partnership
        Given I reload my session
        And I open the url "http://localhost:3000/registration-role"
        When I click on the element "regRole.partnership"
        And I click on the element "regRole.button"
        Then I expect that the url is "http://localhost:3000/operator-name"

    @happy_path__representative_SDB-54
    Scenario: happy path for registration role representative
        Given I reload my session
        And I open the url "http://localhost:3000/registration-role"
        When I click on the element "regRole.representative"
        And I click on the element "regRole.button"
        Then I expect that the url is "http://localhost:3000/operator-type"

    @not_selected_registration_role_SDB-54
    Scenario: error shows when no registration is selected
        Given I reload my session
        And I open the url "http://localhost:3000/registration-role"
        When I click on the element "regRole.button"
        Then I expect that element "regRole.error" contains the text "You must select a role before continuing"


    @can_not_deselect_role_SDB-54
    Scenario: I can not deselect a role
        Given I reload my session
        And I open the url "http://localhost:3000/registration-role"
        When I click on the element "regRole.soleTrader"
        And I click on the element "regRole.soleTrader"
        Then I expect that element "regRole.soleTrader" is selected



