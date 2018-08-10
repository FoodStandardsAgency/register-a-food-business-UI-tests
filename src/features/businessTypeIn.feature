@business_Type_In_SDB-5
Feature: As Catelyn I need to be able to choose my business activities so that my business type can be objectively decided

Business Type In Validation

    @business_Type_In_happy_path_SDB-5
    Scenario: testing business type in happy path
        Given I open the url "/cleansession"
        And I open the url "/business-type"
        When I set "Restaurant" to the inputfield "businessTypeIn.search"
        And I click on the element "businessTypeIn.option2"
        When I click on the element "businessTypeIn.button"
        And I click on the element "businessTypeIn.button"
        Then I expect that the path is not "/business-type"

    @business_Type_In_no_selection_SDB-5
    Scenario: testing business type in something but not selecting something
        Given I open the url "/cleansession"
        And I open the url "/business-type"
        When I set "Egg" to the inputfield "businessTypeIn.search"
        And I click on the element "businessTypeIn.button"
        And I click on the element "businessTypeIn.button"
        Then I expect that the path is "/business-type"
        And I expect that element "businessTypeIn.error" contains the text "You must select a business type before continuing"

    @business_Type_In_error_SDB-5
    Scenario: testing business type in not entering anything
        Given I open the url "/cleansession"
        And I open the url "/business-type"
        When I click on the element "businessTypeIn.button"
        And I click on the element "businessTypeIn.button"
        Then I expect that the path is "/business-type"
        And I expect that element "businessTypeIn.error" contains the text "You must select a business type before continuing"

    @business_Type_In_invalid_SDB-5
    Scenario: testing business type in invalid 
        Given I open the url "/cleansession"
        And I open the url "/business-type"
        When I set "±±±" to the inputfield "businessTypeIn.search"
        And I click on the element "businessTypeIn.button"
        And I click on the element "businessTypeIn.button"
        Then I expect that the path is "/business-type"
        And I expect that element "businessTypeIn.error" contains the text "You must select a business type before continuing"



