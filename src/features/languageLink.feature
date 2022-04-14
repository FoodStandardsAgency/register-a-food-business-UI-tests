@language_link
Feature: Language link

Language link on the index page

@change_language_to_welsh_and_being_registration
Scenario: change language to Welsh, begin registration and then go back and change language to English
    Given I open the url "/cleansession"
    And I open the url "mid-and-east-antrim/index"
    Then I expect that element "commonElements.languageEnHeader" contains the text "English"
    Then I expect that element "commonElements.languageCyHeader" contains the text "Cymraeg"
    And I expect that the title is "Register a Food Business"
    And I expect that button "firstpage.button" contains the text "Begin registration"
    When I click on the element "commonElements.languageCyHeader"
    And I pause for 10000ms
    And I expect that the title is "Cofrestru Busnesau Bwyd"
    And I expect that button "firstpage.button" contains the text "Dechreuwch gofrestru"

    Given I click on the element "firstpage.button"
    Then I expect the url to contain "registration-role"
    When I click on the element "commonElements.backButton"
    And I expect that the title is "Cofrestru Busnesau Bwyd"
    And I click on the element "commonElements.languageEnHeader" 
    And I pause for 10000ms
    Then I expect that the title is "Register a Food Business"
