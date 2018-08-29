@beta_banner_SDB-373
Feature: As Catelyn I need to see that the service is in beta phase so that I can choose not to use the service and that some faults/bugs could happen

Beta Banner validation

    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I open the url "index"
        When I open the url "operator-charity-details"
        Then I expect that element "commonElements.betaBeta" is visible

    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I open the url "/cleansession"
        When I open the url "customer-type"
        Then I expect that element "commonElements.betaBeta" is visible

    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I open the url "/cleansession"
        When I open the url "establishment-address"
        Then I expect that element "commonElements.betaBeta" is visible

    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I open the url "/cleansession"
        When I open the url "establishment-contact-details"
        Then I expect that element "commonElements.betaBeta" is visible


    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I open the url "/cleansession"
        When I open the url "establishment-trading-name"
        Then I expect that element "commonElements.betaBeta" is visible

    @beta_banner_SDB-373
    Scenario: I want to fill in the feedback form
        Given I open the url "/cleansession"
        When I open the url "operator-company-details"
        Then I expect that the attribute "href" from element "commonElements.betaLink" is "https://goo.gl/forms/WB5adxvWQdDIfVvs2"
        Given I click on the element "commonElements.betaLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened

    @beta_banner_SDB-373_summary_confirmation
    Scenario: I want to fill in the feedback form
        Given I go to a special QA page at url "/qa/summary-confirmation" with injected "registration-summary" data
        When I open the url "summary-confirmation"
        Then I expect that the attribute "href" from element "commonElements.betaLink" is "https://goo.gl/forms/WB5adxvWQdDIfVvs2"
        Given I click on the element "commonElements.betaLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened













