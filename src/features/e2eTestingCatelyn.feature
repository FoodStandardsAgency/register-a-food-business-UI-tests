@end_to_end_testing_Catelyn
Feature: Testing user journey for Catelyn

Testing whole flow for current pages

    @happy_path_
    Scenario: happy path
        Given I open the url "/"
        When I click on the element "firstpage.button"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/registration-role"
        When I click on the element "regRole.soleTrader"
        And I click on the element "regRole.button"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/operator-name"
        When I set "Catelyn" to the inputfield "opContactName.firstName"
        And I set "Vale" to the inputfield "opContactName.lastName"
        And I click on the element "opContactName.button"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/operator-address"
         And I set "EX19 7UM" to the inputfield "opAddress.postcode"
        When I click on the element "opAddress.findAddress"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/operator-address-select"
        When I click on the element "opAddress.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/operator-contact-details"
         When I set "sophie.vale-morris@gmail.com" to the inputfield "opContactDetails.emailAddress"
        And I set "02749 482642" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I set "07937 485112" to the inputfield "opContactDetails.optionalPhoneNumber"
        And I click on the element "submitRegistration.button"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/establishment-trading-name"
         When I set "Old Lyme Cafe" to the inputfield "estabTradingName.tradingNameInput"
        And I click on the element "estabTradingName.button"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/establishment-address"
        
