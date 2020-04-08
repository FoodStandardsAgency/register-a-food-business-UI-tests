
@SDB-828_change_partnership
Feature: As Samantha I need to be able to change the partnership details

  @SDB-130_Change_Operator_Type_Partnership_Change_details
  Scenario: Change details within Partnership path
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary-partnership" data
    When I click on the element "registrationSummary.changeOperatorType"
    Then I expect the url to contain "registration-role?edit=registration-role"
    And I expect that element "regRole.partnership" is selected
    When I click on the element "regRole.button"
    Then I expect the url to contain "partner-name?edit=registration-role"
    And I expect that element "partnerName.partnerOne" contains the text "One"
    And I expect that element "partnerName.partnerTwo" contains the text "Two"
    When I click on the element "partnerName.partnerOneRowChange"
    Then I expect the url to contain "partnership/partner-details?edit=partner-name&id=0"
    And I expect that element "partnerDetails.partner_name" contains the text "One"
    When I set "one change" to the inputfield "partnerDetails.partner_name"
    When I click on the element "commonElements.continueButton"
    Then I expect the url to contain "partner-name?edit=partner-name"
    When I click on the element "commonElements.continueButton"
    Then I expect the url to contain "main-partnership-contact?edit=main-partnership-contact"
    And I expect that element "mainPartnershipContact.partnerOne" is not selected
    And I expect that element "mainPartnershipContact.partnerTwo" is not selected
    And I expect that element "mainPartnershipContact.partnerThree" is not selected
    When I click on the element "mainPartnershipContact.partnerThree"
    And I click on the element "commonElements.continueButton"
    Then I expect the url to contain "operator-contact-details?edit=main-partnership-contact"
    And I expect that element "opContactDetails.primaryPhoneNumber" contains the text "01234567890"
    And I expect that element "opContactDetails.emailAddress" contains the text "email@email.com"
    When I click on the element "opContactDetails.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.operatorType" contains the text "Partnership"
    And I expect that element "registrationSummary.operatorPrimaryNumber" contains the text "01234567890"
    And I expect that element "registrationSummary.operatorEmail" contains the text "email@email.com"
    And I expect that element "registrationSummary.partnershipMainContact" contains the text "Three"
    And I expect that element "registrationSummary.partnerOne" contains the text "one change"
    And I expect that element "registrationSummary.partnerTwo" contains the text "Two"
    And I expect that element "registrationSummary.partnerThree" contains the text "Three"

  