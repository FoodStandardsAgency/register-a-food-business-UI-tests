@operator_type
Feature: Operator Type

Operator Type section validation


    @change_operator_type_SDB-55
    Scenario: able to change Operator Type
        Given I open the url "cardiff/operator-type"
        When I click on the element "opType.operatorPerson"
        And I click on the element "opType.operatorCompany"
        Then I expect that element "opType.operatorCompany" is selected
        And I expect that checkbox "opType.operatorPerson" is not checked

    @happy_path_SDB-55
    Scenario: happy path for Operator Type
        Given I open the url "/cleansession"
        And I open the url "cardiff/operator-type"
        When I click on the element "opType.operatorPerson"
        And I click on the element "opType.button"
        Then I expect the url to not contain "operator-type"


    @not_selected_operator_type_SDB-55
    Scenario: error shows when no operator type is selected
        Given I open the url "/cleansession"
        Given I open the url "cardiff/operator-type"
        When I click on the element "opType.button"
        Then I expect that element "opType.error" contains the text "You must select an operator type before continuing"


