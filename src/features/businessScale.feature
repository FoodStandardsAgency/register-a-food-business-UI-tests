@business_scale
Feature: Business Scale Page

    @business_scale_page_happy
    Scenario: business scale page check one box
        Given I open the url "/cleansession"
        And I open the url "business-scale"
        When I click on the element "businessScale.button"
        When I click on the element "businessScale.firstCheckbox"
        Then I expect that checkbox "businessScale.firstCheckbox" is checked
        When I click on the element "businessScale.button"
        And I pause for 1000ms
        Then I expect the url to not contain "business-scale"

          @business_scale_page_happy
    Scenario: business scale page check all boxes
        Given I open the url "/cleansession"
        And I open the url "business-scale"
        When I click on the element "businessScale.firstCheckbox"
        Then I expect that checkbox "businessScale.firstCheckbox" is checked
        And I click on the element "businessScale.secondCheckbox"
        Then I expect that checkbox "businessScale.secondCheckbox" is checked
        And I click on the element "businessScale.thirdCheckbox"
        Then I expect that checkbox "businessScale.thirdCheckbox" is checked
        And I click on the element "businessScale.fourthCheckbox"
        Then I expect that checkbox "businessScale.fourthCheckbox" is checked
        And I click on the element "businessScale.fifthCheckbox"
        Then I expect that checkbox "businessScale.fifthCheckbox" is checked
        And I click on the element "businessScale.sixthCheckbox"
        Then I expect that checkbox "businessScale.sixthCheckbox" is checked
        And I click on the element "businessScale.seventhCheckbox"
        Then I expect that checkbox "businessScale.seventhCheckbox" is checked
        When I click on the element "businessScale.button"
        And I pause for 1000ms
        Then I expect the url to not contain "business-scale"


    @business_scale_page_happy
    Scenario: business scale page check none box
        Given I open the url "/cleansession"
        And I open the url "business-scale"
        When I click on the element "businessScale.button"
        And I click on the element "businessScale.eigthCheckbox"
        Then I expect that checkbox "businessScale.eigthCheckbox" is checked
        When I click on the element "businessScale.button"
        And I pause for 1000ms
        Then I expect the url to not contain "business-scale"

    @business_scale_page_happy
    Scenario: business scale page check dont know box
        Given I open the url "/cleansession"
        And I open the url "business-scale"
        When I click on the element "businessScale.button"
        And I click on the element "businessScale.ninthCheckbox"
        Then I expect that checkbox "businessScale.ninthCheckbox" is checked
        When I click on the element "businessScale.button"
        And I pause for 1000ms
        Then I expect the url to not contain "business-scale"

         @business_scale_page_happy
    Scenario: business scale page check first checkbox is unchecked after dont know checkbox is checked
        Given I open the url "/cleansession"
        And I open the url "business-scale"
        When I click on the element "businessScale.button"
        And I click on the element "businessScale.firstCheckbox"
        Then I expect that checkbox "businessScale.firstCheckbox" is checked
        And I click on the element "businessScale.ninthCheckbox"
        Then I expect that checkbox "businessScale.ninthCheckbox" is checked
        And I expect that checkbox "businessScale.firstCheckbox" is not checked
        When I click on the element "businessScale.button"
        And I pause for 1000ms
        Then I expect the url to not contain "business-scale"

         @business_scale_page_happy
    Scenario: business scale page check first checkbox is unchecked after none checkbox is checked
        Given I open the url "/cleansession"
        And I open the url "business-scale"
        When I click on the element "businessScale.button"
        And I click on the element "businessScale.firstCheckbox"
        Then I expect that checkbox "businessScale.firstCheckbox" is checked
        And I click on the element "businessScale.eigthCheckbox"
        Then I expect that checkbox "businessScale.eigthCheckbox" is checked
        And I expect that checkbox "businessScale.firstCheckbox" is not checked
        When I click on the element "businessScale.button"
        And I pause for 1000ms
        Then I expect the url to not contain "business-scale"

    @business_scale_page_invalid
    Scenario: business scale page check invalid selection
        Given I open the url "/cleansession"
        And I open the url "business-scale"
        When I click on the element "businessScale.button"
        Then I expect that element "businessScale.error" contains the text "Please select all options that apply to your business"