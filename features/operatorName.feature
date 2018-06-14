@operator_name
Feature: Operator Name

Operator Name section validation

    @happy_path_SDB-35
    Scenario: happy path for Operator Name
        Given I am on the operator name page
        When I put a valid first and middle name in
        And I put a valid last name in
        And I click save and continue
        Then I am taken to another page

    @no_first_name_SDB-35
    Scenario: no first name input
        Given I am on the operator name page
        When I put a valid last name in
        And I click save and continue
        Then I am shown the first name error

    @no_last_name_SDB-35
    Scenario: no last name input
        Given I am on the operator name page
        When I put a valid first and middle name in
        And I click save and continue
        Then I am shown the last name error

    @invalid_last_name_SDB-35
    Scenario: invalid last name input
        Given I am on the operator name page
        When I put a valid first and middle name in
        And I put an invalid last name in
        And I click save and continue
        Then I am shown the last name error

    @invalid_first_name_SDB-35
    Scenario: invalid first name input
        Given I am on the operator name page
        When I put an invalid first and middle name in
        And I put a valid last name in
        And I click save and continue
        Then I am shown the first name error

    @invalid_both_names_SDB-35
    Scenario: invalid first and last name input
        Given I am on the operator name page
        When I put an invalid first and middle name in
        And I put an invalid last name in
        And I click save and continue
        Then I am shown first and last name error messages
