@SDB-130_Change_Operator_Type_Charity_Rep_to_Sole_Trader
Feature: Change from Representative Charity to Sole Trader

  @SDB-130_Change_Operator_Type_Charity_Rep_to_Sole_Trader
  Scenario: Change from Representative Charity to Sole Trader
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/registration-summary" with injected "registration-summary-charity" data
    And I click on the element "commonElements.button"
    When I click on the element "registrationSummary.changeOperatorType"
    Then I expect the url to contain "registration-role?edit=registration-role"
    And I expect that element "regRole.representative" is selected
    When I click on the element "regRole.soleTrader"
    And I click on the element "regRole.button"
    Then I expect the url to contain "operator-name?edit=registration-role"
    When I set "Bob" to the inputfield "opContactName.firstName"
    And I set "Smith" to the inputfield "opContactName.lastName"
    And I click on the element "opContactName.button"
    Then I expect the url to contain "operator-contact-details?edit=registration-role"
    When I set "BobSmith@email.com" to the inputfield "opContactDetails.emailAddress"
    And I set "01234567890" to the inputfield "opContactDetails.primaryPhoneNumber"
    And I click on the element "opContactDetails.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.operatorType" contains the text "Sole trader"
    And I expect that element "registrationSummary.operatorFirstName" contains the text "Bob"
    And I expect that element "registrationSummary.operatorLastName" contains the text "Smith"
    And I expect that element "registrationSummary.operatorEmail" contains the text "BobSmith@email.com"
    And I expect that element "registrationSummary.operatorPrimaryNumber" contains the text "01234567890"
	