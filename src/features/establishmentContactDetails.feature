@establishment_address_contact_details
Feature: As Samantha I need to be able to fill in the establishment contact details so that Dani can contact the business if needed before or after an inspection

    Establishment address simple contact details section validation

    @SDB-1113_happy_path
    Scenario: happy path without optional field
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-contact-details"
        When I set "valid@email.com" to the inputfield "estabContactDetails.emailAddress"
        And I set "01234567890" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I click on the element "estabContactDetails.button"
        Then I expect the url to not contain "establishment-contact-details"

    @SDB-113_happy_path_all_fields
    Scenario: happy path with optional field
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-contact-details"
        When I set "valid@email.com" to the inputfield "estabContactDetails.emailAddress"
        And I set "01234567890" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I set "07788292121" to the inputfield "estabContactDetails.optionalPhoneNumber"
        And I click on the element "submitRegistration.button"
        Then I expect the url to not contain "establishment-contact-details"

    @SDB-113_invalid_email
    Scenario: invalid email address
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-contact-details"
        When I set "invalidemail" to the inputfield "estabContactDetails.emailAddress"
        And I set "01234567890" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I click on the element "estabContactDetails.button"
        Then I wait on element "estabContactDetails.error" to contain a text
        And I expect that element "estabContactDetails.error" contains the text "Not a valid establishment email address"
        And I expect that element "estabContactDetails.emailAddress" contains the text "invalidemail"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "01234567890"

    @SDB-113_invalid_phone_number
    Scenario: invalid phone number
        Given I open the url "/cleansession"
        Given I open the url "mid-and-east-antrim/establishment-contact-details"
        When I set "invalidnumber" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I set "valid@email.com" to the inputfield "estabContactDetails.emailAddress"
        And I click on the element "estabContactDetails.button"
        Then I wait on element "estabContactDetails.error" to contain a text
        And I expect that element "estabContactDetails.error" contains the text "Not a valid establishment phone number"
        And I expect that element "estabContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "invalidnumber"

    @SDB-113_no_email_address
    Scenario: no email address
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-contact-details"
        When I set "01234567890" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I click on the element "estabContactDetails.button"
        Then I wait on element "estabContactDetails.error" to contain a text
        And I expect that element "estabContactDetails.error" contains the text "Not a valid establishment email address"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "01234567890"

    @SDB-113_no_phone_number
    Scenario: no phone number
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-contact-details"
        When I set "valid@email.com" to the inputfield "estabContactDetails.emailAddress"
        And I click on the element "estabContactDetails.button"
        Then I wait on element "estabContactDetails.error" to contain a text
        And I expect that element "estabContactDetails.error" contains the text "Not a valid establishment phone number"
        And I expect that element "estabContactDetails.emailAddress" contains the text "valid@email.com"

    @SDB-113_invalid_optional_phone_number
    Scenario: invalid secondary phone number
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/establishment-contact-details"
        When I set "valid@email.com" to the inputfield "estabContactDetails.emailAddress"
        And I set "01234567890" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I set "§§§§" to the inputfield "estabContactDetails.optionalPhoneNumber"
        And I click on the element "estabContactDetails.button"
        Then I wait on element "estabContactDetails.error" to contain a text
        And I expect that element "estabContactDetails.error" contains the text "Not a valid establishment phone number"
        And I expect that element "estabContactDetails.emailAddress" contains the text "valid@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "01234567890"
        And I expect that element "estabContactDetails.optionalPhoneNumber" contains the text "§§§§"

    @SDB-113_happy_path_same_as_operator
    Scenario: happy path using operator details
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/establishment-contact-details" with injected "declaration" data
        When I click on the element "estabContactDetails.reuseButton"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "email@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "01234567890"
        When I click on the element "submitRegistration.button"
        Then I expect the url to not contain "establishment-contact-details"

    @SDB-113_happy_path_same_as_operator_overwrite
    Scenario: happy path using operator details overwriting
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/establishment-contact-details" with injected "declaration" data
        When I set "valid2nd@email.com" to the inputfield "estabContactDetails.emailAddress"
        And I set "07766292321" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I click on the element "estabContactDetails.reuseButton"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "email@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "01234567890"
        When I click on the element "submitRegistration.button"
        Then I expect the url to not contain "establishment-contact-details"

    @SDB-113_happy_path_same_as_operator_edit
    Scenario: happy path using operator details
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/establishment-contact-details" with injected "declaration" data
        And I open the url "mid-and-east-antrim/establishment-contact-details"
        When I click on the element "estabContactDetails.reuseButton"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "email@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "01234567890"
        When I add "addition" to the inputfield "estabContactDetails.emailAddress"
        And I add "addition" to the inputfield "estabContactDetails.primaryPhoneNumber"
        And I click on the element "estabContactDetails.reuseButton"
        And I click on the element "estabContactDetails.reuseButton"
        Then I expect that element "estabContactDetails.emailAddress" not contains the text "addition"
        And I expect that element "estabContactDetails.primaryPhoneNumber" not contains the text "addition"

    @SDB-113_same_as_operator_try_deselect
    Scenario: happy path using operator details deselect
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/establishment-contact-details" with injected "declaration" data
        And I open the url "mid-and-east-antrim/establishment-contact-details"
        And I click on the element "estabContactDetails.reuseButton"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "email@email.com"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "01234567890"
        When I add "addition" to the inputfield "estabContactDetails.emailAddress"
        And I add "addition" to the inputfield "estabContactDetails.primaryPhoneNumber"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "email@email.comaddition"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "01234567890addition"
        When I click on the element "estabContactDetails.reuseButton"
        Then I expect that element "estabContactDetails.emailAddress" contains the text "email@email.comaddition"
        And I expect that element "estabContactDetails.primaryPhoneNumber" contains the text "01234567890addition"