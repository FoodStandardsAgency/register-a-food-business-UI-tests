Feature: Submit a Registration

   Declaration Page submission

   Scenario: declaration page happy path
    Given that I am on the "declaration page"
    And I have ticked all the boxes
    When I click "submit registration" 
    Then I am shown a confirmation page with confirmation the FSA has received my registration

   Scenario: server response error
    Given that I am on the "declaration page"
    And I have ticked all the boxes
    When I click "submit registration" 
    And I don't get a server response
    Then I am shown an error message and asked to try again

   Scenario: not ticked all boxes on declaration page
    Given that I have not ticked all the boxes on the "declaration page"
    When I click "submit registration" 
    Then I am shown an error message telling me to correct my details
