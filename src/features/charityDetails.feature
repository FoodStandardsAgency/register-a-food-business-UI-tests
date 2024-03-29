@charity_details_SDB-40
Feature: Testing charity details page: As Jamie I want to declare the details of the charity which operates the food business, so that I register with the correct details

    Charity Details section validation

    @charity_details_happy_path_SDB-40
    Scenario: testing charity details happy path
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/operator-charity-details"
        Then I click on the element "charityDetails.button"
        When I set "Charity Name example" to the inputfield "charityDetails.charityName"
        Then I click on the element "charityDetails.button"
        And I expect the url to not contain "operator-charity-details"

    @charity_details_happy_path_with_number_SDB-40
    Scenario: testing charity details happy path
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/operator-charity-details"
        When I set "Charity Name example" to the inputfield "charityDetails.charityName"
        And I set "12345678" to the inputfield "charityDetails.charityNumber"
        Then I click on the element "charityDetails.button"
        And I expect the url to not contain "operator-charity-details"

    @charity_details_not_filled_name_SDB-40
    Scenario: testing error message when not input charity name
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/operator-charity-details"
        When I set "12345678" to the inputfield "charityDetails.charityNumber"
        And I click on the element "charityDetails.button"
        Then I expect that element "charityDetails.error" contains the text "Enter a valid charity, organisation or trust name"
        And I expect that element "charityDetails.charityNumber" contains the text "12345678"


    @charity_details_invalid_number_SDB-40
    Scenario: testing error message when input invalid charity number
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/operator-charity-details"
        When I set "Charity Name example" to the inputfield "charityDetails.charityName"
        And I set "±±±±" to the inputfield "charityDetails.charityNumber"
        And I click on the element "charityDetails.button"
        Then I expect that element "charityDetails.error" contains the text "Enter a valid charity number"
        And I expect that element "charityDetails.charityName" contains the text "Charity Name example"

    @charity_details_link_SDB-40
    Scenario: I want to find out my charity reference number
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/operator-charity-details"
        And I click on the element "charityDetails.questionsCharityReference"
        And I expect that the attribute "href" from element "charityDetails.link" is "http://apps.charitycommission.gov.uk/Showcharity/RegisterOfCharities/registerhomepage.aspx"
        Given I click on the element "charityDetails.link"
        And I pause for 1000ms
        Then I expect a new tab has been opened

