@processing_activities
Feature: Processing-Activities Page

    @processing_activities_page_happy
    Scenario: processing activities page check one box
        Given I open the url "/cleansession"
        And I open the url "processing-activities"
        When I click on the element "processingActivities.button"
        When I click on the element "processingActivities.firstCheckbox"
        Then I expect that checkbox "processingActivities.firstCheckbox" is checked
        When I click on the element "processingActivities.button"
        And I pause for 1000ms
        Then I expect the url to not contain "processing-activities"

          @processing_activities_page_happy
    Scenario: processing activities page check all boxes
        Given I open the url "/cleansession"
        And I open the url "processing-activities"
        When I click on the element "processingActivities.firstCheckbox"
        Then I expect that checkbox "processingActivities.firstCheckbox" is checked
        And I click on the element "processingActivities.secondCheckbox"
        Then I expect that checkbox "processingActivities.secondCheckbox" is checked
        And I click on the element "processingActivities.thirdCheckbox"
        Then I expect that checkbox "processingActivities.thirdCheckbox" is checked
        And I click on the element "processingActivities.fourthCheckbox"
        Then I expect that checkbox "processingActivities.fourthCheckbox" is checked
        When I click on the element "processingActivities.button"
        And I pause for 1000ms
        Then I expect the url to not contain "processing-activities"


    @processing_activities_page_happy
    Scenario: processing activities page check none box
        Given I open the url "/cleansession"
        And I open the url "processing-activities"
        When I click on the element "processingActivities.button"
        And I click on the element "processingActivities.fifthCheckbox"
        Then I expect that checkbox "processingActivities.fifthCheckbox" is checked
        When I click on the element "processingActivities.button"
        And I pause for 1000ms
        Then I expect the url to not contain "processing-activities"

    @processing_activities_page_happy
    Scenario: processing activities page check dont know box
        Given I open the url "/cleansession"
        And I open the url "processing-activities"
        When I click on the element "processingActivities.button"
        And I click on the element "processingActivities.sixthCheckbox"
        Then I expect that checkbox "processingActivities.sixthCheckbox" is checked
        When I click on the element "processingActivities.button"
        And I pause for 1000ms
        Then I expect the url to not contain "processing-activities"

         @processing_activities_page_happy
    Scenario: processing activities page check check first checkbox is unchecked after dont know checkbox is checked
        Given I open the url "/cleansession"
        And I open the url "processing-activities"
        When I click on the element "processingActivities.button"
        And I click on the element "processingActivities.firstCheckbox"
        Then I expect that checkbox "processingActivities.firstCheckbox" is checked
        And I click on the element "processingActivities.eigthCheckbox"
        Then I expect that checkbox "processingActivities.eigthCheckbox" is checked
        And I expect that checkbox "processingActivities.firstCheckbox" is not checked
        When I click on the element "processingActivities.button"
        And I pause for 1000ms
        Then I expect the url to not contain "processing-activities"

        @processing_activities_page_happy
    Scenario: processing activities page check check first checkbox is unchecked after none checkbox is checked
        Given I open the url "/cleansession"
        And I open the url "processing-activities"
        When I click on the element "processingActivities.button"
        And I click on the element "processingActivities.firstCheckbox"
        Then I expect that checkbox "processingActivities.firstCheckbox" is checked
        And I click on the element "processingActivities.seventhCheckbox"
        Then I expect that checkbox "processingActivities.seventhCheckbox" is checked
        And I expect that checkbox "processingActivities.firstCheckbox" is not checked
        When I click on the element "processingActivities.button"
        And I pause for 1000ms
        Then I expect the url to not contain "processing-activities"

        @processing_activities_pageS_invalid
    Scenario: processing activities page check invalid selection
        Given I open the url "/cleansession"
        And I open the url "processing-activities"
        When I click on the element "processingActivities.button"
        Then I expect that element "processingActivities.error" contains the text "Please select all options that apply to your business"