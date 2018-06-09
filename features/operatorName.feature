@operator_name
Feature: Operator Name

Operator Name section validation

    @happy_path_SDB-35
    Scenario: testing happy path for Operator Name
        Given I have opened a new window
        And I am on the operator name page
        When I put a valid first (and middle) name in
        And I put a valid last name in
        And I click save and continue
        Then I am taken to another page
        And it closes the window

    @no_first_name_SDB-35
    Scenario: testing happy path for Operator Name
        Given I have opened a new window
        And I am on the operator name page
        When I put a valid last name in
        And I click save and continue
        Then I am shown an error #need to change this to be specific
        And it closes the window

    @no_last_name_SDB-35
    Scenario: testing happy path for Operator Name
        Given I have opened a new window
        And I am on the operator name page
        When I put a valid first (and middle) name in
        And I click save and continue
        Then I am shown an error #need to change this to be specific
        And it closes the window

    @invalid_last_name_SDB-35
    Scenario: testing when user input an invalid last name
        Given I have opened a new window
        And I am on the operator name page
        When I put a valid first (and middle) name in
        And I put an invalid last name in
        And I click save and continue
        Then I am shown an error
        And it closes the window

    @invalid_first_name_SDB-35
    Scenario: testing when user input an invalid first name
        Given I have opened a new window
        And I am on the operator name page
        When I put an invalid first (and middle) name in
        And I put a valid last name in
        And I click save and continue
        Then I am shown an error
        And it closes the window
