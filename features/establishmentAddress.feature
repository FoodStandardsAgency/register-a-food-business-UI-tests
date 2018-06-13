@establishment_address
Feature: Establishment Address

  Establishment address section validation

  @happy_path
  Scenario: testing happy path
    Given I am on the establishment address page
    When I put a valid Establishment first line in
    And I put a valid post code in
    And I click save and continue
    Then I am taken to another page

  @invalid_postcode
  Scenario: Invalid Postcode
    Given I am on the establishment address page
    When I put a valid Establishment first line in
    And I put an invalid post code in
    And I click save and continue
    Then an error appears telling me my postcode is invalid
    And the valid Establishment first line is still there
    And the invalid PostCode is still there

  @invalid_firstline
  Scenario: Valid Postcode and not putting in first line
    Given I am on the establishment address page
    When I put a valid post code in
    And I click save and continue
    Then an error appears telling me my first line is invalid
    And the valid PostCode is still there






