@error_summary_SDB-252
Feature: Back button SDB-252

Error summary box at the top of pages with multiple questions

  @enter_no_data_SDB-252
  Scenario: enter no data and select continue
    Given I reload my session
    And I open the url "/operator-address"
    When I click on the element "opAddress.button"
    And I expect that element "opAddress.errorSummary" contains the text "There is a problem"

  @enter_invalid_data_SDB-252
  Scenario: enter invalid data and select continue
    Given I reload my session
    And I open the url "/operator-address"
    And I set "±±±±" to the inputfield "opAddress.postcode"
    When I click on the element "opAddress.button"
    Then I expect that element "opAddress.errorSummary" contains the text "There is a problem"

  @fix_invalid_entry_SDB-252
  Scenario: enter invalid data, then valid data, then continue
    Given I reload my session
    And I open the url "/operator-address"
    And I set "±±±±" to the inputfield "opAddress.postcode"
    And I click on the element "opAddress.button"
    And I set "First Line" to the inputfield "opAddress.firstline"
    And I set "SW12 9RQ" to the inputfield "opAddress.postcode"
    When I click on the element "opAddress.button"
    Then I expect that the path is not "/operator-address"