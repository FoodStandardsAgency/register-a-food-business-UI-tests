@registration_summary
Feature: Summary Page

  @SDB-8_happy_path_navigation
    Scenario: navigate to declaration page
      Given I am on the registration summary page
      When I click continue
      Then I am taken to the declaration page

  @SDB-8_entered_data
    Scenario: data is displayed
      Given I have filled out the data in the previous sections
      When I am on the registration summary page
      Then The data I entered should be displayed

  @declaration_page_happy
    Scenario: missing data not displayed
      Given I have filled out the data in the previous sections
      When I am on the registration summary page
      Then The data I did not enter should not be displayed
