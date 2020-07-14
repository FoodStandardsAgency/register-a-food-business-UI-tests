@submission_page
Feature: As Catelyn I need to be able to see the submission page and be able to find out more information about what happens next so that I can be successful in running my business.

    Submission Page with next steps and links

    @SDB-121_food_safety
    Scenario: I want to find out about food safety and how to run a food business
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/summary-confirmation"
        Then I expect that the attribute "href" from element "submissionPage.foodSafetyLink" is "https://www.food.gov.uk/business-guidance"
        Given I click on the element "submissionPage.foodSafetyLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened
        And I switch to the first tab

    @SDB-121_fhrs_score
    Scenario: I want to find out about fhrs scores
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/summary-confirmation"
        And I expect that the attribute "href" from element "submissionPage.fhrsScoreLink" is "https://www.food.gov.uk/business-guidance/food-hygiene-ratings-for-businesses"
        Given I click on the element "submissionPage.fhrsScoreLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened
        And I switch to the first tab

    @SDB-121_standard_guidance
    Scenario: I want to find out about information on the food safety management system
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/summary-confirmation"
        And I expect that the attribute "href" from element "submissionPage.safetyManagementLink" is "https://www.food.gov.uk/business-guidance/safer-food-better-business"
        Given I click on the element "submissionPage.safetyManagementLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened
        And I switch to the first tab

    @SDB-121_fhrs_score
    Scenario: I want to find out about food labelling and allergens
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/summary-confirmation"
        And I expect that the attribute "href" from element "submissionPage.foodLabellingLink" is "https://www.food.gov.uk/business-guidance/industry-specific-advice/labelling-and-allergens"
        Given I click on the element "submissionPage.foodLabellingLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened
        And I switch to the first tab

    @SDB-121_primary_authority
    Scenario: I want to find out about general guidance on business growth and finance
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/summary-confirmation"
        And I expect that the attribute "href" from element "submissionPage.businessGuidanceLink" is "https://www.nibusinessinfo.co.uk/"
        Given I click on the element "submissionPage.businessGuidanceLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened
        And I switch to the first tab

    @SDB-121_table_visible
    Scenario: I want to see my registration info
        Given I open the url "/cleansession"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/declaration" with injected "declaration" data
        And I click on the element "submitRegistration.firstCheckbox"
        And I pause for 1000ms
        And I click on the element "submitRegistration.secondCheckbox"
        And I pause for 1000ms
        And I click on the element "submitRegistration.thirdCheckbox"
        And I pause for 1000ms
        When I click on the element "submitRegistration.button"
        And I pause for 5000ms
        Then I expect the url to contain "summary-confirmation"
        And I expect that element "submissionPage.establishmentDetailsTable" is visible
        And I expect that element "submissionPage.operatorDetailsTable" is visible
        And I expect that element "submissionPage.foodActivitiesTable" is visible
        And I expect that element "submissionPage.declarationTable" is visible