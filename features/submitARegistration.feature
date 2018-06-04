Feature: Submit a Registration

   Declaration Page submission

   Scenario: declaration page happy path
    Given that I have ticked all the boxes on the "declaration page"
    When I click "begin registration" 
    Then I am directed to the next page to begin the registration information

   Scenario: server response error
    Given that I have ticked all the boxes on the "declaration page"
    When I click "begin registration" 
    And I don't get a server response
    Then I am shown an error message and asked to try again

   Scenario: not ticked all boxes on declaration page
    Given that I have not ticked all the boxes on the "declaration page"
    When I click "begin registration" 
    Then I am shown an error message telling me to correct my details
