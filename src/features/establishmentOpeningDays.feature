@establishment_opening_days_SDB-52 
Feature: Establishment opening days SDB-52

    Establishment opening days section validation


    @opening_days_some_registration_summary_SDB-124
    Scenario: selects all options and summary page displays everyday
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-start"
         And I click on the element "openingDaysStart.button"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.monday"
        And I pause for 1000ms
        When I click on the element "openingDaysSome.tuesday"
        And I pause for 1000ms
        When I click on the element "openingDaysSome.wednesday"
        And I pause for 1000ms
        When I click on the element "openingDaysSome.thursday"
        And I pause for 1000ms
        When I click on the element "openingDaysSome.friday"
        And I pause for 1000ms
        When I click on the element "openingDaysSome.saturday"
        And I pause for 1000ms
        When I click on the element "openingDaysSome.sunday"
        And I pause for 1000ms
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I set "09:00 to 20:00" to the inputfield "openingHours.monday"
        When I set "09:00 to 15:00" to the inputfield "openingHours.tuesday"
        When I set "09:00 to 15:00" to the inputfield "openingHours.wednesday"
        When I set "09:00 to 13:00" to the inputfield "openingHours.thursday"
        When I set "09:00 to 15:00" to the inputfield "openingHours.friday"
        When I set "09:00 to 15:00" to the inputfield "openingHours.saturday"
        When I set "09:00 to 15:00" to the inputfield "openingHours.sunday"
        And I click on the element "openingHours.button"
        Then I expect the url to not contain "opening-hours"
        And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary" data
        Then I expect that element "registrationSummary.openingDays" contains the text "Monday"
 
    @happy_path_opening_days_irregular
    Scenario: Types in text in irregular field details
        Given I open the url "mid-and-east-antrim/opening-days-irregular"
        When I set "Only open Christmas" to the inputfield "openingDaysIrregular.otherDaysIrregular"
        And I click on the element "openingDaysIrregular.button"
        Then I expect the url to not contain "opening-days-irregular"

    @invalid_opening_days_irregular
    Scenario: Invalid other details
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-irregular"
        When I set "This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters." to the inputfield "openingDaysIrregular.otherDaysIrregular"
        When I click on the element "openingDaysIrregular.button"
        Then I expect that element "openingDaysIrregular.error" contains the text "Please describe when this establishment is open"
        And I expect that element "openingDaysIrregular.otherDaysIrregular" contains the text "This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters. This is a paragraph containing more than 1500 characters."


