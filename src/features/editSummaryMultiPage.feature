@SDB-828_change_trading_start_date
Feature: As Samantha I need to be able to change the trading date of my registration from the summary page, so that I can register using the correct details

  @SDB-828_retroactive_to_retroactive
  Scenario: Change retroactive trading start date to another retroactive date
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    When I click on the element "registrationSummary.changeTradingStartDate"
    Then I expect the url to contain "establishment-opening-status?edit=establishment-opening-status"
    And I expect that element "estabOpeningDate.alreadyTrading" is selected
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "establishment-opening-date-retroactive?edit=establishment-opening-status"
    # TODO JMB: The below tests will not work until the date input fields can be set to a default value
    # And I expect that element "estabOpeningDate.day" is not empty
    # And I expect that element "estabOpeningDate.month" is not empty
    # And I expect that element "estabOpeningDate.year" is not empty
    When I set "05" to the inputfield "estabOpeningDate.day"
    And I set "02" to the inputfield "estabOpeningDate.month"
    And I set "1990" to the inputfield "estabOpeningDate.year"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.tradingStartDate" contains the text "05 Feb 1990"

  @SDB-828_retroactive_to_proactive
  Scenario: Change retroactive trading start date to a proactive date
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    When I click on the element "registrationSummary.changeTradingStartDate"
    Then I expect the url to contain "establishment-opening-status?edit=establishment-opening-status"
    And I expect that element "estabOpeningDate.alreadyTrading" is selected
    When I click on the element "estabOpeningDate.notTrading"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "establishment-opening-date-proactive?edit=establishment-opening-status"
    And I expect that element "estabOpeningDate.day" is empty
    And I expect that element "estabOpeningDate.month" is empty
    And I expect that element "estabOpeningDate.year" is empty
    When I set "01" to the inputfield "estabOpeningDate.day"
    And I set "01" to the inputfield "estabOpeningDate.month"
    And I set "2050" to the inputfield "estabOpeningDate.year"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.tradingStartDate" contains the text "01 Jan 2050"

  @SDB-828_retroactive_proactive_back_navigation
  Scenario: Change retroactive to proactive, continue, then navigate back and change to retroactive
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
    When I click on the element "registrationSummary.changeTradingStartDate"
    Then I expect the url to contain "establishment-opening-status?edit=establishment-opening-status"
    And I expect that element "commonElements.backButton" is not visible
    And I expect that element "estabOpeningDate.alreadyTrading" is selected
    When I click on the element "estabOpeningDate.notTrading"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "establishment-opening-date-proactive?edit=establishment-opening-status"
    And I expect that element "commonElements.backButton" is visible
    When I click on the element "commonElements.backButton"
    Then I expect the url to contain "establishment-opening-status?edit=establishment-opening-status"
    And I expect that element "commonElements.backButton" is not visible
    And I expect that element "estabOpeningDate.notTrading" is selected
    When I click on the element "estabOpeningDate.alreadyTrading"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "establishment-opening-date-retroactive?edit=establishment-opening-status"
    And I expect that element "commonElements.backButton" is visible
    And I expect that element "estabOpeningDate.day" is empty
    And I expect that element "estabOpeningDate.month" is empty
    And I expect that element "estabOpeningDate.year" is empty
    When I set "05" to the inputfield "estabOpeningDate.day"
    And I set "02" to the inputfield "estabOpeningDate.month"
    And I set "1990" to the inputfield "estabOpeningDate.year"
    And I click on the element "estabOpeningDate.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.tradingStartDate" contains the text "05 Feb 1990"


  @SDB-130_Change_Operator_Type_Charity_Rep_to_Sole_Trader
  Scenario: Change from Representative Charity to Sole Trader
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary-charity" data
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



  @SDB-130_Change_Operator_Type_Partnership_Change_details
  Scenario: Change details within Partnership path
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary-partnership" data
    When I click on the element "registrationSummary.changeOperatorType"
    Then I expect the url to contain "registration-role?edit=registration-role"
    And I expect that element "regRole.partnership" is selected
    When I click on the element "regRole.button"
    Then I expect the url to contain "operator-name?edit=registration-role"
    And I expect that element "opContactName.firstName" contains the text "Percy"
    And I expect that element "opContactName.lastName" contains the text "McPartnership"
    When I set "Patrick" to the inputfield "opContactName.firstName"
    And I set "Smith" to the inputfield "opContactName.lastName"
    When I click on the element "regRole.button"
    Then I expect the url to contain "operator-contact-details?edit=registration-role"
    And I expect that element "opContactDetails.primaryPhoneNumber" contains the text "01234567890"
    And I expect that element "opContactDetails.emailAddress" contains the text "email@email.com"
    When I click on the element "opContactDetails.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.operatorType" contains the text "Partnership"
    And I expect that element "registrationSummary.operatorFirstName" contains the text "Patrick"
    And I expect that element "registrationSummary.operatorLastName" contains the text "Smith"
    And I expect that element "registrationSummary.operatorPrimaryNumber" contains the text "01234567890"
    And I expect that element "registrationSummary.operatorEmail" contains the text "email@email.com"


  @SDB-130_Change_Operator_Type_Representative_Person_to_company
  Scenario: Change Representative details from person to Company
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary-representative" data
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
    And I expect that element "registrationSummary.companyNumber" contains the text "12345678"
    And I expect that element "registrationSummary.representativeName" contains the text "Rachel"
    And I expect that element "registrationSummary.representativeRole" contains the text "Tester"
    And I expect that element "registrationSummary.representativeNumber" contains the text "01234567891"
    And I expect that element "registrationSummary.representativeEmail" contains the text "companyrepresentative@email.com"

  @SDB-1091_Change_Trading_Days_Every_Day_to_Some_Days
  Scenario: Change trading days from every day to some days a week
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary-trading-every-day" data
    When I click on the element "registrationSummary.changeOpeningDays"
    Then I expect the url to contain "opening-days-start?edit=opening-days-start"
    And I expect that element "openingDaysStart.everyday" is selected
    When I click on the element "openingDaysStart.someDays"
    And I click on the element "commonElements.continueButton"
    Then I expect the url to contain "opening-days-some?edit=opening-days-start"
    When I click on the element "openingDaysSome.monday"
    And I click on the element "openingDaysSome.tuesday"
    And I click on the element "commonElements.continueButton"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.openingDays" contains the text "Monday"
    And I expect that element "registrationSummary.openingDays" contains the text "Tuesday"
