@outline
Feature: scenario outline

  Scenario Outline: Customer Type validation
    Given I open the url "/cleansession"
    And I open the url "mid-and-east-antrim/customer-type"
    When I click on the element <element>
    And I click on the element "custType.button"
    Then I expect the url to not contain "customer-type"

    Examples:
      | element                   |
      | "custType.supplyOther"    |
      | "custType.supplyDirectly" |


