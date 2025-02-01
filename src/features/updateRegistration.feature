Feature: Update Registration
    Update registration shows up

    @update registration
    Scenario: testing happy path for update registration
        Given I open the url "update-registration"
        And I expect that element "newOrUpdateReg.heading" contains the text "Your local authority is"
        