@error_summary_SDB-252
Feature: Error Summary SDB-252

  Error summary box at the top of pages with multiple questions
@enter_no_data_SDB-252
  Scenario: enter no data and select continue
    Given I open the url "/cleansession"
    And I open the url "operator-name"
    When I click on the element "opContactName.button"
    When I click on the element "opContactName.button"
    And I expect that element "opContactName.error" contains the text "Enter a valid first name"

  @enter_invalid_data_SDB-252
  Scenario: enter invalid data and select continue
    Given I open the url "/cleansession"
    And I open the url "operator-name"
    And I set "this is more than 255 characters. this is more than 255 characters. this is more than 255 characters. this is more than 255 characters. this is more than 255 characters. this is more than 255 characters. this is more than 255 characters. this is more than 255 characters. this is more than 255 characters." to the inputfield "opContactName.firstName"
    When I click on the element "opContactName.button"
    Then I expect that element "opContactName.error" contains the text "Enter a valid first name"

  @fix_invalid_entry_SDB-252
  Scenario: enter invalid data, then valid data, then continue
    Given I open the url "/cleansession"
    And I open the url "operator-name"
    And I set "±±±±" to the inputfield "opContactName.firstName"
    And I click on the element "opContactName.button"
    And I set "First Line" to the inputfield "opContactName.lastName"
    And I set "Bob" to the inputfield "opContactName.firstName"
    When I click on the element "opContactName.button"
    Then I expect the url to not contain "operator-name"