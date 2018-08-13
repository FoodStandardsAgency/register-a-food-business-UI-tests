@receive_confirmation_email_SDB-48
Feature: As Samantha I want to receive an email containing confirmation of my registration and my registration number so that the information I need to contact a Local Council is saved
    @SDB-48_happy_path
    Scenario: Submit registration and shown text confirming an email has been sent to operator email on the summary confirmation page
        Given I go to a special QA page at url "/qa/declaration" with injected "declaration" data
        And I click on the element "submitRegistration.firstCheckbox"
        And I click on the element "submitRegistration.secondCheckbox"
        And I click on the element "submitRegistration.thirdCheckbox"
        When I click on the element "submitRegistration.button"
        Then I expect that the path is "/summary-confirmation"
        And I expect that element "summaryConfirmation.emailConfirmation" is visible
        And I expect that element "summaryConfirmation.emailConfirmation" contains the text "fsatestemail.valid@gmail.com"

