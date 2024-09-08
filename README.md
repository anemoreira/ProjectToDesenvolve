# WeatherAPI
This simple project aims to consume a time api and return data according to the search. 

## Executing a request /GET

![WhatsApp Image 2024-09-08 at 18 06 06 (2)](https://github.com/user-attachments/assets/58180464-2471-4227-8480-817902ea4445)

The API returns weather data such as description, temperature, temperature sensation, humidity and pressure.
Search examples: London, New York, São Paulo, Tokyo, Paris...

![image](https://github.com/user-attachments/assets/1afbf20e-0168-4469-87a5-40b4b2fe26e8)

*BDD*
Feature: Weather query

  Scenario: Display weather information for a valid city
    Given that the user is on the home page\
    When the user enters “London” in the city field\
    And clicks the “Search Weather” button\
    Then the weather information for “London” should be displayed

  Scenario: Display error message for an invalid city
    Given that the user is on the home page\
    When the user enters “Invalid City” in the city field\
    And clicks the “Search Weather” button\
    Then an error message should be displayed

  Scenario: Display a warning if no city name is entered
    Given that the user is on the home page\
    When the user does not enter any text in the city field\
    And clicks the “Search Weather” button\
    Then a warning message should be displayed





