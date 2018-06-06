@establishment_address
Feature: Establishment Address

   Establishment address section validation

   @happy_path
   Scenario: testing happy path
    Given I have opened a new window 
    And I am on the establishment address page
    When I put a valid Establishment first line in
    And I put a valid post code in
    And I press save and continue
    Then I am taken to another page
    And it closes the window

    @invalid_postcode
    Scenario: Invalid Postcode
    
    Given I have opened a new window 
    And I am on the establishment address page
    When I put a valid Establishment first line in
    And I put an invalid post code in
    And I press save and continue
    Then an error appears telling me my postcode is invalid
    And the valid Establishment first line is still there
    And the invalid PostCode is still there
    And it closes the window

    @invalid_firstline
    Scenario: Valid Postcode and not putting in first line
    Given I have opened a new window 
    And I am on the establishment address page
    When I put a valid post code in
    And I press save and continue
    Then an error appears telling me my first line is invalid
    And the valid PostCode is still there
     And it closes the window






