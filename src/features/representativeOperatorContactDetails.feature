
@representative_operator_contact_details
Feature: Representative Operator Contact Details

Representative operator contact details

    @SDB-241_happy_path
    Scenario: happy path without optional field
        Given I open the url "/cleansession"
        And I open the url "cardiff/contact-representative"
        When I set "Test McTestface" to the inputfield "repOpContactDetails.contactName"
        And I set "07788292373" to the inputfield "repOpContactDetails.phoneNumber"
        And I set "representative@email.com" to the inputfield "repOpContactDetails.email"
        And I click on the element "repOpContactDetails.button"
        Then I expect the url to not contain "contact-representative"

    @SDB-241_happy_path_all_fields
    Scenario: happy path with optional field
        Given I open the url "/cleansession"
        And I open the url "cardiff/contact-representative"
        When I set "Test McTestface" to the inputfield "repOpContactDetails.contactName"
        And I set "07788292373" to the inputfield "repOpContactDetails.phoneNumber"
        And I set "Tester" to the inputfield "repOpContactDetails.role"
        And I set "representative@email.com" to the inputfield "repOpContactDetails.email"
        And I click on the element "repOpContactDetails.button"
        Then I expect the url to not contain "contact-representative"

    @SDB-241_invalid_email
    Scenario: invalid email address
        Given I open the url "/cleansession"
        And I open the url "cardiff/contact-representative"
        When I set "Test McTestface" to the inputfield "repOpContactDetails.contactName"
        And I set "07788292373" to the inputfield "repOpContactDetails.phoneNumber"
        And I set "±±±§§§§" to the inputfield "repOpContactDetails.email"
        And I click on the element "repOpContactDetails.button"
        Then I expect that element "repOpContactDetails.error" contains the text "Not a valid email address"
        And I expect that element "repOpContactDetails.email" contains the text "±±±§§§§"
        And I expect that element "repOpContactDetails.phoneNumber" contains the text "07788292373"
        And I expect that element "repOpContactDetails.contactName" contains the text "Test McTestface"

    @SDB-241_invalid_phone_number
    Scenario: invalid phone number
        Given I open the url "/cleansession"
        And I open the url "cardiff/contact-representative"
        When I set "Test McTestface" to the inputfield "repOpContactDetails.contactName"
        And I set "§§§±±" to the inputfield "repOpContactDetails.phoneNumber"
        And I set "representative@email.com" to the inputfield "repOpContactDetails.email"
        And I click on the element "repOpContactDetails.button"
        Then I expect that element "repOpContactDetails.error" contains the text "Not a valid phone number"
        And I expect that element "repOpContactDetails.contactName" contains the text "Test McTestface"
        And I expect that element "repOpContactDetails.phoneNumber" contains the text "§§§±±"
        And I expect that element "repOpContactDetails.email" contains the text "representative@email.com"

    @SDB-241_no_email_address
    Scenario: no email address
        Given I open the url "/cleansession"
        And I open the url "cardiff/contact-representative"
        When I set "Test McTestface" to the inputfield "repOpContactDetails.contactName"
        And I set "07788292373" to the inputfield "repOpContactDetails.phoneNumber"
        And I click on the element "repOpContactDetails.button"
        Then I expect that element "repOpContactDetails.error" contains the text "Not a valid email address"
        And I expect that element "repOpContactDetails.phoneNumber" contains the text "07788292373"
        And I expect that element "repOpContactDetails.contactName" contains the text "Test McTestface"

    @SDB-241_no_phone_number
    Scenario: no phone number
        Given I open the url "/cleansession"
        And I open the url "cardiff/contact-representative"
        When I set "Test McTestface" to the inputfield "repOpContactDetails.contactName"
        And I set "representative@email.com" to the inputfield "repOpContactDetails.email"
        And I click on the element "repOpContactDetails.button"
        Then I expect that element "repOpContactDetails.error" contains the text "Not a valid phone number"
        And I expect that element "repOpContactDetails.contactName" contains the text "Test McTestface"
        And I expect that element "repOpContactDetails.email" contains the text "representative@email.com"

