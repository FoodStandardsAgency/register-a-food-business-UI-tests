Feature: Landing Page
Landing Page flows to next page

    @beginregistration
    Scenario: testing happy path for begin registration
        Given I open the url "cardiff/index"
        When I click on the element "firstpage.button"
        Then I expect the url to not contain ""








