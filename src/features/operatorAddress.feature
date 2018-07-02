@operator_address_SDB-1
Feature: testing operator address

Operator address section validation

    @operator_happy_path_SDB-1
    Scenario: testing operator address happy path
        Given I reload my session
        And I open the url "http://localhost:3000/operator-address"
        When I set "test" to the inputfield "opAddress.firstline"
        And I set "WC1H 8DH" to the inputfield "opAddress.postcode"
        Then I expect that element "opAddress.firstline" contains the text "test"
        And I expect that element "opAddress.postcode" contains the text "WC1H 8DH"
        And I click on the element "opAddress.button"
        Then I expect that the url is not "http://localhost:3000/operator-address"

    @invalid_postcode_SDB-1
    Scenario: Invalid Postcode
        Given I reload my session
        And I open the url "http://localhost:3000/operator-address"
        When I set "test" to the inputfield "opAddress.firstline"
        And I set "±±±±" to the inputfield "opAddress.postcode"
        And I click on the element "opAddress.button"
        Then I expect that element "opAddress.error" contains the text "Not a valid postcode"
        And I expect that element "opAddress.firstline" contains the text "test"
        And I expect that element "opAddress.postcode" contains the text "±±±±"

    @invalid_firstline_SDB-1
    Scenario: Valid Postcode and not putting in first line
        Given I reload my session
        And I open the url "http://localhost:3000/operator-address"
        When I set "WC1H 8DH" to the inputfield "opAddress.postcode"
        And I click on the element "opAddress.button"
        Then I expect that element "opAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "opAddress.postcode" contains the text "WC1H 8DH"

    @no_firstline_SDB-1
    Scenario: Valid Postcode and not putting in first line
        Given I reload my session
        And I open the url "http://localhost:3000/operator-address"
        When I set "WC1H 8DH" to the inputfield "opAddress.postcode"
        And I click on the element "opAddress.button"
        Then I expect that element "opAddress.error" contains the text "Not a valid first line of address"





