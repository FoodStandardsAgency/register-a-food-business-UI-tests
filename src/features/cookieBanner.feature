@cookie_banner_SDB-500
Feature: As Catelyn I need to know that cookies are being used in this service, and how to find out more about what that means so I understand what pieces of information will be held about me

    Cookie Banner validation

    @cookie_banner_SDB-500_happy_path
    Scenario: happy path for accepting
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/index"
        Then I expect that element "commonElements.cookieBanner" is visible
        When I click on the element "commonElements.cookieAccept"
        And I pause for 2000ms
        Then I expect that cookie "acceptAllCookies" exists
        And I expect that cookie "connect.sid" exists
        And I expect that cookie "_ga" exists
        And I expect that cookie "_gid" exists
        Then I expect that element "commonElements.cookieBanner" is not visible


    @cookie_banner_SDB-500_reject
    Scenario: happy path for rejecting
        Given I open the url "/cleansession"
        And I delete all my cookies
        And I open the url "mid-and-east-antrim/index"
        And I pause for 2000ms
        And the cookie "_ga" does exist
        And the cookie "_gid" does exist
        Then I expect that element "commonElements.cookieBanner" is visible
        When I click on the element "commonElements.cookieReject"
        Then I expect that element "commonElements.cookieBanner" is not visible
        And I expect that cookie "acceptAllCookies" exists
        And I expect that cookie "connect.sid" exists
        And I expect that cookie "_ga" not exists
        And I expect that cookie "_gid" not exists

    @cookie_banner_SDB-500_cookie_info
    Scenario: wanting to find more info on cookies
        Given I open the url "/cleansession"
        And I delete all my cookies
        When I open the url "mid-and-east-antrim/index"
        Then I expect that element "commonElements.cookieBanner" is visible
        And I expect that the attribute "href" from element "commonElements.cookieInfo" is "https://www.gov.uk/help/cookies"
        Given I click on the element "commonElements.cookieInfo"
        And I pause for 1000ms
        Then I expect a new tab has been opened


    @cookie_banner_SDB-500_cookie_policy
    Scenario: wanting to find more info on cookie policy
        Given I open the url "/cleansession"
        And I delete all my cookies
        When I open the url "mid-and-east-antrim/index"
        Then I expect that element "commonElements.cookieBanner" is visible
        And I expect that the attribute "href" from element "commonElements.cookiePolicy" is "https://www.food.gov.uk/cookie-policy"
        Given I click on the element "commonElements.cookiePolicy"
        And I pause for 1000ms
        Then I expect a new tab has been opened











