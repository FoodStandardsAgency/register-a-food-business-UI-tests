@registrations_search

    @search_postcode
    Scenario: Searching the postcode of a registration entry
        Given I open the adminportal "/"
        Then I expect that element "registrationsSearch.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "registrationsSearch.registrationsLink"
        Then I expect that element "registrationsSearch.largeHeading" contains the text "Registrations"
        When I set "BH77 6HH" to the inputfield "registrationsSearch.searchPostcode"
        And I click on the element "registrationsSearch.button"
        Then I expect that element "registrationsSearch.businessName" contains the text "Recent registration 999"
        Then I expect that element "registrationsSearch.resultCount" contains the text "Showing 1-1 of 1 registrations"

    @search_false_postcode
    Scenario: Searching for an unregistered postcode
        Given I open the adminportal "/"
        Then I expect that element "registrationsSearch.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "registrationsSearch.registrationsLink"
        Then I expect that element "registrationsSearch.largeHeading" contains the text "Registrations"
        When I set "BH78 6HH" to the inputfield "registrationsSearch.searchPostcode"
        And I click on the element "registrationsSearch.button"
        Then I expect that element "registrationsSearch.businessName" contains the text "Recent registration 999"
        Then I expect that element "registrationsSearch.resultCount" contains the text "Showing 1-0 of 0 registrations"

    @search_multiple_criteria
    Scenario: Searching for registration by Postcode, FSA RN, Operator Name and Business Name 
        Given I open the adminportal "/"
        Then I expect that element "registrationsSearch.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "registrationsSearch.registrationsLink"
        Then I expect that element "registrationsSearch.largeHeading" contains the text "Registrations"
        When I set "NR14 7PZ" to the inputfield "registrationsSearch.searchPostcode"
        And I click on the element "registrationsSearch.button"
        Then I expect that element "registrationsSearch.businessName" contains the text "Recent registration 999"
        Then I expect that element "registrationsSearch.resultCount" contains the text "Showing 1-5 of 5 registrations"
        When I set "NR14 7PZ" to the inputfield "registrationsSearch.searchPostcode"
        And I set "Sammy Healey" to the inputfield "registrationsSearch.searchOperator"
        And I set "0101-FAILED-REG2" to the inputfield "registrationsSearch.registrationNumber"
        And I set "Failed registration 2" to the inputfield "registrationsSearch.searchBusinessName"
        And I click on the element "registrationsSearch.button"
        Then I expect that element "registrationsSearch.resultCount" contains the text "Showing 1-1 of 1 registrations"
        Then I expect that element "registrationsSearch.businessName" contains the text "Failed registration 2"

    @search_registration_number_happy_path
    Scenario: Searching for registration FSA RN
        Given I open the adminportal "/"
        Then I expect that element "registrationsSearch.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "registrationsSearch.registrationsLink"
        Then I expect that element "registrationsSearch.largeHeading" contains the text "Registrations"
        When I set "0004-EMAILS-FAILEDNOTIFICATIONS3" to the inputfield "registrationsSearch.registrationNumber"
        And I click on the element "registrationsSearch.button"
        Then I expect that element "registrationsSearch.resultCount" contains the text "Showing 1-1 of 1 registrations"
        Then I expect that element "registrationsSearch.businessName" contains the text "Failed registration 3"

    @search_registration_number_unhappy_path
    Scenario: Searching for registration FSA RN
        Given I open the adminportal "/"
        Then I expect that element "registrationsSearch.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "registrationsSearch.registrationsLink"
        Then I expect that element "registrationsSearch.largeHeading" contains the text "Registrations"
        When I set "0004-EMAILS-FAILEDNOTIFICAONS3" to the inputfield "registrationsSearch.registrationNumber"
        And I click on the element "registrationsSearch.button"
        Then I expect that element "registrationsSearch.resultCount" contains the text "Showing 1-0 of 0 registrations"

    @search_submission_date
    Scenario: Searching for registration by submission date rage
        Given I open the adminportal "/"
        Then I expect that element "registrationsSearch.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "registrationsSearch.registrationsLink"
        Then I expect that element "registrationsSearch.largeHeading" contains the text "Registrations"
        When I set "0004-EMAILS-NOFAILEDSTATUSES" to the inputfield "registrationsSearch.registrationNumber"
        When I click on the element "registrationsSearch.editRegistration"
        Then I expect that element "registrationsSearch.largeHeading" contains the text "Edit Registration
        When I set "10022020" to the inputfield "registrationsSearch.dateFromInput"
        When I set "13022020" to the inputfield "registrationsSearch.dateToInput"
        And I click on the element "registrationsSearch.button"
        Then I expect that element "registrationsSearch.businessName" contains the text "Failed Registration 1"
        Then I expect that element "registrationsSearch.resultCount" contains the text "Showing 1-1 of 1 registrations"

    




