
    # @change_new_or_update_registration_SDB-54
    # Scenario: able to change choice
    #     #Given I open the url "/cleansession"
    #     Given I open the url "new-or-update-registration"
    #     And I click on the element "newOrUpdateReg.button"
    #     When I click on the element "newOrUpdateReg.newRegistration"
    #     And I click on the element "newOrUpdateReg.updateRegistration"
    #     Then I expect that element "newOrUpdateReg.updateRegistration" is selected
    #     And I expect that checkbox "newOrUpdateReg.newRegistration" is not checked

    # @happy_path_new_registrtaion
    # Scenario: happy path for new registration
    #     Given I open the url "/cleansession"
    #     And I open the url "new-or-update-registration"
    #     When I click on the element "newOrUpdateReg.newRegistration"
    #     And I click on the element "newOrUpdateReg.button"
    #     Then I expect the url to contain "registration-role"

    # @happy_path__update_registration
    # Scenario: happy path for update registration
    #     Given I open the url "/cleansession"
    #     And I open the url "new-or-update-registration"
    #     When I click on the element "newOrUpdateReg.updateRegistration"
    #     And I click on the element "newOrUpdateReg.button"
    #     Then I expect the url to contain "update-registration"