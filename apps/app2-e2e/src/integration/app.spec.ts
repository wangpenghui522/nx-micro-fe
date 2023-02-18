describe('app2', () => {
  it('should display demo message', () => {
    cy.visit('/caizhi-app2/mylib/demo');
    cy.contains('h1', 'feature-mylib demo');
  });
});
