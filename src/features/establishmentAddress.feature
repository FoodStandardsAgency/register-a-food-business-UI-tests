@establishment_address
Feature: As Catelyn I need the service to look up my address and I can select the correct one so that Ric knows my addresses exist and can find them

Establishment address section validation

    @SDB-12_happy_path_establishment_address
    Scenario: able to find address using lookup service on the establishment address page
        Given I reload my session
        And I open the url "/establishment-address"
        And I set "SW1A 1AA" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.findAddress"
        Then I expect that the path is "/establishment-address-select"
        When I click on the element "estabAddress.button"
        Then I expect that the path is not "/establishment-address-select"

    @SDB-12_happy_path_establishment_address_select_2nd_option
    Scenario: able to find address using lookup service on the establishment address page
        Given I reload my session
        And I open the url "/establishment-address"
        And I set "E20 1EJ" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.findAddress"
        Then I expect that the path is "/establishment-address-select"
        When I select the 2nd option for element "estabAddress.postcodeDropdown"
        When I click on the element "estabAddress.button"
        Then I expect that the path is not "/establishment-address-select"

    @SDB-12_error_establishment_address
    Scenario: entering postcode in invalid format and pressing Find Address
        Given I reload my session
        And I open the url "/establishment-address"
        And I set "§§§" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.findAddress"
        Then I expect that element "estabAddress.error" contains the text "Not a valid postcode"

    @SDB-12_establishment_address_change_postcode
    Scenario: entering postcode, pressing Find Address and then changing postcode
        Given I reload my session
        And I open the url "/establishment-address"
        And I set "E20 1EJ" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.findAddress"
        Then I expect that the path is "/establishment-address-select"
        And I expect that element "estabAddress.postcodeDisplay" contains the text "E20 1EJ"
        When I click on the element "estabAddress.changePostcode"
        Then I expect that the path is "/establishment-address"
        And I expect that element "estabAddress.postcode" contains the text "E20 1EJ"

    @SDB-12_establishment_address_cant_find_address
    Scenario: entering postcode, pressing Find Address and then not able to find address in dropdown
        Given I reload my session
        And I open the url "/establishment-address"
        And I set "E20 1EJ" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.findAddress"
        Then I expect that the path is "/establishment-address-select"
        And I expect that element "estabAddress.postcodeDisplay" contains the text "E20 1EJ"
        When I click on the element "estabAddress.hiddenText"
        And I click on the element "estabAddress.cantFindAddress"
        Then I expect that the path is "/establishment-address-manual"
        When I set "test first line" to the inputfield "estabAddress.firstline"
        And I set "AA11 1AA" to the inputfield "estabAddress.manualPostcode"
        And I click on the element "estabAddress.button"
        Then I expect that the path is not "/establishment-address-manual"


    @SDB-12_establishment_address_cant_find_address_error_firstline
    Scenario: using manual input - error
        Given I reload my session
        And I open the url "/establishment-address-manual"
        When I set "±±±" to the inputfield "estabAddress.firstline"
        And I set "E20 1EJ" to the inputfield "estabAddress.manualPostcode"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "estabAddress.manualPostcode" contains the text "E20 1EJ"
        And I expect that element "estabAddress.firstline" contains the text "±±±"

    @SDB-12_establishment_address_cant_find_address__error_no_firstline
    Scenario: using manual input - error
        Given I reload my session
        And I open the url "/establishment-address-manual"
        And I set "E20 1EJ" to the inputfield "estabAddress.manualPostcode"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "estabAddress.manualPostcode" contains the text "E20 1EJ"

    @SDB-12_establishment_address_cant_find_address_error_postcode
    Scenario: using manual input - error
        Given I reload my session
        And I open the url "/establishment-address-manual"
        When I set "test first line" to the inputfield "estabAddress.firstline"
        And I set "±±±" to the inputfield "estabAddress.manualPostcode"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Not a valid postcode"
        And I expect that element "estabAddress.manualPostcode" contains the text "±±±"
        And I expect that element "estabAddress.firstline" contains the text "test first line"

    @SDB-12_establishment_address_cant_find_address_error_no_postcode
    Scenario: using manual input - error
        Given I reload my session
        And I open the url "/establishment-address-manual"
        When I set "test first line" to the inputfield "estabAddress.firstline"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Not a valid postcode"
        And I expect that element "estabAddress.firstline" contains the text "test first line"


