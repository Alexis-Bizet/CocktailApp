describe('Cocktail App', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'https://www.thecocktaildb.com/api/json/v1/1/random.php', { fixture: 'cocktail.json' }).as('fetchCocktails');
  });

  it('effectue une requête API', () => {
    cy.request('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(response => {
        cy.writeFile('cypress/fixtures/cocktail.json', response.body);
      });

    cy.wait('@fetchCocktails');
    cy.get('.cocktail-container').should('be.visible');
    cy.get('.cocktail-content').should('have.length', 3);
  });

});
