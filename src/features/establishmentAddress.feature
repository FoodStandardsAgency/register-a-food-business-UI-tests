@establishment_address
Feature: As Catelyn I need the service to look up my address and I can select the correct one so that Ric knows my addresses exist and can find them

    Establishment address section validation


     @SDB-12_happy_path_establishment_address
    Scenario: able to find address using lookup service on the establishment address page
        Given I open the url "/cleansession"
        And I open the url "establishment-address"
        When I click on the element "estabAddress.button"
        And I set "BS249ST" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "la-established"
        When I click on the element "estabAddress.button"
        Then I expect the url to not contain "la-established"

        
    @SDB-12_happy_path_establishment_address_select_2nd_option
    Scenario: able to find address using lookup service on the establishment address page
        Given I open the url "/cleansession"
        And I open the url "establishment-address"
        And I set "BS249ST" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "la-established"
        When I click on the element "estabAddress.backButton"
        Then I expect the url to not contain "la-established"

        
    @SDB-12_error_establishment_address
    Scenario: entering postcode in invalid format and pressing Find Address
        Given I open the url "/cleansession"
        And I open the url "establishment-address"
        And I set "§§§" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect that element "estabAddress.error" contains the text "Not a valid postcode"

    @SDB-12_establishment_address_change_postcode
    Scenario: entering postcode, pressing Find Address and then changing postcode
        Given I open the url "/cleansession"
        And I open the url "establishment-address"
        And I set "BS249ST" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "la-established"
        And I expect that element "estabAddress.postcodeDisplay" contains the text "You are registering with North Somerset Council"
		
           @SDB-12_establishment_address_cant_find_address
    Scenario: entering postcode, pressing Find Address and then not able to find address in dropdown
        Given I open the url "/cleansession"
        And I open the url "establishment-address"
        And I set "BS29ST" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "la-selector"
        And I expect that element "estabAddress.cannotFindPostcodeHeading" contains the text "We couldn't find your Local Authority"
        And I set "cardiff" to the inputfield "estabAddress.postcodeLocator"
        When I click on the element "estabAddress.button"
        When I click on the element "estabAddress.button"
        Then I expect the url to not contain "la-selector"

          @SDB-12_establishment_address_cant_find_address_error_firstline
    Scenario: using manual input - error
        Given I open the url "/cleansession"
        And I open the url "la-selector"
        When I set "invalid council" to the inputfield "estabAddress.postcodeLocator"
        And I click on the element "estabAddress.button"
        And I click on the element "estabAddress.button"
        Then I expect the url to contain "la-not-onboarded"
        And I expect that element "estabAddress.noCouncilHeading" contains the text "Unfortunately, you cannot use this service" 

