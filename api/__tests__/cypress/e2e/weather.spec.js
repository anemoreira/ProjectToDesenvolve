describe('Weather App', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display weather data when a valid country is entered', () => {
        // Intercepta a requisição para a API e retorna uma resposta mockada
        cy.intercept('POST', '/submit-form', {
            statusCode: 200,
            body: {
                location: 'Brazil',
                weather: 'clear sky',
                temperature: 30,
                feels_like: 32,
                humidity: 60,
                pressure: 1015
            }
        }).as('postWeatherData');

        cy.get('#country').type('Brazil');
        cy.get('#weather-form').submit();

        // Verifica se o resultado é exibido corretamente
        cy.wait('@postWeatherData');
        cy.get('#result').should('contain', 'Clima em Brazil');
        cy.get('#result').should('contain', 'Descrição: clear sky');
        cy.get('#result').should('contain', 'Temperatura: 30°C');
        cy.get('#result').should('contain', 'Sensação Térmica: 32°C');
        cy.get('#result').should('contain', 'Umidade: 60%');
        cy.get('#result').should('contain', 'Pressão: 1015 hPa');
    });

    it('should display an error message when the country is not found', () => {
        cy.intercept('POST', '/submit-form', {
            statusCode: 404,
            body: { error: 'Country not found.' }
        }).as('postWeatherData');

        cy.get('#country').type('NonExistentCountry');
        cy.get('#weather-form').submit();

        // Verifica se a mensagem de erro é exibida corretamente
        cy.wait('@postWeatherData');
        cy.get('#result').should('contain', 'Country not found.');
    });
});
