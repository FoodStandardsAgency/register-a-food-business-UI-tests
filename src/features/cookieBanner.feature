@cookie_banner_SDB-500
Feature: As Catelyn I need to know that cookies are being used in this service, and how to find out more about what that means so I understand what pieces of information will be held about me

Cookie Banner validation

    @cookie_banner_SDB-500_happy_path
    Scenario: happy path for accepting
        Given I open the url "/cleansession"
        When I open the url "index"
        Then I expect that element "commonElements.cookieBanner" is visible
        When I click on the element "commonElements.cookieAccept"
        Then I expect that element "commonElements.cookieBanner" is not visible

    @cookie_banner_SDB-500_reject
    Scenario: happy path for rejecting
        Given I open the url "/cleansession"
        When I open the url "index"
        Then I expect that element "commonElements.cookieBanner" is visible
        When I click on the element "commonElements.cookieReject"
        Then I expect that element "commonElements.cookieRejectText" is visible
        When I click on the element "commonElements.cookieClose"
        Then I expect that element "commonElements.cookieBanner" is not visible







