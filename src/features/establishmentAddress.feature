@establishment_address
Feature: testing establishment address

Establishment address section validation

    @establishment_happy_path
    Scenario: testing establishment address happy path
        Given I open the url "http://localhost:3000/establishment-address"
        When I set "test" to the inputfield "estabAddress.firstline"
        And I set "WC1H 8DH" to the inputfield "estabAddress.postcode"
        Then I expect that element "estabAddress.firstline" contains the text "test"
        And I expect that element "estabAddress.postcode" contains the text "WC1H 8DH"
        And I click on the element "estabAddress.button"
        Then I expect that the url is not "http://localhost:3000/establishment-address"

    @invalid_postcode
    Scenario: Invalid Postcode
        Given I reload my session
        And I open the url "http://localhost:3000/establishment-address"
        When I set "test" to the inputfield "estabAddress.firstline"
        And I set "±±±±" to the inputfield "estabAddress.postcode"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Not a valid postcode"
        And I expect that element "estabAddress.firstline" contains the text "test"
        And I expect that element "estabAddress.postcode" contains the text "±±±±"


    @invalid_firstline
    Scenario: Valid Postcode and not putting in first line
        Given I reload my session
        And I open the url "http://localhost:3000/establishment-address"
        When I set "WC1H 8DH" to the inputfield "estabAddress.postcode"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "estabAddress.postcode" contains the text "WC1H 8DH"


