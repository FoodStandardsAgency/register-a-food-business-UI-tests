Feature: Landing Page
Landing Page flows to next page

    @beginregistration
    Scenario: testing happy path for begin registration
        Given I open the url "http://localhost:3000/"
        When I click on the element "firstpage.button"
        Then I expect that the url is not "http://localhost:3000/"

