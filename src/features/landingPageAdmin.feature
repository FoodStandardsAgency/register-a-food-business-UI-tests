Feature: Landing Page
    Landing Page flows to next page
 
    @beginregistration
    Scenario: testing happy path for begin registration
        Given I open the adminportal "/"
        Then I expect that element "landingPage.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "landingPage.enterButton"
        Then I expect the url to contain "la"
        
    @editregistrationcouncilname
    Scenario: Editing the name of a local authority
        Given I open the adminportal "/"
        Then I expect that element "landingPage.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "landingPage.enterButton"
        Then I expect the url to contain "la"
        When I click on the element "landingPage.editButton"
        Then I expect that element "landingPage.editHeading" contains the text "Edit a Local Authority"
        And I set "New Fakes Council" to the inputfield "landingPage.countyName"
        When I click on the element "landingPage.button"
        Then I expect that element "landingPage.heading" contains the text "Check details before submit"
        When I click on the element "landingPage.button"
        Then I expect that element "landingPage.successMessage" contains the text "Local authority updated successfuly"
        Then I expect that element "landingPage.newCouncilName" contains the text "New Fakes Council"

    @editregistrationcouncilemail
    Scenario: Editing the email of a local authority
        Given I open the adminportal "/"
        Then I expect that element "landingPage.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "landingPage.enterButton"
        Then I expect the url to contain "la"
        When I click on the element "landingPage.editButton"
        Then I expect that element "landingPage.editHeading" contains the text "Edit a Local Authority"
        And I set "newfakecouncil@test.com" to the inputfield "landingPage.emailField"
        When I click on the element "landingPage.button"
        Then I expect that element "landingPage.heading" contains the text "Check details before submit"
        When I click on the element "landingPage.button"
        Then I expect that element "landingPage.successMessage" contains the text "Local authority updated successfuly"
        When I open the adminportal "/"
        Then I expect that element "landingPage.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "landingPage.enterButton"
        Then I expect the url to contain "la"
        Then I expect that element "landingPage.emailSummary" contains the text "newfakecouncil@test.com"

     @editregistrationcouncilnumber
     Scenario: Editing the number of a local authority
        Given I open the adminportal "/"
        Then I expect that element "landingPage.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "landingPage.enterButton"
        Then I expect the url to contain "la"
        When I click on the element "landingPage.editButton"
        Then I expect that element "landingPage.editHeading" contains the text "Edit a Local Authority"
        And I set "01234 456333" to the inputfield "landingPage.numberField"
        When I click on the element "landingPage.button"
        Then I expect that element "landingPage.heading" contains the text "Check details before submit"
        And I expect that element "landingPage.numberSummary" contains the text "01234 456333"
        When I click on the element "landingPage.button"
        Then I expect that element "landingPage.successMessage" contains the text "Local authority updated successfuly"

    @addnewcouncilauthority
    Scenario:Adding a new local authority
        Given I open the adminportal "/"
        Then I expect that element "landingPage.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "landingPage.enterButton"
        Then I expect the url to contain "la"
        When I click on the element "landingPage.addButton"
        Then I expect that element "landingPage.editHeading" contains the text "Add a Local Authority"
        And I set "4094" to the inputfield "landingPage.idInput"
        And I set "City council" to the inputfield "landingPage.nameInput"
        And I set "citycouncil@test.com" to the inputfield "landingPage.emailInput"
        And I set "fsatestemail.valid@gmail.com" to the inputfield "landingPage.notifyEmailInput"
        And I set "01239 876543" to the inputfield "landingPage.phoneNumberInput"
        And I select the 2nd option for element "landingPage.countryDropdown"
        And I set "city" to the inputfield "landingPage.localUrlInput"
        When I click on the element "landingPage.button"
        Then I expect that element "landingPage.heading" contains the text "Check details before submit"
        When I click on the element "landingPage.button"
        Then I expect that element "landingPage.successMessage" contains the text "Local authority added successfuly"
        And I expect that element "landingPage.newCouncil" contains the text "City council"

    @searchauthority
    Scenario: Searching for a local authority happy path 
        Given I open the adminportal "/"
        Then I expect that element "landingPage.heading" contains the text "Welcome to the Register a Food Business Administration Portal"
        When I click on the element "landingPage.enterButton"
        Then I expect the url to contain "la"
        And I set "City council" to the inputfield "landingPage.searchField"
        When I click on the element "landingPage.button"
        Then the element landingPage.tableField should contain the text "City council"
        
    @deletecouncilauthority
    Scenario: Deleting a local authority
        When I click on the element "landingPage.deleteLink"
        Then I expect that element "landingPage.successMessage" contains the text "Are you sure that you want to permanently delete the local authority?"
        When I click on the element "landingPage.deleteCheckbox"
        And I click on the element "landingPage.button"
        Then I expect the url to contain "/la/delete/4094"
    