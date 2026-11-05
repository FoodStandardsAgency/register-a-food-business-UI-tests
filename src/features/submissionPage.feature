@submission_page
Feature: As Catelyn I need to be able to see the submission page and be able to find out more information about what happens next so that I can be successful in running my business.

    Submission Page with next steps and links 

    @SDB-121_food_safety
    Scenario: I want to find out about food safety and how to run a food business
        Given I open the url "/cleansession"
        And I open the url "summary-confirmation"
        Then I expect that the attribute "href" from element "submissionPage.foodSafetyLink" is "https://www.gov.uk/guidance/starting-a-food-business"
        Given I click on the element "submissionPage.foodSafetyLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened
        And I switch to the first tab

    @SDB-121_fhrs_score
    Scenario: I want to find out about fhrs scores
        Given I open the url "/cleansession"
        And I open the url "summary-confirmation"
        And I expect that the attribute "href" from element "submissionPage.fhrsScoreLink" is "https://www.gov.uk/government/publications/food-hygiene-rating-scheme-fhrs-guidance-for-businesses/food-hygiene-rating-scheme-fhrs-guidance-for-businesses"
        Given I click on the element "submissionPage.fhrsScoreLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened
        And I switch to the first tab

    @SDB-121_fhrs_score
    Scenario: I want to find out about food labelling and allergens
        Given I open the url "/cleansession"
        And I open the url "summary-confirmation"
        And I expect that the attribute "href" from element "submissionPage.foodLabellingLink" is "https://www.gov.uk/government/publications/food-allergen-labelling-and-information-requirements-technical-guidance/food-allergen-labelling-and-information-requirements-technical-guidance"
        Given I click on the element "submissionPage.foodLabellingLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened
        And I switch to the first tab

    @SDB-121_primary_authority
    Scenario: I want to find out about general guidance on business growth and finance
        Given I open the url "/cleansession"
        And I open the url "summary-confirmation"
        And I expect that the attribute "href" from element "submissionPage.safetyManagementLink" is "https://www.gov.uk/government/publications/safer-food-better-business-sfbb/safer-food-better-business-sfbb"
        Given I click on the element "submissionPage.safetyManagementLink"
        And I pause for 1000ms
        Then I expect a new tab has been opened
        And I switch to the first tab
