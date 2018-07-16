@error_summary_SDB-252
Feature: Back button SDB-252

Error summary box at the top of pages with multiple questions

  @enter_no_data_SDB-252
  Scenario: enter no data and select continue
    Given I reload my session
    And I open the url "/operator-address"
    When I click on the element "opAddress.button"
    And I expect that element "opAddress.errorSummary" contains the text "There is a problem"
    And I expect that element "opAddress.errorSummaryFirstLine" is visible
    And I expect that element "opAddress.errorSummaryPostCode" contains the text "Not a valid postcode"

  #@enter_invalid_data_SDB-252

  #@fix_invalid_entry_SDB-252