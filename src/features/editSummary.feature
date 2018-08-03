@edit_registration_summary_SDB-157
Feature: As Samantha I need to be able to edit details in the summary of my registration info before I submit it, so that I can assure everything is accurate and change details if needed


    @SDB-157_happy_path
    Scenario: no changes needed to summary page
        Given I reload my session
        And I go to a special QA page at url "https://register-a-food-business-dev.azurewebsites.net/qa/registration-summary" with injected "registration-summary" data
        When I click on the element "registrationSummary.button"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/declaration"

    @SDB-157_editing_operator_email
    Scenario: editing operator email
        Given I reload my session
        And I go to a special QA page at url "https://register-a-food-business-dev.azurewebsites.net/qa/registration-summary" with injected "registration-summary" data
        When I click on the element "registrationSummary.changeOperatorEmail"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/operator-contact-details?edit=on"
        And I expect that element "opContactDetails.emailAddress" contains the text "email@email.com"
        And I expect that element "commonElements.backButton" is not visible
        When I set "changed@email.com" to the inputfield "opContactDetails.emailAddress"
        And I click on the element "opContactDetails.button"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/registration-summary"
        And I expect that element "registrationSummary.operatorEmail" contains the text "changed@email.com"


    @SDB-157_editing_trading_name
    Scenario: editing establishment trading name
        Given I reload my session
        And I go to a special QA page at url "https://register-a-food-business-dev.azurewebsites.net/qa/registration-summary" with injected "registration-summary" data
        When I click on the element "registrationSummary.changeTradingName"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/establishment-trading-name?edit=on"
        And I expect that element "estabTradingName.tradingNameInput" contains the text "Trading name"
        When I set "Changed Trading Name" to the inputfield "estabTradingName.tradingNameInput"
        And I click on the element "estabTradingName.button"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/registration-summary"
        And I expect that element "registrationSummary.tradingName" contains the text "Changed Trading Name"


    @SDB-157_back_button_not_visible
    Scenario: when editing page the back button is not visible
        Given I reload my session
        And I go to a special QA page at url "https://register-a-food-business-dev.azurewebsites.net/qa/registration-summary" with injected "registration-summary" data
        When I click on the element "registrationSummary.changeTradingName"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/establishment-trading-name?edit=on"
        And I expect that element "commonElements.backButton" is not visible


    @SDB-157_editing_with_error
    Scenario: editing operator email and testing error validation
        Given I reload my session
        And I go to a special QA page at url "https://register-a-food-business-dev.azurewebsites.net/qa/registration-summary" with injected "registration-summary" data
        When I click on the element "registrationSummary.changeOperatorEmail"
        Then I expect that the url is "https://register-a-food-business-dev.azurewebsites.net/operator-contact-details?edit=on"
        And I expect that element "opContactDetails.emailAddress" contains the text "email@email.com"
        And I expect that element "commonElements.backButton" is not visible
        When I set "±±±" to the inputfield "opContactDetails.emailAddress"
        And I click on the element "opContactDetails.button"
        Then I expect that element "opContactDetails.error" contains the text "Not a valid email address"
