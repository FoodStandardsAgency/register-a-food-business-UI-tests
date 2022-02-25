
@representative_operator_contact_details
Feature: Representative Operator Contact Details

    Representative operator contact details

    @SDB-241_happy_path
    Scenario: happy path without optional field
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/contact-representative"
        And I click on the element "repOpContactDetails.button"
        When I set "Test McTestface" to the inputfield "repOpContactDetails.contactName"
        And I set "07788292373" to the inputfield "repOpContactDetails.primaryPhoneNumber"
        And I set "representative@email.com" to the inputfield "repOpContactDetails.emailAddress"
        And I click on the element "repOpContactDetails.button"
        Then I expect the url to not contain "contact-representative"

    @SDB-241_happy_path_all_fields
    Scenario: happy path with optional field
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/contact-representative"
        When I set "Test McTestface" to the inputfield "repOpContactDetails.contactName"
        And I set "07788292373" to the inputfield "repOpContactDetails.primaryPhoneNumber"
        And I set "Tester" to the inputfield "repOpContactDetails.role"
        And I set "representative@email.com" to the inputfield "repOpContactDetails.emailAddress"
        And I click on the element "repOpContactDetails.button"
        Then I expect the url to not contain "contact-representative"

    @SDB-241_invalid_email
    Scenario: invalid email address
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/contact-representative"
        When I set "Test McTestface" to the inputfield "repOpContactDetails.contactName"
        And I set "07788292373" to the inputfield "repOpContactDetails.primaryPhoneNumber"
        And I set "±±±§§§§" to the inputfield "repOpContactDetails.emailAddress"
        And I click on the element "repOpContactDetails.button"
        Then I expect that element "repOpContactDetails.error" contains the text "Enter a valid representative email address"
        And I expect that element "repOpContactDetails.emailAddress" contains the text "±±±§§§§"
        And I expect that element "repOpContactDetails.primaryPhoneNumber" contains the text "07788292373"
        And I expect that element "repOpContactDetails.contactName" contains the text "Test McTestface"

    @SDB-241_invalid_phone_number
    Scenario: invalid phone number
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/contact-representative"
        When I set "Test McTestface" to the inputfield "repOpContactDetails.contactName"
        And I set "§§§±±" to the inputfield "repOpContactDetails.primaryPhoneNumber"
        And I set "representative@email.com" to the inputfield "repOpContactDetails.emailAddress"
        And I click on the element "repOpContactDetails.button"
        Then I expect that element "repOpContactDetails.error" contains the text "Enter a valid representative phone number"
        And I expect that element "repOpContactDetails.contactName" contains the text "Test McTestface"
        And I expect that element "repOpContactDetails.primaryPhoneNumber" contains the text "§§§±±"
        And I expect that element "repOpContactDetails.emailAddress" contains the text "representative@email.com"

    @SDB-241_no_email_address
    Scenario: no email address
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/contact-representative"
        When I set "Test McTestface" to the inputfield "repOpContactDetails.contactName"
        And I set "07788292373" to the inputfield "repOpContactDetails.primaryPhoneNumber"
        And I click on the element "repOpContactDetails.button"
        Then I expect that element "repOpContactDetails.error" contains the text "Enter a valid representative email address"
        And I expect that element "repOpContactDetails.primaryPhoneNumber" contains the text "07788292373"
        And I expect that element "repOpContactDetails.contactName" contains the text "Test McTestface"

    @SDB-241_no_phone_number
    Scenario: no phone number
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/contact-representative"
        When I set "Test McTestface" to the inputfield "repOpContactDetails.contactName"
        And I set "representative@email.com" to the inputfield "repOpContactDetails.emailAddress"
        And I click on the element "repOpContactDetails.button"
        Then I expect that element "repOpContactDetails.error" contains the text "Enter a valid representative phone number"
        And I expect that element "repOpContactDetails.contactName" contains the text "Test McTestface"
        And I expect that element "repOpContactDetails.emailAddress" contains the text "representative@email.com"

