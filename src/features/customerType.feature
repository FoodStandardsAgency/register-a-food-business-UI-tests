@customer_type
Feature: Customer Type

Customer Type section validation

    @customer_operator_type_SDB-117_others
    Scenario: able to change customer Type
        Given I reload my session
        And I open the url "http://localhost:3000/customer-type"
        When I click on the element "custType.supplyOther"
        And I click on the element "custType.button"
        Then I expect that the url is not "http://localhost:3000/customer-type"

    @customer_operator_type_SDB-117_direct
    Scenario: able to change customer Type
        Given I reload my session
        And I open the url "http://localhost:3000/customer-type"
        When I click on the element "custType.supplyDirectly"
        And I click on the element "custType.button"
        Then I expect that the url is not "http://localhost:3000/customer-type"

    @customer_operator_type_SDB-117_direct_and_others
    Scenario: able to change customer Type
        Given I reload my session
        And I open the url "http://localhost:3000/customer-type"
        When I click on the element "custType.supplyDirectly"
        And I click on the element "custType.supplyOther"
        And I click on the element "custType.button"
        Then I expect that the url is not "http://localhost:3000/customer-type"


    @customer_operator_type_SDB-117_no_selection
    Scenario: no customer Type
        Given I reload my session
        And I open the url "http://localhost:3000/customer-type"
        When I click on the element "custType.button"
        Then I expect that element "custType.error" contains the text "You must select an option before continuing"


    @customer_operator_type_SDB-117_complex
    Scenario: able to change customer Type
        Given I reload my session
        And I open the url "http://localhost:3000/customer-type"
        And I click on the element "custType.supplyDirectly"
        And I click on the element "custType.button"
        Then I expect that the url is not "http://localhost:3000/customer-type"
        When I click on the element "commonElements.backButton"
        And I click on the element "custType.supplyDirectly"
        Then I expect that checkbox "custType.supplyDirectly" is checked
        And I expect that element "custType.error" contains the text "You must select an option before continuing"
