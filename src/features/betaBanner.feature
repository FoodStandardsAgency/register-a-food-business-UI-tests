@beta_banner_SDB-373
Feature: As Catelyn I need to see that the service is in beta phase so that I can choose not to use the service and that some faults/bugs could happen

Beta Banner validation


    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I want to register a service 
        When I start using the service
        Then I can see the banner on all pages

