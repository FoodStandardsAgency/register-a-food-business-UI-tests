@charity_details_SDB-40
Feature: Testing charity details page: As Jamie I want to declare the details of the charity which operates the food business, so that I register with the correct details

    Charity Details section validation

  Scenario Outline: Charity Details section validation - Error Messages
    Given I open the url "/cleansession"
    And I open the url "mid-and-east-antrim/operator-charity-details"
    When I set <charityName> to the inputfield "charityDetails.charityName"
    And I set <charityNumber> to the inputfield "charityDetails.charityNumber"
    Then I click on the element "charityDetails.button"
    And I expect the url to not contain "operator-charity-details"
    And I expect that element "charityDetails.charityNumber" contains the text <charityNumber>
    And I expect that element "charityDetails.charityName" contains the text <charityName>


    Examples:
      | charityName                                              | charityNumber |
      | "Charity Name example"                                   | "±±±±±±±"     |
      | ""                                                       | "12345678"    |
      | "1234567890 1234567890 1234567890 1234567890 1234567890" | "1234556"     |


  @charity_details_more_info_SDB-40
  Scenario: testing more info for charity details
    Given I open the url "/cleansession"
    And I open the url "mid-and-east-antrim/operator-charity-details"
    When I click on the element "charityDetails.questionsCharityReference"
    Then I expect that the attribute "href" from element "charityDetails.link" is "https://beta.charitycommission.gov.uk/"
    Given I click on the element "charityDetails.link"
    And I pause for 1000ms
    Then I expect a new tab has been opened


