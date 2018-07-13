@customer_type
Feature: Customer Type

Customer Type section validation

    @customer_operator_type_SDB-117_others
    Scenario: happy path for selecting supply food to other businesses
        Given I reload my session
<<<<<<< HEAD
        And I open the url "hhttps://register-a-food-business-dev.azurewebsites.net/customer-type"
=======
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/customer-type"
>>>>>>> f43b23b0579ca7c42c3c9c8d189599fd52c4e0a9
        When I click on the element "custType.supplyOther"
        And I click on the element "custType.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/customer-type"

    @customer_operator_type_SDB-117_direct
    Scenario: happy path for selecting supply food directly to customers
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/customer-type"
        When I click on the element "custType.supplyDirectly"
        And I click on the element "custType.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/customer-type"

    @customer_operator_type_SDB-117_direct_and_others
    Scenario: happy path for selecting both options
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/customer-type"
        When I click on the element "custType.supplyDirectly"
        And I click on the element "custType.supplyOther"
        And I click on the element "custType.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/customer-type"


    @customer_operator_type_SDB-117_no_selection
    Scenario: no customer Type
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/customer-type"
        When I click on the element "custType.button"
        Then I expect that element "custType.error" contains the text "You must select an option before continuing"


    @customer_operator_type_SDB-117_complex
    Scenario: able to change customer Type
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/customer-type"
        And I click on the element "custType.supplyDirectly"
        And I click on the element "custType.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/customer-type"
        When I click on the element "commonElements.backButton"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/customer-type"
        When I click on the element "custType.supplyDirectly"
        Then I expect that checkbox "custType.supplyDirectly" is not checked
        When I click on the element "custType.button"
        Then I expect that element "custType.error" contains the text "You must select an option before continuing"
