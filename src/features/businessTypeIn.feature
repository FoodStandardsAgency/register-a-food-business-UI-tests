@business_Type_In_SDB-5
Feature: As Catelyn I need to be able to choose my business activities so that my business type can be objectively decided


  Scenario Outline: Business Type In Validation - Error Message
    Given I open the url "/cleansession"
    And I open the url "mid-and-east-antrim/business-type"
    When I set <businessType> to the inputfield "businessTypeIn.search"
    And I click on the element "businessTypeIn.button"
    Then I expect the url to contain "business-type"
    And I expect that element "businessTypeIn.error" contains the text "You must select a business type before continuing"


    Examples:
      | businessType |
      | "Egg"        |
      | "Restaurant" |
      | ""           |
      | "±±±"        |

  @business_Type_In_happy_path_SDB-5
  Scenario: testing business type in happy path
    When I set "Restaurant" to the inputfield "businessTypeIn.search"
    And I click on the element "businessTypeIn.option2"
    When I click on the element "businessTypeIn.button"
    And I click on the element "businessTypeIn.button"
    Then I expect the url to not contain "business-type"




