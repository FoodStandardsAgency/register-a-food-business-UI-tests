@end_to_end_testing_Jamie_SDB-735
Feature: Testing user journey for Jamie

    Testing whole flow for current pages for Jamie

    @happy_path_
    Scenario: happy path
        Given I open the url "mid-and-east-antrim/index"
        When I click on the element "firstpage.button"
        Then I expect the url to contain "registration-role"
        When I click on the element "regRole.representative"
        And I click on the element "regRole.button"
        Then I expect the url to contain "operator-type"
        When I click on the element "opType.operatorCompany"
        And I click on the element "opType.button"
        Then I expect the url to contain "operator-company-details"
        When I set "The Busy Bean Ltd" to the inputfield "companyDetails.name"
        And I set "10303702" to the inputfield "companyDetails.companiesHouseNumber"
        And I click on the element "companyDetails.button"
        Then I expect the url to contain "operator-address"
        When I set "PE12 8JA" to the inputfield "opAddress.postcode"
        And I click on the element "opAddress.findAddress"
        Then I expect the url to contain "operator-address-select"
        When I click on the element "opAddress.button"
        Then I expect the url to contain "contact-representative"
        When I set "Jamie Henderson" to the inputfield "repOpContactDetails.contactName"
        And I set "Director & Manager" to the inputfield "repOpContactDetails.role"
        And I set "0207685746" to the inputfield "repOpContactDetails.primaryPhoneNumber"
        And I set "taf.nordgren@gmail.com" to the inputfield "repOpContactDetails.emailAddress"
        And I click on the element "repOpContactDetails.button"
        Then I expect the url to contain "establishment-trading-name"
        When I set "The Busy Bean Cornerhouse" to the inputfield "estabTradingName.tradingNameInput"
        And I click on the element "estabTradingName.button"
        Then I expect the url to contain "establishment-address-type"
        When I click on the element "estabAddressType.businessCommercial"
        And I click on the element "estabAddressType.button"
        Then I expect the url to contain "establishment-address"
        And I set "LS12 1QW" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.findAddress"
        Then I expect the url to contain "establishment-address-select"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "establishment-contact-details"
        When I set "0207685746" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I set "07500867690" to the inputfield "estabContactDetails.optionalPhoneNumber"
        And I set "taf.nordgren@gmail.com" to the inputfield "estabContactDetails.emailAddress"
        And I click on the element "estabContactDetails.button"
        Then I expect the url to contain "establishment-opening-status"
        When I click on the element "estabOpeningDate.alreadyTrading"
        And I click on the element "estabOpeningDate.button"
        Then I expect the url to contain "establishment-opening-date-retroactive"
        When I set "20" to the inputfield "estabOpeningDate.day"
        And I set "08" to the inputfield "estabOpeningDate.month"
        And I set "2018" to the inputfield "estabOpeningDate.year"
        And I click on the element "estabOpeningDate.button"
        Then I expect the url to contain "customer-type"
        When I click on the element "custType.supplyDirectly"
        And I click on the element "custType.button"
        Then I expect the url to contain "business-type"
        When I set "Coffee" to the inputfield "businessTypeIn.search"
        And I click on the element "businessTypeIn.option2"
        And I click on the element "businessTypeIn.button"
        Then I expect the url to contain "business-import-export"
        When I click on the element "importExportActivities.directImport"
        And I click on the element "importExportActivities.button"
        Then I expect the url to contain "business-other-details"
        When I click on the element "businessOtherDetails.button"
        Then I expect the url to contain "registration-summary"
        When I click on the element "registrationSummary.button"
        Then I expect the url to contain "declaration"
        When I click on the element "submitRegistration.firstCheckbox"
        And I click on the element "submitRegistration.secondCheckbox"
        And I click on the element "submitRegistration.thirdCheckbox"
        And I click on the element "submitRegistration.button"
        And I pause for 4000ms
        Then I expect the url to contain "summary-confirmation"


