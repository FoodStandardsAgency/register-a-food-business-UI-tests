@back_button_SDB-232
Feature: Back button SDB-232

Back button functionality with multiple paths

  @select_sole_trader_direct_route_SDB-232
  Scenario: go directly to operator name then return to registration role
    Given I reload my session
    And I open the url "/registration-role"
    When I click on the element "regRole.soleTrader"
    And I click on the element "regRole.button"
    Then I expect that the path is "/operator-name"

    Given I click on the element "commonElements.backButton"
    Then I expect that the path is "/registration-role"

  @select_representative_indirect_route_SDB-232
  Scenario: go directly to operator name then return to registration role
    Given I reload my session
    And I open the url "/registration-role"
    When I click on the element "regRole.representative"
    And I click on the element "regRole.button"
    Then I expect that the path is "/operator-type"

    Given I click on the element "opType.operatorPerson"
    And I click on the element "opType.button"
    Then I expect that the path is "/operator-name"

    Given I click on the element "commonElements.backButton"
    Then I expect that the path is "/operator-type"

    Given I click on the element "commonElements.backButton"
    Then I expect that the path is "/registration-role"

  @same_page_via_different_routes_SDB-232
  Scenario: go directly to operator name then return to registration role
    Given I reload my session
    And I open the url "/registration-role"
    When I click on the element "regRole.soleTrader"
    And I click on the element "regRole.button"
    Then I expect that the path is "/operator-name"

    Given I set "Bob" to the inputfield "opContactName.firstName"
    And I set "Smith" to the inputfield "opContactName.lastName"
    And I click on the element "opContactName.button"
    Then I expect that the path is not "/operator-name"

    Given I click on the element "commonElements.backButton"
    Then I expect that the path is "/operator-name"
    And I expect that element "opContactName.firstName" contains the text "Bob"
    And I expect that element "opContactName.lastName" contains the text "Smith"

    Given I click on the element "commonElements.backButton"
    Then I expect that the path is "/registration-role"
    And I expect that checkbox "regRole.soleTrader" is checked

    Given I click on the element "regRole.representative"
    And I click on the element "regRole.button"
    Then I expect that the path is "/operator-type"

    Given I click on the element "opType.operatorPerson"
    And I click on the element "opType.button"
    Then I expect that the path is "/operator-name"
    And I expect that element "opContactName.firstName" not contains the text "Bob"
    And I expect that element "opContactName.lastName" not contains the text "Smith"

  @different_page_via_different_routes_SDB-232
  Scenario: go directly to operator name then return to registration role
    Given I reload my session
    And I open the url "/registration-role"
    When I click on the element "regRole.soleTrader"
    And I click on the element "regRole.button"
    Then I expect that the path is "/operator-name"

    Given I set "Bob" to the inputfield "opContactName.firstName"
    And I set "Smith" to the inputfield "opContactName.lastName"
    And I click on the element "opContactName.button"
    Then I expect that the path is not "/operator-name"

    Given I click on the element "commonElements.backButton"
    Then I expect that the path is "/operator-name"
    And I expect that element "opContactName.firstName" contains the text "Bob"
    And I expect that element "opContactName.lastName" contains the text "Smith"

    Given I open the url "/registration-summary"
    Then I expect that element "registrationSummary.operatorFirstName" contains the text "Bob"
    And I expect that element "registrationSummary.operatorLastName" contains the text "Smith"

    Given I open the url "/registration-role"
    Then I expect that checkbox "regRole.soleTrader" is checked

    Given I click on the element "regRole.representative"
    And I click on the element "regRole.button"
    Then I expect that the path is "/operator-type"

    Given I click on the element "opType.operatorCompany"
    And I click on the element "opType.button"
    Then I expect that the path is "/operator-company-details"

    Given I open the url "/registration-summary"
    Then I expect that element "registrationSummary.operatorFirstName" does not exist
    And I expect that element "registrationSummary.operatorLastName" does not exist
