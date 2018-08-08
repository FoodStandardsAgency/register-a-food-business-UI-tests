@establishment_opening_date
Feature: testing establishment opening status and date

Establishment opening status and date

    @SDB-114_trading_date_proactive_happy_path
    Scenario: proactive trading date happy path
        Given I reload my session
        And I open the url "/establishment-opening-status"
        When I click on the element "estabOpeningDate.notTrading"
        And I click on the element "estabOpeningDate.button"
        Then I expect that the path is "/establishment-opening-date-proactive"
        And I set "29" to the inputfield "estabOpeningDate.day"
        And I set "03" to the inputfield "estabOpeningDate.month"
        And I set "2999" to the inputfield "estabOpeningDate.year"
        And I click on the element "estabOpeningDate.button"
        And I expect that the path is not "/establishment-opening-date-proactive"

    @SDB-114_trading_date_proactive_no_dates
    Scenario: proactive trading date no dates
        Given I reload my session
        And I open the url "/establishment-opening-status"
        When I click on the element "estabOpeningDate.notTrading"
        And I click on the element "estabOpeningDate.button"
        Then I expect that the path is "/establishment-opening-date-proactive"
        And I click on the element "estabOpeningDate.button"
        And I expect that the path is "/establishment-opening-date-proactive"
        Then I expect that element "estabOpeningDate.error" contains the text "Not a valid opening date"

    @SDB-114_trading_date_proactive_past_date
    Scenario: proactive trading date past date
        Given I reload my session
        And I open the url "/establishment-opening-status"
        When I click on the element "estabOpeningDate.notTrading"
        And I click on the element "estabOpeningDate.button"
        Then I expect that the path is "/establishment-opening-date-proactive"
        And I set "29" to the inputfield "estabOpeningDate.day"
        And I set "03" to the inputfield "estabOpeningDate.month"
        And I set "1999" to the inputfield "estabOpeningDate.year"
        And I click on the element "estabOpeningDate.button"
        And I expect that the path is "/establishment-opening-date-proactive"
        Then I expect that element "estabOpeningDate.error" contains the text "Not a valid opening date"

    @SDB-114_trading_date_proactive_invalid_date
    Scenario: proactive trading date invalid date
        Given I reload my session
        And I open the url "/establishment-opening-status"
        When I click on the element "estabOpeningDate.notTrading"
        And I click on the element "estabOpeningDate.button"
        Then I expect that the path is "/establishment-opening-date-proactive"
        And I set "abc" to the inputfield "estabOpeningDate.day"
        And I set "28974" to the inputfield "estabOpeningDate.month"
        And I set "§§§" to the inputfield "estabOpeningDate.year"
        And I click on the element "estabOpeningDate.button"
        And I expect that the path is "/establishment-opening-date-proactive"
        Then I expect that element "estabOpeningDate.error" contains the text "Not a valid opening date"

    @SDB-115_trading_date_retroactive_happy_path
    Scenario: retroactive trading date happy path
        Given I reload my session
        And I open the url "/establishment-opening-status"
        When I click on the element "estabOpeningDate.alreadyTrading"
        And I click on the element "estabOpeningDate.button"
        Then I expect that the path is "/establishment-opening-date-retroactive"
        And I set "29" to the inputfield "estabOpeningDate.day"
        And I set "03" to the inputfield "estabOpeningDate.month"
        And I set "1999" to the inputfield "estabOpeningDate.year"
        And I click on the element "estabOpeningDate.button"
        And I expect that the path is not "/establishment-opening-date-retroactive"

    @SDB-115_trading_date_reatroactive_no_dates
    Scenario: retroactive trading date no dates
        Given I reload my session
        And I open the url "/establishment-opening-status"
        When I click on the element "estabOpeningDate.alreadyTrading"
        And I click on the element "estabOpeningDate.button"
        Then I expect that the path is "/establishment-opening-date-retroactive"
        And I click on the element "estabOpeningDate.button"
        And I expect that the path is "/establishment-opening-date-retroactive"
        Then I expect that element "estabOpeningDate.error" contains the text "Not a valid opening date"

    @SDB-115_trading_date_retroactive_future_date
    Scenario: retroactive trading date future date
        Given I reload my session
        And I open the url "/establishment-opening-status"
        When I click on the element "estabOpeningDate.alreadyTrading"
        And I click on the element "estabOpeningDate.button"
        Then I expect that the path is "/establishment-opening-date-retroactive"
        And I set "29" to the inputfield "estabOpeningDate.day"
        And I set "03" to the inputfield "estabOpeningDate.month"
        And I set "2999" to the inputfield "estabOpeningDate.year"
        And I click on the element "estabOpeningDate.button"
        And I expect that the path is "/establishment-opening-date-retroactive"
        Then I expect that element "estabOpeningDate.error" contains the text "Not a valid opening date"

    @SDB-115_trading_date_retroactive_invalid_date
    Scenario: retroactive trading date invalid date
        Given I reload my session
        And I open the url "/establishment-opening-status"
        When I click on the element "estabOpeningDate.alreadyTrading"
        And I click on the element "estabOpeningDate.button"
        Then I expect that the path is "/establishment-opening-date-retroactive"
        And I set "abc" to the inputfield "estabOpeningDate.day"
        And I set "28974" to the inputfield "estabOpeningDate.month"
        And I set "§§§" to the inputfield "estabOpeningDate.year"
        And I click on the element "estabOpeningDate.button"
        And I expect that the path is "/establishment-opening-date-retroactive"
        Then I expect that element "estabOpeningDate.error" contains the text "Not a valid opening date"
