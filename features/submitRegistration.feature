@submit_registration
Feature: Declaration Page

 

 @declaration_page_one_checked
   Scenario: declaration page errors for one ticked
   Given I have opened a new window 
    And that I am on the declaration page
    And I have ticked one of the boxes
    When I click submit
    Then I am shown an error 
    And my box is still ticked
    And it closes the window

@declaration_page_sad
   Scenario: declaration page errors for none ticked
    Given I have opened a new window 
    And that I am on the declaration page
    When I click submit
    Then I am shown an error 
    And it closes the window

 
@declaration_page_happy
   Scenario: declaration page flow to application complete
   Given I have opened a new window
    And that I am on the declaration page
    And I have ticked all the boxes
   When I click submit
 Then I am directed to the application complete page
 And it closes the window