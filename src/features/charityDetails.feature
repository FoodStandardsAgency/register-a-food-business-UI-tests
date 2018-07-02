# @charity_details_SDB-40
# Feature: Testing charity details page: As Jamie I want to declare the details of the charity which operates the food business, so that I register with the correct details

# Charity Details section validation

#     @charity_details_happy_path_SDB-40
#     Scenario: testing charity details happy path
#         Given I open the url "http://localhost:3000/ADD"
#         When I set "Charity Name example" to the inputfield "charityDetails.charityName"
#         And I set "12345678" to the inputfield "charityDetails.charityNumber"
#         Then I click on the element "charityDetails.button"
#         Then I expect that the url is not "http://localhost:3000/ADD"
