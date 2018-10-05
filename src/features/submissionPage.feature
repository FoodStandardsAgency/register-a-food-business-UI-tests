@submission_page
Feature: As Catelyn I need to be able to see the submission page and be able to find out more information about what happens next so that I can be successful in running my business.

    Submission Page with next steps and links

    @SDB-121_food_safety
    Scenario: I want to find out about food safety and how to run a food business
        Given I open the url "/cleansession"
        And I change my viewport
        And I go to a special QA page at url "/qa/mid-and-east-antrim/declaration" with injected "declaration" data
        And I click on the element "submitRegistration.firstCheckbox"
        And I click on the element "submitRegistration.secondCheckbox"
        And I click on the element "submitRegistration.thirdCheckbox"
        When I click on the element "submitRegistration.button"
        Then I expect the url to contain "summary-confirmation"
        Then I expect that the attribute "href" from element "submissionPage.foodSafetyLink" is "https://www.food.gov.uk/business-guidance"
        Given I click on the element "submissionPage.foodSafetyLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened

    @SDB-121_standard_guidance
    Scenario: I want to find out about standards guidance
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/declaration" with injected "declaration" data
        And I click on the element "commonElements.cookieAccept"
        And I click on the element "submitRegistration.firstCheckbox"
        And I click on the element "submitRegistration.secondCheckbox"
        And I click on the element "submitRegistration.thirdCheckbox"
        When I click on the element "submitRegistration.button"
        And I pause for 1000ms
        Then I expect the url to contain "summary-confirmation"
        And I expect that the attribute "href" from element "submissionPage.standardGuidanceLink" is "https://www.businesscompanion.info/en/in-depth-guides"
        Given I click on the element "submissionPage.standardGuidanceLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened

    @SDB-121_fhrs_score
    Scenario: I want to find out about fhrs scores
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/declaration" with injected "declaration" data
        And I click on the element "submitRegistration.firstCheckbox"
        And I click on the element "submitRegistration.secondCheckbox"
        And I click on the element "submitRegistration.thirdCheckbox"
        When I click on the element "submitRegistration.button"
        And I pause for 1000ms
        Then I expect the url to contain "summary-confirmation"
        And I expect that the attribute "href" from element "submissionPage.fhrsScoreLink" is "https://www.food.gov.uk/business-guidance/food-hygiene-ratings-for-businesses"
        Given I click on the element "submissionPage.fhrsScoreLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened


    @SDB-121_primary_authority
    Scenario: I want to find out about if i qualify for a primary authority partnership
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/declaration" with injected "declaration" data
        And I click on the element "submitRegistration.firstCheckbox"
        And I click on the element "submitRegistration.secondCheckbox"
        And I click on the element "submitRegistration.thirdCheckbox"
        When I click on the element "submitRegistration.button"
        And I pause for 1000ms
        Then I expect the url to contain "summary-confirmation"
        And I expect that the attribute "href" from element "submissionPage.primaryAuthorityLink" is "https://www.gov.uk/guidance/local-regulation-primary-authority"
        Given I click on the element "submissionPage.primaryAuthorityLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened


    @SDB-121_table_visible
    Scenario: I want to see my registration info
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/declaration" with injected "declaration" data
        And I click on the element "submitRegistration.firstCheckbox"
        And I click on the element "submitRegistration.secondCheckbox"
        And I click on the element "submitRegistration.thirdCheckbox"
        When I click on the element "submitRegistration.button"
        And I pause for 1000ms
        Then I expect the url to contain "summary-confirmation"
        Then I expect that element "submissionPage.table" is visible
        And I expect that element "submissionPage.establishmentAddress" is visible









