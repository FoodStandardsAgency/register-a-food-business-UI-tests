Feature: Landing Page
Landing Page flows to next page

    @beginregistration
    Scenario: testing happy path for begin registration
        Given I open the url "/"
        When I click on the element "firstpage.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/"

