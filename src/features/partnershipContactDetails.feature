@partnership_contact_details
Feature: Partnership Contact Details

    Partnership contact details section validation

    @happy_path_SDB-35
    Scenario: happy path for Partnership Contact Details without optional field
        Given I open the url "partnership-contact-details"
        And I click on the element "partnerContactDetails.button"
        And I set "10" to the inputfield "partnerContactDetails.day"
        And I set "10" to the inputfield "partnerContactDetails.month"
        And I set "1990" to the inputfield "partnerContactDetails.year"
        When I set "valid@email.com" to the inputfield "partnerContactDetails.emailAddress"
        And I set "01234567890" to the inputfield "partnerContactDetails.primaryPhoneNumber"
        And I click on the element "partnerContactDetails.continueButton"
        Then I expect the url to not contain "partnership-contact-details"

@happy_path_SDB-35
    Scenario: happy path for Partnership Contact Details with optional field
        Given I open the url "partnership-contact-details"
        And I click on the element "partnerContactDetails.button"
        And I set "10" to the inputfield "partnerContactDetails.day"
        And I set "10" to the inputfield "partnerContactDetails.month"
        And I set "1990" to the inputfield "partnerContactDetails.year"
        When I set "valid@email.com" to the inputfield "partnerContactDetails.emailAddress"
        And I set "01234567890" to the inputfield "partnerContactDetails.primaryPhoneNumber"
        And I set "01234567890" to the inputfield "partnerContactDetails.optionalPhoneNumber"
        And I click on the element "partnerContactDetails.continueButton"
        Then I expect the url to not contain "partnership-contact-details"


@invalid_email_SDB-35
    Scenario: invalid email
        Given I open the url "partnership-contact-details"
        And I click on the element "partnerContactDetails.button"
        And I set "10" to the inputfield "partnerContactDetails.day"
        And I set "10" to the inputfield "partnerContactDetails.month"
        And I set "1990" to the inputfield "partnerContactDetails.year"
        When I set "invalidemail" to the inputfield "partnerContactDetails.emailAddress"
        And I set "01234567890" to the inputfield "partnerContactDetails.primaryPhoneNumber"
        And I set "01234567890" to the inputfield "partnerContactDetails.optionalPhoneNumber"
        And I click on the element "partnerContactDetails.continueButton"
        Then I expect that element "partnerContactDetails.error" contains the text "Enter a valid operator email address"
        And I expect that element "partnerContactDetails.emailAddress" contains the text "invalidemail"
        And I expect that element "partnerContactDetails.primaryPhoneNumber" contains the text "01234567890"

@invalid_phone_number_SDB-35
    Scenario: invalid phone number
        Given I open the url "partnership-contact-details"
        And I click on the element "partnerContactDetails.button"
        And I set "10" to the inputfield "partnerContactDetails.day"
        And I set "10" to the inputfield "partnerContactDetails.month"
        And I set "1990" to the inputfield "partnerContactDetails.year"
        When I set "valid@email.com" to the inputfield "partnerContactDetails.emailAddress"
        And I set "invalidnumber" to the inputfield "partnerContactDetails.primaryPhoneNumber"
        And I click on the element "partnerContactDetails.continueButton"
        Then I expect that element "partnerContactDetails.error" contains the text "Enter a valid operator phone number"
        And I expect that element "partnerContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "partnerContactDetails.primaryPhoneNumber" contains the text "invalidnumber"
        
@invalid_phone_number_SDB-35
    Scenario: invalid optional phone number
        Given I open the url "partnership-contact-details"
        And I click on the element "partnerContactDetails.button"
        And I set "10" to the inputfield "partnerContactDetails.day"
        And I set "10" to the inputfield "partnerContactDetails.month"
        And I set "1990" to the inputfield "partnerContactDetails.year"
        When I set "valid@email.com" to the inputfield "partnerContactDetails.emailAddress"
        And I set "01234567890" to the inputfield "partnerContactDetails.primaryPhoneNumber"
        And I set "invalidnumber" to the inputfield "partnerContactDetails.optionalPhoneNumber"
        And I click on the element "partnerContactDetails.continueButton"
        Then I expect that element "partnerContactDetails.error" contains the text "Enter a valid operator phone number"
        And I expect that element "partnerContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "partnerContactDetails.primaryPhoneNumber" contains the text "01234567890"
        And I expect that element "partnerContactDetails.optionalPhoneNumber" contains the text "invalidnumber"
    
@SDB-113_no_email_address
    Scenario: no email address
        Given I open the url "/cleansession"
        And I open the url "partnership-contact-details"
        When I set "01234567890" to the inputfield "partnerContactDetails.primaryPhoneNumber"
        And I set "10" to the inputfield "partnerContactDetails.day"
        And I set "10" to the inputfield "partnerContactDetails.month"
        And I set "1990" to the inputfield "partnerContactDetails.year"
        And I click on the element "partnerContactDetails.continueButton"
        Then I expect that element "partnerContactDetails.error" contains the text "Enter a valid operator email address"
        And I expect that element "partnerContactDetails.primaryPhoneNumber" contains the text "01234567890"

@SDB-113_no_phone_number
    Scenario: no phone number
        Given I open the url "/cleansession"
        And I open the url "partnership-contact-details"
        When I set "valid@email.com" to the inputfield "partnerContactDetails.emailAddress"
        And I set "10" to the inputfield "partnerContactDetails.day"
        And I set "10" to the inputfield "partnerContactDetails.month"
        And I set "1990" to the inputfield "partnerContactDetails.year"
        And I click on the element "partnerContactDetails.continueButton"
        Then I expect that element "partnerContactDetails.error" contains the text "Enter a valid operator phone number"
        And I expect that element "partnerContactDetails.emailAddress" contains the text "valid@email.com"

@no_birth_date_SDB-35
    Scenario: no birth date input
        Given I open the url "/cleansession"
        And I open the url "partnership-contact-details"
        And I click on the element "partnerContactDetails.button"
        When I set "01234567890" to the inputfield "partnerContactDetails.primaryPhoneNumber"
        And I set "valid@email.com" to the inputfield "partnerContactDetails.emailAddress"
        And I click on the element "partnerContactDetails.continueButton"
        And I expect that element "partnerContactDetails.error" contains the text "Enter a valid birth date"
        And I expect that element "partnerContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "partnerContactDetails.primaryPhoneNumber" contains the text "01234567890"

