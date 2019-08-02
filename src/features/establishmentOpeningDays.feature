@establishment_opening_days_SDB-52
Feature: Establishment opening days SDB-52

    Establishment opening days section validation

    @change_opening_days_SDB-52
    Scenario: able to change over all opening days
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-start"
        When I click on the element "openingDaysStart.everyday"
        And I click on the element "openingDaysStart.someDays"
        Then I expect that element "openingDaysStart.someDays" is selected
        And I expect that checkbox "openingDaysStart.everyday" is not checked

    @happy_path_everyday_SDB-52
    Scenario: happy path for opening-days-start - everyday
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-start"
        When I click on the element "openingDaysStart.everyday"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to not contain "opening-days-start"

    @happy_path__someDays_SDB-52
    Scenario: happy path for opening-days-start - someDays
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"

    @happy_path_irregularDays_SDB-52
    Scenario: happy path for opening-days-start - irregularDays
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-start"
        When I click on the element "openingDaysStart.irregularDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-irregular"

    @not_selected_opening_days_start_SDB-52
    Scenario: error shows when no opening-days-start radio button is selected
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-start"
        When I click on the element "openingDaysStart.button"
        Then I expect that element "openingDaysStart.error" contains the text "Please select which days this establishment is open"

    @can_not_deselect_opening_days_start_option_SDB-52
    Scenario: I can not deselect every day
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-start"
        When I click on the element "openingDaysStart.everyday"
        And I click on the element "openingDaysStart.everyday"
        Then I expect that element "openingDaysStart.everyday" is selected

    @opening_days_some_happy_path_SDB-52
    Scenario: able to select one statement and proceed
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-some"
        When I click on the element "openingDaysSome.monday"
        And I click on the element "openingDaysSome.button"
        Then I expect the url to not contain "opening-days-some"

    @opening_days_some_no_selection_SDB-124
    Scenario: not selected any options and tries to continue
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-some"
        When I click on the element "openingDaysSome.button"
        Then I expect the url to contain "opening-days-some"
        And I expect that element "openingDaysSome.error" contains the text "Please select which days this establishment is open"

    @opening_days_some_deselect_SDB-124
    Scenario: selects one option and then deselects it
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-some"
        When I click on the element "openingDaysSome.saturday"
        And I pause for 1000ms
        And I click on the element "openingDaysSome.saturday"
        Then I expect that element "openingDaysSome.saturday" is not selected


    @opening_days_somes_forward_then_back_SDB-52
    Scenario: selects one option and then deselects it
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-start"
        When I click on the element "openingDaysStart.someDays"
        And I click on the element "openingDaysStart.button"
        Then I expect the url to contain "opening-days-some"
        When I click on the element "openingDaysSome.monday"
        And I pause for 1000ms
        And I click on the element "openingDaysSome.tuesday"
        And I pause for 1000ms
        And I click on the element "openingDaysSome.button"
        Then I expect the url to not contain "opening-days-some"
        When I click on the element "commonElements.backButton"
        Then I expect that element "openingDaysSome.monday" is selected
        And I expect that element "openingDaysSome.tuesday" is selected

    @opening_days_some_registration_summary_SDB-124
    Scenario: selects all options and summary page displays everyday
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/opening-days-start"
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
        And I click on the element "commonElements.continueButton"
        Then I expect that element "registrationSummary.openingDays" contains the text "Every day"

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

