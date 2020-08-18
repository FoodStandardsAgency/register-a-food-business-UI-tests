@partnership
Feature: partnership



    Scenario: Deleting partner
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/partner-name" with injected "two-partnership" data
        Then I expect that element "partnerName.partnerOne" contains the text "one"
        And I expect that element "partnerName.partnerTwo" contains the text "two"
        And I expect that element "#continue-button" does exist
        When I click on the element "partnerName.deletePartnerButton0"
        Then I expect that element "#continue-button" does not exist
        And I expect that element "partnerName.partnerOne" contains the text "two"

    

@unhappy_paths
    Scenario: no selection on main-partnership-contact
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/main-partnership-contact" with injected "two-partnership" data
        Then I expect that element "mainPartnershipContact.partnerOne" contains the text "one"
        And I expect that element "mainPartnershipContact.partnerTwo" contains the text "two"
        When I click on the element "commonElements.continueButton"
        Then I expect that element "mainPartnershipContact.error" contains the text "You must select the main partnership contact before continuing"

    Scenario: no name on partner details
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/partner-details" with injected "two-partnership" data
        When I set "" to the inputfield "partnerDetails.partner_name"
        And I click on the element "commonElements.continueButton"
        Then I expect that element "commonElements.error" contains the text "Not a valid name"

    Scenario: Very long name on partner details
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/partner-details" with injected "two-partnership" data
        When I set "This is text containing more than 255 characters. This is text containing more than 255 characters. This is text containing more than 255 characters. This is text containing more than 255 characters. This is text containing more than 255 characters. 012345" to the inputfield "partnerDetails.partner_name"
        And I click on the element "commonElements.continueButton"
        Then I expect that element "commonElements.error" contains the text "Not a valid name"
