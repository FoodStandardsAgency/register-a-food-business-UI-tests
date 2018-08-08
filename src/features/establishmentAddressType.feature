@establishment_address_type_SDB-50
Feature: As Jamie I need to be able to fill in details about my establishments whereabouts so that Ric can know what access is required when arranging an inspection

Establishment address type section validation


    @change_establishment_address_type_SDB-50
    Scenario: able to change establishment address Type
        Given I open the url "/establishment-address-type"
        When I click on the element "estabAddressType.businessCommercial"
        And I click on the element "estabAddressType.mobileMoveable"
        Then I expect that element "estabAddressType.mobileMoveable" is selected
        And I expect that checkbox "estabAddressType.businessCommercial" is not checked

    @happy_path_SDB-50
    Scenario: happy path for establishment address Type
        Given I open the url "/cleansession"
        And I open the url "/establishment-address-type"
        When I click on the element "estabAddressType.businessCommercial"
        And I click on the element "estabAddressType.button"
        Then I expect that the path is not "/establishment-address-details"


    @not_selected_establishment_type_SDB-50
    Scenario: error shows when no establishment type is selected
        Given I open the url "/cleansession"
        Given I open the url "/establishment-address-type"
        When I click on the element "estabAddressType.button"
        Then I expect that element "estabAddressType.error" contains the text "You must select an establishment address type before continuing"


