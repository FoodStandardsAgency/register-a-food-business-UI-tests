@receive_confirmation_number_SDB-47
Feature: As Samantha I want to recieve a confirmation number when I submit my registration details so that I can contact local councils who are processing my application and they can access my details

    @SDB-47_happy_path
    Scenario: Submit registration and shown reference number on the summary confirmation page
        Given I reload my session
        And I go to a special QA page at url "/qa/summary-confirmation" with injected "declaration" data
        And I open the url "/summary-confirmation"
        And I expect that element "summaryConfirmation.fsaRn" is visible
