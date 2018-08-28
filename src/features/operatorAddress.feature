@operator_address_SDB-1
Feature: As Catelyn I need the service to look up my address and I can select the correct one so that Ric knows my addresses exist and can find them

Operator address section validation

    @SDB-12_happy_path_operator_address
    Scenario: able to find address using lookup service on the operator address page
        Given I open the url "/cleansession"
        And I open the url "operator-address"
        And I set "BS249ST" to the inputfield "opAddress.postcode"
        When I click on the element "opAddress.findAddress"
        Then I expect the url to contain "operator-address-select"
        When I click on the element "opAddress.button"
        Then I expect the url to not contain "operator-address-select"


    @SDB-12_happy_path_operator_address_select_2nd_option
    Scenario: able to find address using lookup service on the operator address page
        Given I open the url "/cleansession"
        And I open the url "operator-address"
        And I set "BS249ST" to the inputfield "opAddress.postcode"
        When I click on the element "opAddress.findAddress"
        Then I expect the url to contain "operator-address-select"
        When I select the 2nd option for element "opAddress.postcodeDropdown"
        And I click on the element "opAddress.button"
        Then I expect the url to not contain "operator-address-select"


    @SDB-12_error_operator_address
    Scenario: entering postcode in invalid format and pressing Find Address
        Given I open the url "/cleansession"
        And I open the url "operator-address"
        And I set "§§§" to the inputfield "opAddress.postcode"
        When I click on the element "opAddress.findAddress"
        Then I expect that element "opAddress.error" contains the text "Not a valid postcode"

    @SDB-12_operator_address_change_postcode
    Scenario: entering postcode, pressing Find Address and then changing postcode
        Given I open the url "/cleansession"
        And I open the url "operator-address"
        And I set "BS249ST" to the inputfield "opAddress.postcode"
        When I click on the element "opAddress.findAddress"
        Then I expect the url to contain "operator-address-select"
        And I expect that element "opAddress.postcodeDisplay" contains the text "BS249ST"
        When I click on the element "opAddress.changePostcode"
        Then I expect the url to contain "operator-address"
        And I expect that element "opAddress.postcode" contains the text "BS249ST"


    @SDB-12_establishment_address_cant_find_address
    Scenario: entering postcode, pressing Find Address and then not able to find address in dropdown
        Given I open the url "/cleansession"
        And I open the url "operator-address"
        And I set "BS249ST" to the inputfield "opAddress.postcode"
        When I click on the element "opAddress.findAddress"
        Then I expect the url to contain "operator-address-select"
        And I expect that element "opAddress.postcodeDisplay" contains the text "BS249ST"
        When I click on the element "opAddress.hiddenText"
        And I click on the element "opAddress.cantFindAddress"
        Then I expect the url to contain "operator-address-manual"
        When I set "test first line" to the inputfield "opAddress.firstline"
        And I set "AA11 1AA" to the inputfield "opAddress.manualPostcode"
        And I click on the element "opAddress.button"
        Then I expect the url to not contain "operator-address-manual"


    @SDB-12_operator_address_cant_find_address_error_firstline
    Scenario: using manual input - error
        Given I open the url "/cleansession"
        And I open the url "operator-address-manual"
        When I set "±±±" to the inputfield "opAddress.firstline"
        And I set "BS249ST" to the inputfield "opAddress.manualPostcode"
        And I click on the element "opAddress.button"
        Then I expect that element "opAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "opAddress.manualPostcode" contains the text "BS249ST"
        And I expect that element "opAddress.firstline" contains the text "±±±"

    @SDB-12_operator_address_cant_find_address_error_no_firstline
    Scenario: using manual input - error
        Given I open the url "/cleansession"
        And I open the url "operator-address-manual"
        And I set "BS249ST" to the inputfield "opAddress.manualPostcode"
        And I click on the element "opAddress.button"
        Then I expect that element "opAddress.error" contains the text "Not a valid first line of address"
        And I expect that element "opAddress.manualPostcode" contains the text "BS249ST"

    @SDB-12_operator_address_cant_find_address_error_postcode
    Scenario: using manual input - error
        Given I open the url "/cleansession"
        And I open the url "operator-address-manual"
        When I set "test first line" to the inputfield "opAddress.firstline"
        And I set "±±±" to the inputfield "opAddress.manualPostcode"
        And I click on the element "opAddress.button"
        Then I expect that element "opAddress.error" contains the text "Not a valid postcode"
        And I expect that element "opAddress.manualPostcode" contains the text "±±±"
        And I expect that element "opAddress.firstline" contains the text "test first line"

    @SDB-12_operator_address_cant_find_address_error_no_postcode
    Scenario: using manual input - error
        Given I open the url "/cleansession"
        And I open the url "operator-address-manual"
        When I set "test first line" to the inputfield "opAddress.firstline"
        And I click on the element "opAddress.button"
        Then I expect that element "opAddress.error" contains the text "Not a valid postcode"
        And I expect that element "opAddress.firstline" contains the text "test first line"