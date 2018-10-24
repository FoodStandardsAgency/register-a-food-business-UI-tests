@customer_type
Feature: Customer Type

    Customer Type section validation

    Background:
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/customer-type"

    @customer_operator_type_SDB-117_direct_and_others
    Scenario: happy path for selecting both options
        When I click on the element "custType.supplyDirectly"
        And I click on the element "custType.supplyOther"
        And I click on the element "custType.button"
        Then I expect the url to not contain "customer-type"


    @customer_operator_type_SDB-117_no_selection
    Scenario: no customer Type
        When I click on the element "custType.button"
        Then I expect that element "custType.error" contains the text "You must select an option before continuing"


    @customer_operator_type_SDB-117_complex
    Scenario: able to change customer Type
        And I click on the element "custType.supplyDirectly"
        And I click on the element "custType.button"
        Then I expect the url to not contain "customer-type"
        When I click on the element "commonElements.backButton"
        Then I expect the url to contain "customer-type"
        When I click on the element "custType.supplyDirectly"
        Then I expect that checkbox "custType.supplyDirectly" is not checked
        When I click on the element "custType.button"
        Then I expect that element "custType.error" contains the text "You must select an option before continuing"
