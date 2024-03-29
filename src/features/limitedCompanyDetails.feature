@limited_company_details_SDB-36
Feature: Limited Company SDB-36

    Limited Company section validation

    @happy_path_SDB-36
    Scenario: happy path
        Given I open the url "mid-and-east-antrim/operator-company-details"
        And I click on the element "companyDetails.button"
        When I set "Bob's Burgers" to the inputfield "companyDetails.name"
        And I set "12345678" to the inputfield "companyDetails.companiesHouseNumber"
        And I click on the element "companyDetails.button"
        Then I expect the url to not contain "operator-company-details"

    @not_filled_in_name_SDB-36
    Scenario: not filled in company name
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/operator-company-details"
        When I set "12345678" to the inputfield "companyDetails.companiesHouseNumber"
        And I click on the element "companyDetails.button"
        Then I expect that element "companyDetails.error" contains the text "Enter a valid company name"
        And I expect that element "companyDetails.companiesHouseNumber" contains the text "12345678"

    @not_filled_in_number_SDB-36
    Scenario: not filled in company number
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/operator-company-details"
        When I set "Bob's Burgers" to the inputfield "companyDetails.name"
        And I click on the element "companyDetails.button"
        Then I expect that element "companyDetails.error" contains the text "Enter a valid Companies House reference number"
        And I expect that element "companyDetails.name" contains the text "Bob's Burgers"

    @invalid_number_SDB-36
    Scenario: invalid company number
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/operator-company-details"
        When I set "Diane's Diner" to the inputfield "companyDetails.name"
        And I set "§§21" to the inputfield "companyDetails.companiesHouseNumber"
        And I click on the element "companyDetails.button"
        Then I expect that element "companyDetails.error" contains the text "Enter a valid Companies House reference number"
        And I expect that element "companyDetails.name" contains the text "Diane's Diner"
        And I expect that element "companyDetails.companiesHouseNumber" contains the text "§§21"