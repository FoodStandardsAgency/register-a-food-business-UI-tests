Feature: Establishment Address

   Establishment address section validation

   @qa_ready
   Scenario: testing happy path
    Given I am on the establishment address page
    When I put a valid Establishment first line in
    And I put a valid post code in
    And I press save and continue
    Then I am taken to another page

    @not_done
    Scenario: 
    Given I am on the establishment address page
    When I put a valid Establishment first line in
    And I put an invalid post code in
    When I press save and continue
    Then an error appears




