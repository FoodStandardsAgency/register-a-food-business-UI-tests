@beta_banner_SDB-373
Feature: As Catelyn I need to see that the service is in beta phase so that I can choose not to use the service and that some faults/bugs could happen

    Beta Banner validation

    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I open the url "mid-and-east-antrim/index"
        When I open the url "mid-and-east-antrim/operator-charity-details"
        Then I expect that element "commonElements.betaLink" is visible

    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I open the url "/cleansession"
        When I open the url "mid-and-east-antrim/customer-type"
        Then I expect that element "commonElements.betaLink" is visible

    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I open the url "/cleansession"
        When I open the url "mid-and-east-antrim/establishment-address"
        Then I expect that element "commonElements.betaLink" is visible

    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I open the url "/cleansession"
        When I open the url "mid-and-east-antrim/establishment-contact-details"
        Then I expect that element "commonElements.betaLink" is visible


    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I open the url "/cleansession"
        When I open the url "mid-and-east-antrim/establishment-trading-name"
        Then I expect that element "commonElements.betaLink" is visible

    @beta_banner_SDB-373
    Scenario: I want to fill in the feedback form
        Given I open the url "/cleansession"
        When I open the url "mid-and-east-antrim/operator-company-details"
        Then I expect that the attribute "href" from element "commonElements.betaLink" is "https://docs.google.com/forms/d/e/1FAIpQLSd78otan9gVxW-tIO6DDdqPdmKvm29Ssi9nWLkOOx1g8ddQjw/viewform"
        Given I click on the element "commonElements.betaLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened

    @beta_banner_SDB-373_summary_confirmation
    Scenario: I want to fill in the feedback form
        Given I open the url "/cleansession"
        Given I open the url "mid-and-east-antrim/summary-confirmation"
        Then I expect that the attribute "href" from element "commonElements.betaLink" is "https://docs.google.com/forms/d/e/1FAIpQLSd78otan9gVxW-tIO6DDdqPdmKvm29Ssi9nWLkOOx1g8ddQjw/viewform"
        Given I click on the element "commonElements.betaLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened













