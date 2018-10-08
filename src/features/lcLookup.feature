@LC_Lookup_SDB-6
Feature: Local Council Lookup

    Local Council Lookup section validation

    @LC_Lookup_SDB-6
    Scenario: happy path
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/declaration" with injected "declaration" data
        And I click on the element "submitRegistration.firstCheckbox"
        And I click on the element "submitRegistration.secondCheckbox"
        And I click on the element "submitRegistration.thirdCheckbox"
        When I click on the element "submitRegistration.button"
        And I pause for 1000ms
        Then I expect the url to contain "summary-confirmation"
        And I expect that element "summaryConfirmation.hygieneAndStandardsCouncil" is visible

    @LC_Lookup_SDB-6_district_and_county
    Scenario: happy path with a district and county council
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/west-dorset/declaration" with injected "declaration" data
        And I click on the element "submitRegistration.firstCheckbox"
        And I click on the element "submitRegistration.secondCheckbox"
        And I click on the element "submitRegistration.thirdCheckbox"
        When I click on the element "submitRegistration.button"
        And I pause for 1000ms
        Then I expect the url to contain "summary-confirmation"
        And I expect that element "summaryConfirmation.hygieneCouncil" is visible
        And I expect that element "summaryConfirmation.standardsCouncil" is visible

