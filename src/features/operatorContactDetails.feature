
@operator_contact_details
Feature: Operator Contact Details

Simple operator contact details

    @SDB-156_happy_path
    Scenario: happy path without optional field
        Given I reload my session
        And I open the url "/operator-contact-details"
        When I set "valid@email.com" to the inputfield "opContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I click on the element "opContactDetails.button"
        Then I expect that the path is not "/operator-contact-details"

    @SDB-156_happy_path_all_fields
    Scenario: happy path with optional field
        Given I reload my session
        And I open the url "/operator-contact-details"
        When I set "valid@email.com" to the inputfield "opContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I set "07788292121" to the inputfield "opContactDetails.optionalPhoneNumber"
        And I click on the element "submitRegistration.button"
        Then I expect that the path is not "/operator-contact-details"

    @SDB-156_invalid_email
    Scenario: invalid email address
        Given I reload my session
        And I open the url "/operator-contact-details"
        When I set "invalidemail" to the inputfield "opContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I click on the element "opContactDetails.button"
        Then I expect that element "opContactDetails.error" contains the text "Not a valid email address"
        And I expect that element "opContactDetails.emailAddress" contains the text "invalidemail"
        And I expect that element "opContactDetails.primaryPhoneNumber" contains the text "07788292373"

    @SDB-156_invalid_phone_number
    Scenario: invalid phone number
        Given I reload my session
        Given I open the url "/operator-contact-details"
        When I set "invalidnumber" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I set "valid@email.com" to the inputfield "opContactDetails.emailAddress"
        And I click on the element "opContactDetails.button"
        Then I expect that element "opContactDetails.error" contains the text "Not a valid phone number"
        And I expect that element "opContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "opContactDetails.primaryPhoneNumber" contains the text "invalidnumber"

    @SDB-156_no_email_address
    Scenario: no email address
        Given I reload my session
        And I open the url "/operator-contact-details"
        When I set "07788292373" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I click on the element "opContactDetails.button"
        Then I expect that element "opContactDetails.error" contains the text "Not a valid email address"
        And I expect that element "opContactDetails.primaryPhoneNumber" contains the text "07788292373"

    @SDB-156_no_phone_number
    Scenario: no phone number
        Given I reload my session
        And I open the url "/operator-contact-details"
        When I set "valid@email.com" to the inputfield "opContactDetails.emailAddress"
        And I click on the element "opContactDetails.button"
        Then I expect that element "opContactDetails.error" contains the text "Not a valid phone number"
        And I expect that element "opContactDetails.emailAddress" contains the text "valid@email.com"

    @SDB-156_invalid_optional_phone_number
    Scenario: invalid secondary phone number
        Given I reload my session
        And I open the url "/operator-contact-details"
        When I set "valid@email.com" to the inputfield "opContactDetails.emailAddress"
        And I set "07788292373" to the inputfield "opContactDetails.primaryPhoneNumber"
        And I set "§§§§" to the inputfield "opContactDetails.optionalPhoneNumber"
        And I click on the element "opContactDetails.button"
        Then I expect that element "opContactDetails.error" contains the text "Not a valid phone number"
        And I expect that element "opContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "opContactDetails.primaryPhoneNumber" contains the text "07788292373"
        And I expect that element "opContactDetails.optionalPhoneNumber" contains the text "§§§§"


