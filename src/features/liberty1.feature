@test_first_page
Feature: testing clicking begin registration

Establishment address section validation

    @beginregistration
    Scenario: testing happy path for begin registration
        Given I open the url "http://localhost:3000/"
        When I click on the element "firstpage.button"
        Then I expect that the url is "http://localhost:3000/operator-name"

    @establishment_happy_path
    Scenario: testing establishment address happy path
        Given I open the url "http://localhost:3000/establishment-address"
        When I click on the element "estabAddress.firstline"
        And I set "WC1H 8IG" to the inputfield "estabAddress.postcode"
        And I set "test" to the inputfield "estabAddress.firstline"
        Then I expect that element "estabAddress.firstline" contains the text "test"
        And I expect that element "estabAddress.postcode" contains the text "WC1H 8IG"
        And I click on the element "estabAddress.button"
        Then I expect that the url is not "http://localhost:3000/establishment-address"


