Feature: Establishment Address

   Establishment address section validation

   Scenario: testing prototype
    Given that I am on the establishment trading name page and put a name in
    When I press "save and continue" 
    Then I am taken to another page

   Scenario: Happy Path for entering and submitting details
    Given that I have entered my building name and postcode
    When I press "save and continue" 
    Then the data is saved to be submitted at the end of the form

   Scenario: 
    Given I have not entered my building name but I have entered my postcode
    When I click "save and continue"
    Then an error appears telling me to enter my details 

   Scenario: 
    Given I have filled in the post code with invalid characters
    When I click "save and continue"
    Then an error appears telling me to correct my details

   Scenario: 
    Given I have not clicked it yet
    When I click "What is an establishment?"
    Then I am shown more information about an establishment directly below

   Scenario: 
    Given 
    When 
    Then 

