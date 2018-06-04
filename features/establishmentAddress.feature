Feature: Establishment Address

   Establishment address section validation

   Scenario: testing happy path
    Given I am on the establishment address page
    When I put the Establishment first line and post code in and I press "save and continue"
    Then I am taken to another page


