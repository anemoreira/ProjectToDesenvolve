# WeatherAPI
This simple project aims to consume a time api and return data according to the search. 

## Executando requisição /GET
![WhatsApp Image 2024-09-08 at 18 06 06](https://github.com/user-attachments/assets/a223cb2c-8298-4357-a93c-ee9b17b57a1a)
The API returns weather data such as description, temperature, temperature sensation, humidity and pressure.
Search examples: London, New York, São Paulo, Tokyo, Paris...
![image](https://github.com/user-attachments/assets/535f1cfb-c54c-4864-8a68-67bc3a4fb4a4)

*BDD*
Feature: Weather query

  Scenario: Display weather information for a valid city
    Given that the user is on the home page
    When the user enters “London” in the city field
    And clicks the “Search Weather” button
    Then the weather information for “London” should be displayed

  Scenario: Display error message for an invalid city
    Given that the user is on the home page
    When the user enters “Invalid City” in the city field
    And clicks the “Search Weather” button
    Then an error message should be displayed

  Scenario: Display a warning if no city name is entered
    Given that the user is on the home page
    When the user does not enter any text in the city field
    And clicks the “Search Weather” button
    Then a warning message should be displayed





