@operator_type
Feature: Operator Type

Operator Type section validation


    @change_operator_type_SDB-55
    Scenario: able to change Operator Type
        Given I open the url "http://localhost:3000/operator-type"
        When I click on the element "opContactType.operatorPerson"
        And I click on the element "opContactType.operatorCompany"
        Then I expect that element "opContactType.operatorCompany" is selected
        And I expect that checkbox "opContactType.operatorPerson" is not checked

    @happy_path_SDB-55
    Scenario: happy path for Operator Type
        Given I open the url "http://localhost:3000/operator-type"
        When I click on the element "opContactType.operatorPerson"
        And I click on the element "opContactType.button"
        Then I expect that the url is not "http://localhost:3000/operator-type"


    @not_selected_operator_type_SDB-55
    Scenario: error shows when no operator type is selected
        Given I open the url "http://localhost:3000/operator-type"
        When I click on the element "opContactType.button"
        Then I expect that element "opContactType.error" contains the text "You must select an operator type before continuing"


