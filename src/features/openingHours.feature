@opening_hours 
Feature: Opening Hours

    Opening Hours section validation

    @happy_path
    Scenario: happy path for Opening Hours
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        And I click on the element "openingDaysStart.button"
        When I click on the element "openingDaysStart.everyday"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-hours"
        When I set "09:00 to 20:00" to the inputfield "openingHours.monday"
        And I set "09:00 to 15:00" to the inputfield "openingHours.tuesday"
        And I set "08:00 to 17:00" to the inputfield "openingHours.wednesday"
        And I set "09:00 to 13:00" to the inputfield "openingHours.thursday"
        And I set "10:00 to 17:00" to the inputfield "openingHours.friday"
        And I set "10:00 to 22:00" to the inputfield "openingHours.saturday"
        And I set "07:00 to 17:00" to the inputfield "openingHours.sunday"
        And I click on the element "openingHours.button"
        Then I expect the url to not contain "opening-hours"

          @invalid_opening_hours_monday
    Scenario: opening hours monday empty
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.monday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I click on the element "openingHours.button"
        And I pause for 2000ms
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Monday using 24 hour clocks"

    @invalid_opening_hours_monday
    Scenario: opening hours monday too long
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.monday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I set "This is a paragraph containing more than 50 characters" to the inputfield "openingHours.monday"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Monday using 24 hour clocks"

    @invalid_opening_hours_tuesday
    Scenario: opening hours tuesday empty
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.tuesday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Tuesday using 24 hour clocks"

    @invalid_opening_hours_tuesday
    Scenario: opening hours tuesday too long
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.tuesday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I set "This is a paragraph containing more than 50 characters" to the inputfield "openingHours.tuesday"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Tuesday using 24 hour clocks"

    @invalid_opening_hours_wednesday
    Scenario: opening hours wednesday empty
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.wednesday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Wednesday using 24 hour clocks"

    @invalid_opening_hours_wednesday
    Scenario: opening hours wednesday too long
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.wednesday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I set "This is a paragraph containing more than 50 characters" to the inputfield "openingHours.wednesday"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Wednesday using 24 hour clocks"

    @invalid_opening_hours_thursday
    Scenario: opening hours thursday empty
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.thursday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Thursday using 24 hour clocks"

    @invalid_opening_hours_thursday
    Scenario: opening hours thursday too long
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.thursday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I set "This is a paragraph containing more than 50 characters" to the inputfield "openingHours.thursday"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Thursday using 24 hour clocks"

    @invalid_opening_hours_friday
    Scenario: opening hours friday empty
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.friday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Friday using 24 hour clocks"

    @invalid_opening_hours_friday
    Scenario: opening hours friday too long
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.friday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I set "This is a paragraph containing more than 50 characters" to the inputfield "openingHours.friday"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Friday using 24 hour clocks"

    @invalid_opening_hours_saturday
    Scenario: opening hours saturday empty
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.saturday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Saturday using 24 hour clocks"

    @invalid_opening_hours_saturday
    Scenario: opening hours saturday too long
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.saturday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I set "This is a paragraph containing more than 50 characters" to the inputfield "openingHours.saturday"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Saturday using 24 hour clocks"

    @invalid_opening_hours_sunday
    Scenario: opening hours sunday empty
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.sunday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Sunday using 24 hour clocks"

    @invalid_opening_hours_sunday
    Scenario: opening hours sunday too long
        Given I open the url "/cleansession"
        And I open the url "opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.sunday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-hours"
        When I set "This is a paragraph containing more than 50 characters" to the inputfield "openingHours.sunday"
        When I click on the element "openingHours.button"
        Then I expect that element "openingHours.error" contains the text "Enter the establishment opening hours for Sunday using 24 hour clocks"