@qa_ready
Feature: Landing Page

   Landing Page flows to next page

   Scenario: landing page begin registration
    Given that I am on the start page 
    When I click "begin registration" 
    Then I am directed to the next page to begin the registration information
