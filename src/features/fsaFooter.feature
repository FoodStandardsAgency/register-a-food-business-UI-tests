@fsa_footer_SDB-647
Feature: As Samantha, I can see the gov.uk footer and link to the privacy policy so that I can better control and understand the use of my data
    Footer
 
    @fsa_footer_SDB-647_happy_path
    Scenario: footer is visible
        Given I open the url "/cleansession"
        And I open the url "index"
        Then I expect that element "commonElements.fsaFooter" is visible
        Given I open the url "registration-role"
        Then I expect that element "commonElements.fsaFooter" is visible
        Given I open the url "operator-name"
        Then I expect that element "commonElements.fsaFooter" is visible


    @fsa_footer_SDB-647_cookie_policy
    Scenario: cookie policy in footer
        Given I open the url "/cleansession"
        When I open the url "index"
        Then I expect that element "commonElements.fsaFooter" is visible
        And I expect that element "commonElements.cookiePolicyFooter" contains the text "Cookies"
        Given I click on the element "commonElements.cookiePolicyFooter"
        Then I expect the url to contain "cookie-policy"

    @fsa_footer_SDB-647_privacy_policy
    Scenario: privacy policy in footer
        Given I open the url "/cleansession"
        When I open the url "index"
        Then I expect that element "commonElements.fsaFooter" is visible
        And I expect that element "commonElements.privacyPolicyFooter" contains the text "Privacy"
        Given I click on the element "commonElements.privacyPolicyFooter"
        Then I expect the url to contain "privacy-notice"

    @fsa_footer_language_link
    Scenario: change language link in footer
        Given I open the url "/cleansession"
        When I open the url "index"
        Then I expect that element "commonElements.languageFooter" is visible
        And I expect that element "commonElements.languageFooter" contains the text "Cymraeg"
        Given I click on the element "commonElements.languageFooter"
        And I pause for 10000ms
        Then I expect that element "commonElements.languageFooter" contains the text "English"
        Given I click on the element "commonElements.languageFooter"
        And I pause for 10000ms
        Then I expect that element "commonElements.languageCyHeader" contains the text "Cymraeg"