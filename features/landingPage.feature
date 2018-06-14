Feature: Landing Page
  Landing Page flows to next page

  @landing_page
    Scenario: landing page begin registration
      Given I am on the start page 
      When I click begin registration
      Then I am directed to another page
