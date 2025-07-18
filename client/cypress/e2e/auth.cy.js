describe('Authentication Flow', () => {
  it('registers, logs in, and accesses protected content', () => {
    cy.visit('/');

    // Register
    cy.contains('Register').click();
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.contains('Register').click();
    cy.contains('Already have an account? Login').click();

    // Login
    cy.get('input[name="email"]').clear().type('testuser@example.com');
    cy.get('input[name="password"]').clear().type('password123');
    cy.contains('Login').click();

    // Should see token snippet (logged in)
    cy.contains('Logged in! Token:').should('exist');
  });
}); 