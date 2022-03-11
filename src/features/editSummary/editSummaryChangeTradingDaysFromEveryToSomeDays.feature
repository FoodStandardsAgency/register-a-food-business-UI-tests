@SDB-1091_Change_Trading_Days_Every_Day_to_Some_Days
Feature: Change trading days from every day to some days a week

  @SDB-1091_Change_Trading_Days_Every_Day_to_Some_Days
  Scenario: Change trading days from every day to some days a week
    Given I open the url "/cleansession"
    And I go to a special QA page at url "/qa/mid-and-east-antrim/registration-summary" with injected "registration-summary-trading-every-day" data
    And I click on the element "commonElements.button"
    When I click on the element "registrationSummary.changeOpeningDays"
    Then I expect the url to contain "opening-days-start?edit=opening-days-start"
    And I expect that element "openingDaysStart.everyday" is selected
    When I click on the element "openingDaysStart.someDays"
    And I click on the element "openingDaysStart.button"
    Then I expect the url to contain "opening-days-some?edit=opening-days-start"
    When I click on the element "openingDaysSome.monday"
    And I click on the element "openingDaysSome.tuesday"
    And I click on the element "openingDaysSome.button"
    Then I expect the url to contain "opening-hours"
    When I set "09:00 to 20:00" to the inputfield "openingHours.monday"
    When I set "09:00 to 15:00" to the inputfield "openingHours.tuesday"
    And I click on the element "openingHours.button"
    Then I expect the url to contain "registration-summary"
    And I expect that element "registrationSummary.openingDaysMonday" contains the text "Monday"
    And I expect that element "registrationSummary.openingDaysTuesday" contains the text "Tuesday"
