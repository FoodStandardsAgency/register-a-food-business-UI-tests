@customer_type
Feature: Customer Type

    Customer Type section validation

    @customer_operator_type_SDB-117_others
    Scenario: happy path for selecting supply food to other businesses
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/customer-type"
        And I click on the element "custType.button"
        When I click on the element "custType.supplyOther"
        And I click on the element "custType.button"
        Then I expect the url to not contain "customer-type"

    @customer_operator_type_SDB-117_direct
    Scenario: happy path for selecting supply food directly to customers
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/customer-type"
        When I click on the element "custType.supplyDirectly"
        And I click on the element "custType.button"
        Then I expect the url to not contain "customer-type"

    @customer_operator_type_SDB-117_direct_and_others
    Scenario: happy path for selecting both options
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/customer-type"
        When I click on the element "custType.supplyDirectly"
        And I click on the element "custType.supplyOther"
        And I click on the element "custType.button"
        Then I expect the url to not contain "customer-type"


    @customer_operator_type_SDB-117_no_selection
    Scenario: no customer Type
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/customer-type"
        When I click on the element "custType.button"
        Then I expect that element "custType.error" contains the text "You must select a customer type before continuing"


    @customer_operator_type_SDB-117_complex
    Scenario: able to change customer Type
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/customer-type"
        And I click on the element "custType.supplyDirectly"
        And I click on the element "custType.button"
        Then I expect the url to not contain "customer-type"
        When I click on the element "commonElements.backButton"
        Then I expect the url to contain "customer-type"
        When I click on the element "custType.supplyDirectly"
        Then I expect that checkbox "custType.supplyDirectly" is not checked
        When I click on the element "custType.button"
        Then I expect that element "custType.error" contains the text "You must select a customer type before continuing"
