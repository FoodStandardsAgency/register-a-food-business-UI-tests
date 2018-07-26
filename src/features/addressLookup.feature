@address_lookup
Feature: As Catelyn I need the service to look up my address and I can select the correct one so that Ric knows my addresses exist and can find them

    @SDB-12_happy_path_operator_address
    Scenario: able to find address using lookup service on the operator address page
        Given I reload my session
        And I open the url "/operator-address"
        And I set "" to the inputfield "opAddress.postcode"
        When I click on the element "opAddress.findAddress"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/operator-address-select"
        #And I select the first option
        And I click on the element "opAddress.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/operator-address-select"

    @SDB-12_happy_path_establishment_address
    Scenario: able to find address using lookup service on the establishment address page
        Given I reload my session
        And I open the url "/establishment-address"
        And I set "" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.findAddress"
        #And I select the first option
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/establishment-address-select"
        When I click on the element "estabAddress.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/establishment-address-select"

    @SDB-12_error_establishment_address
    Scenario: entering postcode in invalid format and pressing Find Address
        Given I reload my session
        And I open the url "/establishment-address"
        And I set "§§§" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.findAddress"
        Then I expect that element "estabAddress.error" contains the text "Not a valid postcode"


    @SDB-12_error_operator_address
    Scenario: entering postcode in invalid format and pressing Find Address
        Given I reload my session
        And I open the url "/operator-address"
        And I set "§§§" to the inputfield "opAddress.postcode"
        When I click on the element "opAddress.findAddress"
        Then I expect that element "opAddress.error" contains the text "Not a valid postcode"



    @SDB-12_operator_address_change_postcode
    Scenario: entering postcode, pressing Find Address and then changing postcode
        Given I reload my session
        And I open the url "/operator-address"
        And I set "AA11 1AA" to the inputfield "opAddress.postcode"
        When I click on the element "opAddress.findAddress"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/operator-address-select"
        And I expect that element "opAddress.postcodeDisplay" contains the text "AA11 1AA"
        When I click on the element "opAddress.changePostcode"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/operator-address"
        And I expect that element "opAddress.postcode" contains the text "AA11 1AA"


    @SDB-12_establishment_address_change_postcode
    Scenario: entering postcode, pressing Find Address and then changing postcode
        Given I reload my session
        And I open the url "/establishment-address"
        And I set "AA11 1AA" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.findAddress"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/establishment-address-select"
        And I expect that element "estabAddress.postcodeDisplay" contains the text "AA11 1AA"
        When I click on the element "estabAddress.changePostcode"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/establishment-address"
        And I expect that element "estabAddress.postcode" contains the text "AA11 1AA"


    @SDB-12_operator_address_cant_find_address
    Scenario: entering postcode, pressing Find Address and then not able to find address in dropdown
        Given I reload my session
        And I open the url "/operator-address"
        And I set "AA11 1AA" to the inputfield "opAddress.postcode"
        When I click on the element "opAddress.findAddress"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/operator-address-select"
        And I expect that element "opAddress.postcodeDisplay" contains the text "AA11 1AA"
        When I click on the element "opAddress.cantFindAddress"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/operator-address-manual"
        When I set "test first line" to the inputfield "opAddress.firstline"
        And I set "AA11 1AA" to the inputfield "opAddress.postcode"
        And I click on the element "opAddress.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/operator-address-manual"



    @SDB-12_establishment_address_cant_find_address
    Scenario: entering postcode, pressing Find Address and then not able to find address in dropdown
        Given I reload my session
        And I open the url "/establishment-address"
        And I set "AA11 1AA" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.findAddress"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/establishment-address-select"
        And I expect that element "estabAddress.postcodeDisplay" contains the text "AA11 1AA"
        When I click on the element "estabAddress.cantFindAddress"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/establishment-address-manual"
        When I set "test first line" to the inputfield "estabAddress.firstline"
        And I set "AA11 1AA" to the inputfield "estabAddress.postcode"
        And I click on the element "estabAddress.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/establishment-address-manual"

    @SDB-12_operator_address_cant_find_address_error_firstline
    Scenario: using manual input - error
        Given I reload my session
        And I open the url "/operator-address-manual"
        When I set "±±±" to the inputfield "opAddress.firstline"
        And I set "AA11 1AA" to the inputfield "opAddress.postcode"
        And I click on the element "opAddress.button"
        Then I expect that element "opAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "opAddress.postcode" contains the text "AA11 1AA"
        And I expect that element "opAddress.firstline" contains the text "±±±"

    @SDB-12_establishment_address_cant_find_address_error_firstline
    Scenario: using manual input - error
        Given I reload my session
        And I open the url "/establishment-address-manual"
        When I set "±±±" to the inputfield "estabAddress.firstline"
        And I set "AA11 1AA" to the inputfield "estabAddress.postcode"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "estabAddress.postcode" contains the text "AA11 1AA"
        And I expect that element "estabAddress.firstline" contains the text "±±±"

    @SDB-12_operator_address_cant_find_address_error_no_firstline
    Scenario: using manual input - error
        Given I reload my session
        And I open the url "/operator-address-manual"
        And I set "AA11 1AA" to the inputfield "opAddress.postcode"
        And I click on the element "opAddress.button"
        Then I expect that element "opAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "opAddress.postcode" contains the text "AA11 1AA"
        And I expect that element "opAddress.firstline" contains the text "±±±"

    @SDB-12_establishment_address_cant_find_address__error_no_firstline
    Scenario: using manual input - error
        Given I reload my session
        And I open the url "/establishment-address-manual"
        And I set "AA11 1AA" to the inputfield "estabAddress.postcode"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "estabAddress.postcode" contains the text "AA11 1AA"
        And I expect that element "estabAddress.firstline" contains the text "±±±"


    @SDB-12_operator_address_cant_find_address_error_postcode
    Scenario: using manual input - error
        Given I reload my session
        And I open the url "/operator-address-manual"
        When I set "test first line" to the inputfield "opAddress.firstline"
        And I set "±±±" to the inputfield "opAddress.postcode"
        And I click on the element "opAddress.button"
        Then I expect that element "opAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "opAddress.postcode" contains the text "AA11 1AA"
        And I expect that element "opAddress.firstline" contains the text "±±±"

    @SDB-12_establishment_address_cant_find_address_error_postcode
    Scenario: using manual input - error
        Given I reload my session
        And I open the url "/establishment-address-manual"
        When I set "test first line" to the inputfield "estabAddress.firstline"
        And I set "±±±" to the inputfield "estabAddress.postcode"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "estabAddress.postcode" contains the text "AA11 1AA"
        And I expect that element "estabAddress.firstline" contains the text "±±±"

    @SDB-12_operator_address_cant_find_address_error_no_postcode
    Scenario: using manual input - error
        Given I reload my session
        And I open the url "/operator-address-manual"
        When I set "test first line" to the inputfield "opAddress.firstline"
        And I click on the element "opAddress.button"
        Then I expect that element "opAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "opAddress.postcode" contains the text "AA11 1AA"
        And I expect that element "opAddress.firstline" contains the text "±±±"

    @SDB-12_establishment_address_cant_find_address_error_no_postcode
    Scenario: using manual input - error
        Given I reload my session
        And I open the url "/establishment-address-manual"
        When I set "test first line" to the inputfield "estabAddress.firstline"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "estabAddress.postcode" contains the text "AA11 1AA"
        And I expect that element "estabAddress.firstline" contains the text "±±±"














