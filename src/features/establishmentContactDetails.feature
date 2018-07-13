@establishment_address_contact_details
Feature: testing establishment address simple contact details

Establishment address simple contact details section validation

    @SDB-1113_happy_path
    Scenario: happy path without optional field
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
        When I set "valid@email.com" to the inputfield "estabContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I click on the element "estabContactDetails.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"

    @SDB-113_happy_path_all_fields
    Scenario: happy path with optional field
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
        When I set "valid@email.com" to the inputfield "estabContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I set "07788292121" to the inputfield "estabContactDetails.optionalPhoneNumber"
        And I click on the element "submitRegistration.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"

    @SDB-113_invalid_email
    Scenario: invalid email address
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
        When I set "invalidemail" to the inputfield "estabContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I click on the element "estabContactDetails.button"
        Then I expect that element "estabContactDetails.error" contains the text "Not a valid email address"
        And I expect that element "estabContactDetails.emailAddress" contains the text "invalidemail"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "07788292373"

    @SDB-113_invalid_phone_number
    Scenario: invalid phone number
        Given I reload my session
        Given I open the url "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
        When I set "invalidnumber" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I set "valid@email.com" to the inputfield "estabContactDetails.emailAddress"
        And I click on the element "estabContactDetails.button"
        Then I expect that element "estabContactDetails.error" contains the text "Not a valid phone number"
        And I expect that element "estabContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "invalidnumber"

    @SDB-113_no_email_address
    Scenario: no email address
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
        When I set "07788292373" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I click on the element "estabContactDetails.button"
        Then I expect that element "estabContactDetails.error" contains the text "Not a valid email address"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "07788292373"

    @SDB-113_no_phone_number
    Scenario: no phone number
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
        When I set "valid@email.com" to the inputfield "estabContactDetails.emailAddress"
        And I click on the element "estabContactDetails.button"
        Then I expect that element "estabContactDetails.error" contains the text "Not a valid phone number"
        And I expect that element "estabContactDetails.emailAddress" contains the text "valid@email.com"

    @SDB-113_invalid_optional_phone_number
    Scenario: invalid secondary phone number
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
        When I set "valid@email.com" to the inputfield "estabContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I set "§§§§" to the inputfield "estabContactDetails.optionalPhoneNumber"
        And I click on the element "estabContactDetails.button"
        Then I expect that element "estabContactDetails.error" contains the text "Not a valid phone number"
        And I expect that element "estabContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "07788292373"
        And I expect that element "estabContactDetails.optionalPhoneNumber" contains the text "§§§§"

    @SDB-113_happy_path_same_as_operator_sole_trader
    Scenario: happy path using operator details
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/operator-contact-details"
        And I set "valid@email.com" to the inputfield "opContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I click on the element "opContactDetails.button"
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
        When I click on the element "estabContactDetails.checkbox"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "07788292373"
        When I click on the element "submitRegistration.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"

# This scenario is reliant on a currently incomplete story
    @SDB-113_happy_path_same_as_operator_via_representative
    Scenario: happy path using operator details
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/contact-representative"
        And I set "repvalid@email.com" to the inputfield "opContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I click on the element "opContactDetails.button"
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
        When I click on the element "estabContactDetails.checkbox"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "repvalid@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "07788292373"
        When I click on the element "submitRegistration.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
# 
    @SDB-113_happy_path_same_as_operator_overwrite
    Scenario: happy path using operator details overwriting
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/operator-contact-details"
        And I set "valid@email.com" to the inputfield "opContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I click on the element "opContactDetails.button"
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
        When I set "valid2nd@email.com" to the inputfield "estabContactDetails.emailAddress"
        And I set "07766292321" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I click on the element "estabContactDetails.checkbox"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "07788292373"
        When I click on the element "submitRegistration.button"
        Then I expect that the url is not "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"

    @SDB-113_happy_path_same_as_operator_edit
    Scenario: happy path using operator details
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/operator-contact-details"
        And I set "valid@email.com" to the inputfield "opContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I click on the element "opContactDetails.button"
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
        When I click on the element "estabContactDetails.checkbox"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "07788292373"
        When I add "addition" to the inputfield "estabContactDetails.emailAddress"
        And I add "addition" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I click on the element "estabContactDetails.checkbox"
        And I click on the element "estabContactDetails.checkbox"
        Then I expect that element "estabContactDetails.emailAddress" not contains the text "addition"
        And I expect that element "estabContactDetails.primaryPhoneNumber" not contains the text "addition"

    @SDB-113_same_as_operator_try_deselect
    Scenario: happy path using operator details deselect
        Given I reload my session
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/operator-contact-details"
        And I set "valid@email.com" to the inputfield "opContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I click on the element "opContactDetails.button"
        And I open the url "https://register-a-food-business-dev.azurewebsites.net/establishment-contact-details"
        And I click on the element "estabContactDetails.checkbox"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "07788292373"
        When I add "addition" to the inputfield "estabContactDetails.emailAddress"
        And I add "addition" to the inputfield "estabContactDetails.primaryPhoneNumber"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "valid@email.comaddition"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "07788292373addition"
        When I click on the element "estabContactDetails.checkbox"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "valid@email.comaddition"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "07788292373addition"





