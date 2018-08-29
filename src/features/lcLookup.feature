@LC_Lookup_SDB-6
Feature: Local Council Lookup

Local Council Lookup section validation

    @LC_Lookup_SDB-6
    Scenario: happy path
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/cardiff/declaration" with injected "declaration" data
        When I open the url "cardiff/summary-confirmation"
        Then the element ""summaryConfirmation.hygieneAndStandardsCouncil" is visible

    @LC_Lookup_SDB-6_district_and_county
    Scenario: happy path with a district and county council
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/west-dorset/declaration" with injected "declaration" data
        When I open the url "west-dorset/summary-confirmation"
        Then I expect that the element ""summaryConfirmation.hygieneCouncil" is visible
        And I expect that the element ""summaryConfirmation.standardsCouncil" is visible

