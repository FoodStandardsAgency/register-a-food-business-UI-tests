@establishment_address
Feature: As Catelyn I need the service to look up my address and I can select the correct one so that Ric knows my addresses exist and can find them

    Establishment address section validation

    @SDB-12_happy_path_establishment_address
    Scenario: able to find address using lookup service on the establishment address page
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-address"
        When I click on the element "estabAddress.button"
        And I set "BS249ST" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "establishment-address-select"
        When I click on the element "estabAddress.button"
        Then I expect the url to not contain "establishment-address-select"

        
    @SDB-12_happy_path_establishment_address_select_2nd_option
    Scenario: able to find address using lookup service on the establishment address page
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-address"
        And I set "BS249ST" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "establishment-address-select"
        When I select the 2nd option for element "estabAddress.postcodeDropdown"
        When I click on the element "estabAddress.button"
        Then I expect the url to not contain "establishment-address-select"

        
    @SDB-12_error_establishment_address
    Scenario: entering postcode in invalid format and pressing Find Address
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-address"
        And I set "§§§" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Not a valid postcode"

    @SDB-12_establishment_address_change_postcode
    Scenario: entering postcode, pressing Find Address and then changing postcode
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-address"
        And I set "BS249ST" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "establishment-address-select"
        And I expect that element "estabAddress.postcodeDisplay" contains the text "BS249ST"
        When I click on the element "estabAddress.changePostcode"
        Then I expect the url to contain "establishment-address"
        And I expect that element "estabAddress.postcode" contains the text "BS249ST"
 
    @SDB-12_establishment_address_cant_find_address
    Scenario: entering postcode, pressing Find Address and then not able to find address in dropdown
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-address"
        And I set "BS249ST" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "establishment-address-select"
        And I expect that element "estabAddress.postcodeDisplay" contains the text "BS249ST"
        When I click on the element "estabAddress.cantFindAddressLink"
        Then I expect the url to contain "establishment-address-manual"
        When I set "test first line" to the inputfield "estabAddress.firstline"
        And I set "test town" to the inputfield "estabAddress.town"
        And I set "AA11 1AA" to the inputfield "estabAddress.manualPostcode"
        And I click on the element "estabAddress.button"
        Then I expect the url to not contain "establishment-address-manual"

        
    @SDB-12_establishment_address_cant_find_address_error_firstline
    Scenario: using manual input - error
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-address-manual"
        When I set "InvalidLongAddressLine..........................................................................................................................................................................................................................................." to the inputfield "estabAddress.firstline"
        And I set "BS249ST" to the inputfield "estabAddress.manualPostcode"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Enter a valid first line of address"
        And I expect that element "estabAddress.manualPostcode" contains the text "BS249ST"
        And I expect that element "estabAddress.firstline" contains the text "InvalidLongAddressLine..........................................................................................................................................................................................................................................."


    @SDB-12_establishment_address_cant_find_address__error_no_firstline
    Scenario: using manual input - error
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-address-manual"
        And I set "BS249ST" to the inputfield "estabAddress.manualPostcode"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Enter a valid first line of address"
        And I expect that element "estabAddress.manualPostcode" contains the text "BS249ST"

    @SDB-12_establishment_address_cant_find_address_error_postcode
    Scenario: using manual input - error
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-address-manual"
        When I set "test first line" to the inputfield "estabAddress.firstline"
        When I set "fakeville" to the inputfield "estabAddress.town"
        And I set "±±±" to the inputfield "estabAddress.manualPostcode"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Enter a valid postcode"
        And I expect that element "estabAddress.manualPostcode" contains the text "±±±"
        And I expect that element "estabAddress.firstline" contains the text "test first line"

            @SDB-12_establishment_address_cant_find_address_error_no_postcode
    Scenario: using manual input - error
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-address-manual"
        When I set "test first line" to the inputfield "estabAddress.firstline"
        When I set "fakeville" to the inputfield "estabAddress.town"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Enter a valid postcode"
        And I expect that element "estabAddress.firstline" contains the text "test first line"

    @establishment_address_cant_find_address_error_locality
    Scenario: using manual input - error
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-address-manual"
        When I set "First Line" to the inputfield "estabAddress.firstline"
        When I set "fakeville" to the inputfield "estabAddress.town"
        And I set "BS249ST" to the inputfield "estabAddress.manualPostcode"
        And I set "InvalidLongAddressLine......................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................." to the inputfield "estabAddress.locality"
        And I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Enter a valid third line of address"
        And I expect that element "estabAddress.manualPostcode" contains the text "BS249ST"
        And I expect that element "estabAddress.firstline" contains the text "First Line"
        And I expect that element "estabAddress.locality" contains the text "InvalidLongAddressLine..........................................................................................................................................................................................................................................."

    @establishment_address_cant_find_address_success_with_locality
    Scenario: using manual input - success
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-address-manual"
        When I set "First Line" to the inputfield "estabAddress.firstline"
        And I set "BS249ST" to the inputfield "estabAddress.manualPostcode"
        And I set "Locality" to the inputfield "estabAddress.locality"
        And I set "Town" to the inputfield "estabAddress.town"
        And I click on the element "estabAddress.button"
        Then I expect the url to not contain "establishment-address-manual"

