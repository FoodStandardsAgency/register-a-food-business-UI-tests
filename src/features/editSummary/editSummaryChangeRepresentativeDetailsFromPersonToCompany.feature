@SDB-130_Change_Operator_Type_Representative_Person_to_company
Feature: Change Representative details from person to Company
	
	@SDB-130_Change_Operator_Type_Representative_Person_to_company
  Scenario: Change Representative details from person to Company
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary-representative" data
    And I click on the element "commonElements.button"
    When I click on the element "registrationSummary.changeOperatorType"
    Then I expect the url to contain "registration-role?edit=registration-role"
    And I expect that element "regRole.representative" is selected
    When I click on the element "regRole.button"
    Then I expect the url to contain "operator-type?edit=registration-role"
    And I expect that element "opType.operatorPerson" is selected
    When I click on the element "opType.operatorCompany"
    And I click on the element "opType.button"
    Then I expect the url to contain "operator-company-details?edit=registration-role"
    When I set "Rebecca's Roulades" to the inputfield "companyDetails.name"
    And I set "12345678" to the inputfield "companyDetails.companiesHouseNumber"
    And I click on the element "companyDetails.button"
    Then I expect the url to contain "contact-representative?edit=registration-role"
    When I set "Rachel" to the inputfield "repOpContactDetails.contactName"
    And I set "01234567891" to the inputfield "repOpContactDetails.primaryPhoneNumber"
    And I set "Tester" to the inputfield "repOpContactDetails.role"
    And I set "companyrepresentative@email.com" to the inputfield "repOpContactDetails.emailAddress"
    And I click on the element "repOpContactDetails.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.operatorType" contains the text "A company (registered by a representative)"
    And I expect that element "registrationSummary.companyName" contains the text "Rebecca's Roulades"
    And I expect that element "registrationSummary.companiesNumber" contains the text "12345678"
    And I expect that element "registrationSummary.representativeName" contains the text "Rachel"
    And I expect that element "registrationSummary.representativeRole" contains the text "Tester"
    And I expect that element "registrationSummary.representativeNumber" contains the text "01234567891"
    And I expect that element "registrationSummary.representativeEmail" contains the text "companyrepresentative@email.com"