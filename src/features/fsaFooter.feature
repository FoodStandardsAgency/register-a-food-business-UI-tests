@fsa_footer_SDB-647
Feature: As Samantha, I can see the gov.uk footer and link to the privacy policy so that I can better control and understand the use of my data
    Footer
 
    @fsa_footer_SDB-647_happy_path
    Scenario: footer is visible
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/index"
        Then I expect that element "commonElements.fsaFooter" is visible
        Given I open the url "mid-and-east-antrim/registration-role"
        Then I expect that element "commonElements.fsaFooter" is visible
        Given I open the url "mid-and-east-antrim/operator-name"
        Then I expect that element "commonElements.fsaFooter" is visible


    @fsa_footer_SDB-647_cookie_policy
    Scenario: cookie policy in footer
        Given I open the url "/cleansession"
        When I open the url "mid-and-east-antrim/index"
        Then I expect that element "commonElements.fsaFooter" is visible
        And I expect that the attribute "href" from element "commonElements.cookiePolicyFooter" is "https://www.food.gov.uk/cookie-policy"
        Given I click on the element "commonElements.cookiePolicyFooter"
        And I pause for 1000ms
        Then I expect a new tab has been opened

    @fsa_footer_SDB-647_privacy_policy
    Scenario: privacy policy in footer
        Given I open the url "/cleansession"
        When I open the url "mid-and-east-antrim/index"
        Then I expect that element "commonElements.fsaFooter" is visible
        And I expect that the attribute "href" from element "commonElements.privacyPolicyFooter" is "https://www.food.gov.uk/about-us/register-a-food-business-privacy-notice"
        Given I click on the element "commonElements.cookiePolicyFooter"
        And I pause for 1000ms
        Then I expect a new tab has been opened

    @fsa_footer_language_link
    Scenario: change language link in footer
        Given I open the url "/cleansession"
        When I open the url "mid-and-east-antrim/index"
        Then I expect that element "commonElements.languageFooter" is visible
        And I expect that element "commonElements.languageFooter" contains the text "Cymraeg"
        Given I click on the element "commonElements.languageFooter"
        And I pause for 10000ms
        Then I expect that element "commonElements.languageFooter" contains the text "English"
        Given I click on the element "commonElements.languageFooter"
        And I pause for 10000ms
        Then I expect that element "commonElements.languageCyHeader" contains the text "Cymraeg"