describe('Main App', () => {
  it('loads the home page and shows welcome message', () => {
    cy.visit('/');
    cy.contains('Welcome to the MERN Testing App');
  });

  it('shows error boundary when button throws error', () => {
    cy.visit('/');
    cy.contains('Throw Error').click();
    cy.contains('Something went wrong.');
  });
}); 