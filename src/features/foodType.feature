@food_type
Feature: Food Type Page

    @food_type_page_happy
    Scenario: food type page check one box
        Given I open the url "/cleansession"
        And I open the url "food-type"
        When I click on the element "foodType.button"
        When I click on the element "foodType.firstCheckbox"
        Then I expect that checkbox "foodType.firstCheckbox" is checked
        When I click on the element "foodType.button"
        And I pause for 1000ms
        Then I expect the url to not contain "food-type"

          @food_type_page_happy
    Scenario: food_type page check all boxes
        Given I open the url "/cleansession"
        And I open the url "food-type"
        When I click on the element "foodType.firstCheckbox"
        Then I expect that checkbox "foodType.firstCheckbox" is checked
        And I click on the element "foodType.secondCheckbox"
        Then I expect that checkbox "foodType.secondCheckbox" is checked
        And I click on the element "foodType.thirdCheckbox"
        Then I expect that checkbox "foodType.thirdCheckbox" is checked
        And I click on the element "foodType.fourthCheckbox"
        Then I expect that checkbox "foodType.fourthCheckbox" is checked
        When I click on the element "foodType.button"
        And I pause for 1000ms
        Then I expect the url to not contain "food-type"


    @food_type_page_happy
    Scenario: food type page check none box
        Given I open the url "/cleansession"
        And I open the url "food-type"
        When I click on the element "foodType.button"
        And I click on the element "foodType.fifthCheckbox"
        Then I expect that checkbox "foodType.fifthCheckbox" is checked
        When I click on the element "foodType.button"
        And I pause for 1000ms
        Then I expect the url to not contain "food-type"

    @food_type_page_happy
    Scenario: food type page check dont know box
        Given I open the url "/cleansession"
        And I open the url "food-type"
        When I click on the element "foodType.button"
        And I click on the element "foodType.sixthCheckbox"
        Then I expect that checkbox "foodType.sixthCheckbox" is checked
        When I click on the element "foodType.button"
        And I pause for 1000ms
        Then I expect the url to not contain "food-type"

         @food_type_page_happy
    Scenario: food type page check first checkbox is unchecked after dont know checkbox is checked
        Given I open the url "/cleansession"
        And I open the url "food-type"
        When I click on the element "foodType.button"
        And I click on the element "foodType.firstCheckbox"
        Then I expect that checkbox "foodType.firstCheckbox" is checked
        And I click on the element "foodType.sixthCheckbox"
        Then I expect that checkbox "foodType.sixthCheckbox" is checked
        And I expect that checkbox "foodType.firstCheckbox" is not checked
        When I click on the element "foodType.button"
        And I pause for 1000ms
        Then I expect the url to not contain "food-type"

         @food_type_page_happy
    Scenario: food type page check first checkbox is unchecked after none checkbox is checked
        Given I open the url "/cleansession"
        And I open the url "food-type"
        When I click on the element "foodType.button"
        And I click on the element "foodType.firstCheckbox"
        Then I expect that checkbox "foodType.firstCheckbox" is checked
        And I click on the element "foodType.fifthCheckbox"
        Then I expect that checkbox "foodType.fifthCheckbox" is checked
        And I expect that checkbox "foodType.firstCheckbox" is not checked
        When I click on the element "foodType.button"
        And I pause for 1000ms
        Then I expect the url to not contain "food-type"

     @food_type_page_invalid
    Scenario: food_type page check invalid selection
        Given I open the url "/cleansession"
        And I open the url "food-type"
        When I click on the element "foodType.button"
        Then I expect that element "foodType.error" contains the text "Please select all options that apply to your business"