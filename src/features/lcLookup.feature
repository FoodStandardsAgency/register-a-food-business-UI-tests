@LC_Lookup_SDB-6
Feature: Local Council Lookup

Local Council Lookup section validation

    @LC_Lookup_SDB-6
    Scenario: happy path
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/declaration" with injected "declaration" data
        When I open the url "/summary-confirmation"
        Then the element ""submissionPage.districtCouncil" is visible

    @LC_Lookup_SDB-6_district_and_county
    Scenario: happy path with a district and county council
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/declaration" with injected "declaration" data
        And It is in a region with both a district and county council
        When I open the url "/summary-confirmation"
        Then I expect that the element ""submissionPage.districtCouncil" is visible
        And I expect that the element ""submissionPage.countyCouncil" is visible

