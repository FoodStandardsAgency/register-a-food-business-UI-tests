@beta_banner_SDB-373
Feature: As Catelyn I need to see that the service is in beta phase so that I can choose not to use the service and that some faults/bugs could happen

Beta Banner validation


# @beta_banner_SDB-373
# Scenario Outline: beta banner is visible
#     Given I reload my session
#     When I open the url <url>
#     Then I expect that element "commonElements.betaBeta" is visible

#     Examples:
#         | url                              |
#         | "/operator-charity-details"      |
#         | "/customer-type"                 |
#         | "/establishment-address"         |
#         | "/establishment-contact-details" |
#         | "/establishment-trading-name"    |
#         | "/"                              |
#         | "/operator-company-details"      |
#         | "/operator-name"                 |
#         | "/operator-type"                 |
#         | '/registration-role'             |
#         | "/registration-summary"          |
#         | "/declaration"                   |

    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I reload my session
        When I open the url "/operator-charity-details"
        Then I expect that element "commonElements.betaBeta" is visible

    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I reload my session
        When I open the url "/customer-type"
        Then I expect that element "commonElements.betaBeta" is visible

    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I reload my session
        When I open the url "/establishment-address"
        Then I expect that element "commonElements.betaBeta" is visible

    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I reload my session
        When I open the url "/establishment-contact-details"
        Then I expect that element "commonElements.betaBeta" is visible


    @beta_banner_SDB-373
    Scenario: beta banner is visible
        Given I reload my session
        When I open the url "/establishment-trading-name"
        Then I expect that element "commonElements.betaBeta" is visible

    @beta_banner_SDB-373
    Scenario: I want to fill in the feedback form
        Given I reload my session
        When I open the url "/operator-company-details"
        Then I expect that the attribute "href" from element "commonElements.betaLink" is "https://goo.gl/forms/WB5adxvWQdDIfVvs2"
        Given I click on the element "commonElements.betaLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened

    @beta_banner_SDB-373_summary_confirmation
    Scenario: I want to fill in the feedback form
        Given I reload my session
        And I go to a special QA page at url "https://register-a-food-business-dev.azurewebsites.net/qa/application-complete" with injected "registration-summary" data
        When I open the url "/application-complete"
        Then I expect that the attribute "href" from element "commonElements.betaLink" is "https://goo.gl/forms/WB5adxvWQdDIfVvs2"
        Given I click on the element "commonElements.betaLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened













