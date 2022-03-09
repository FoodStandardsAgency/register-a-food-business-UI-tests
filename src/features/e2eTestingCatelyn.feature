@end_to_end_testing_Catelyn
Feature: Testing user journey for Catelyn

    Testing whole flow for current pages for Catelyn

    @happy_path_
    Scenario: happy path
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/index"
         When I click on the element "firstpage.button"
        When I click on the element "firstpage.button"
        Then I expect the url to contain "registration-role"
        When I click on the element "regRole.soleTrader"
        And I click on the element "regRole.button"
        Then I expect the url to contain "operator-name"
        When I set "Catelyn" to the inputfield "opContactName.firstName"
        And I set "Vale" to the inputfield "opContactName.lastName"
        And I click on the element "opContactName.button"
        Then I expect the url to contain "operator-address"
        When I set "BS24 9ST" to the inputfield "opAddress.postcode"
        And I click on the element "opAddress.button"
        Then I expect the url to contain "operator-address-select"
        When I click on the element "opAddress.button"
        Then I expect the url to contain "operator-contact-details"
        When I set "sophie.vale-morris@gmail.com" to the inputfield "opContactDetails.emailAddress"
        And I set "02749 482642" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I set "07937 485112" to the inputfield "opContactDetails.optionalPhoneNumber"
        And I click on the element "opContactDetails.button"
        Then I expect the url to contain "establishment-trading-name"
        When I set "Old Lyme Cafe" to the inputfield "estabTradingName.tradingNameInput"
        And I click on the element "estabTradingName.button"
        Then I expect the url to contain "establishment-address-type"
        When I click on the element "estabAddressType.businessCommercial"
        And I click on the element "estabAddressType.button"
        Then I expect the url to contain "establishment-address"
        And I set "BS24 9ST" to the inputfield "estabAddress.postcode"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "establishment-address-select"
        When I click on the element "estabAddress.button"
        Then I expect the url to contain "establishment-contact-details"
        When I click on the element "estabContactDetails.reuseButton"
        Then I expect that element "estabContactDetails.optionalPhoneNumber" contains the text "07937 485112"
        And I set "023 475 2455" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I click on the element "estabContactDetails.continueButton"
        Then I expect the url to contain "establishment-opening-status"
        When I click on the element "estabOpeningDate.alreadyTrading"
        And I click on the element "estabOpeningDate.button"
        Then I expect the url to contain "establishment-opening-date-retroactive"
        When I set "08" to the inputfield "estabOpeningDate.day"
        And I set "12" to the inputfield "estabOpeningDate.month"
        And I set "2017" to the inputfield "estabOpeningDate.year"
        And I click on the element "estabOpeningDate.button"
        Then I expect the url to contain "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.monday"
        And I click on the element "openingDaysSome.tuesday"
        And I click on the element "openingDaysSome.thursday"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-hours"
        When I set "09:00 to 20:00" to the inputfield "openingHours.monday"
        When I set "09:00 to 15:00" to the inputfield "openingHours.tuesday"
        When I set "09:00 to 13:00" to the inputfield "openingHours.thursday"
        And I click on the element "commonElements.button"
        Then I expect the url to contain "customer-type"
        When I click on the element "custType.supplyDirectly"
        And I click on the element "custType.button"
        Then I expect the url to contain "business-type"
        When I set "Cafe" to the inputfield "businessTypeIn.search"
        And I click on the element "businessTypeIn.option1"
        And I click on the element "businessTypeIn.button"
        Then I expect the url to contain "business-import-export"
        When I click on the element "importExportActivities.none"
        And I click on the element "importExportActivities.button"
        Then I expect the url to contain "business-water-supply"
        When I click on the element "businessWaterSupply.public"
        And I click on the element "businessWaterSupply.button"
        Then I expect the url to contain "business-other-details"
        When I set "I occasionally bake cakes for parties and deliver them to the customer in my car." to the inputfield "businessOtherDetails.otherDetailsInput"
        And I click on the element "businessOtherDetails.button"
        Then I expect the url to contain "registration-summary"
        When I click on the element "registrationSummary.button"
        Then I expect the url to contain "declaration"
        When I click on the element "submitRegistration.firstCheckbox"
        And I pause for 1000ms
        And I click on the element "submitRegistration.secondCheckbox"
        And I pause for 1000ms
        And I click on the element "submitRegistration.thirdCheckbox"
        And I pause for 1000ms
        And I click on the element "submitRegistration.button"
        And I pause for 5000ms
        Then I expect the url to contain "summary-confirmation"


