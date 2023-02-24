@la_selector
Feature: As Robert I need the service to locate my council after ive inserted my postcode so I can make sure it is the correct one so that Ric can find my council

    la selector section validation


     @SDB-12_happy_path_la_selector
    Scenario: happy path where the council is found on la-established
        Given I open the url "/cleansession"
        And I open the url "establishment-address"
        When I click on the element "estabAddress.button"
        And I set "BS249ST" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "la-established"
        When I click on the element "estabAddress.button"
        Then I expect the url to not contain "la-established"

        
    @SDB-12_happy_path_la_selector_select_2nd_option
    Scenario: able to find address using lookup service on the la selector page
        Given I open the url "/cleansession"
        And I open the url "establishment-address"
        And I set "BS249ST" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "la-established"
        When I click on the element "estabAddress.backButton"
        Then I expect the url to not contain "la-established"

    @SDB-12_error_la_selector
    Scenario: entering postcode in invalid format and pressing continue
        Given I open the url "/cleansession"
        And I open the url "la-selector"
        And I set "§§§" to the inputfield "estabAddress.postcodeLocator"
        When I click on the element "estabAddress.button"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "la-not-onboarded"

    @SDB-12_la_selector_change_postcode
    Scenario: entering postcode, pressing continue and then changing postcode
        Given I open the url "/cleansession"
        And I open the url "establishment-address"
        And I set "BS249ST" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "la-established"
        And I expect that element "estabAddress.postcodeDisplay" contains the text "You are registering with North Somerset Council"
        When I click on the element "estabAddress.backButtonEstablished"
        Then I expect the url to contain "establishment-address"
        And I set "BT31 9JD" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "la-established"
        And I expect that element "estabAddress.postcodeDisplay" contains the text "You are registering with Newry, Mourne and Down District Council"
		
           @SDB-12_la_selector_cant_find_address
    Scenario: entering postcode, then choosing my own council
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

          @SDB-12_la_selector_cant_find_address_error_firstline
    Scenario: using manual input - error
        Given I open the url "/cleansession"
        And I open the url "la-selector"
        When I set "invalid council" to the inputfield "estabAddress.postcodeLocator"
        And I click on the element "estabAddress.button"
        And I click on the element "estabAddress.button"
        Then I expect the url to contain "la-not-onboarded"
        And I expect that element "estabAddress.noCouncilHeading" contains the text "Unfortunately, you cannot use this service" 

