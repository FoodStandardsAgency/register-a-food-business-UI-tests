@business_water_supply_SDB-1125
Feature: Water Supply

    @water_supply_happy_path_SDB-1125
    Scenario: able to select one statement and proceed
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/business-water-supply"
        When I click on the element "businessWaterSupply.private"
        And I click on the element "businessWaterSupply.button"
        Then I expect the url to not contain "business-water-supply"

    @water_supply_no_selection_SDB-1125
    Scenario: not selected any options and tries to continue
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/business-water-supply"
        When I click on the element "businessWaterSupply.button"
        Then I expect the url to contain "business-water-supply"
        And I expect that element "businessWaterSupply.error" contains the text "You must select a water supply type before continuing"

    @water_supply_private_forward_then_back_SDB-1125
    Scenario: selects one option, clicks Continue and goes back
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/business-water-supply"
        When I click on the element "businessWaterSupply.private"
        And I click on the element "businessWaterSupply.button"
        Then I expect the url to not contain "business-water-supply"
        When I click on the element "commonElements.backButton"
        Then I expect that element "businessWaterSupply.private" is selected
        And I expect that element "businessWaterSupply.public" is not selected
        And I expect that element "businessWaterSupply.publicAndPrivate" is not selected

    @water_supply_public_and_private_registration_summary_SDB-1125
    Scenario: selects Public and Private and goes to registration-summary
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/business-water-supply"
        When I click on the element "businessWaterSupply.publicAndPrivate"
        And I click on the element "businessWaterSupply.button"
        Then I expect the url to not contain "business-water-supply"
        When I open the url "mid-and-east-antrim/registration-summary"
        Then I expect that element "registrationSummary.waterSupply" contains the text "Public and private"

    @water_supply_public_registration_summary_SDB-1125
    Scenario: selects Public and goes to registration-summary
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/business-water-supply"
        When I click on the element "businessWaterSupply.public"
        And I click on the element "businessWaterSupply.button"
        Then I expect the url to not contain "business-water-supply"
        When I open the url "mid-and-east-antrim/registration-summary"
        Then I expect that element "registrationSummary.waterSupply" contains the text "Public"

    @water_supply_private_registration_summary_SDB-1125
    Scenario: selects Private and goes to registration-summary
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/business-water-supply"
        When I click on the element "businessWaterSupply.private"
        And I click on the element "businessWaterSupply.button"
        Then I expect the url to not contain "business-water-supply"
        When I open the url "mid-and-east-antrim/registration-summary"
        Then I expect that element "registrationSummary.waterSupply" contains the text "Private"

    @water_supply_change_option_SDB-1125
    Scenario: selects one option and then changes it
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/business-water-supply"
        When I click on the element "businessWaterSupply.public"
        Then I expect that element "businessWaterSupply.public" is selected
        When I click on the element "businessWaterSupply.private"
        And I expect that element "businessWaterSupply.private" is selected
        And I expect that element "businessWaterSupply.public" is not selected
