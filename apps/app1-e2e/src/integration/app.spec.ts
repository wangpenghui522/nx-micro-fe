describe('app1', () => {
  it('should display demo message', () => {
    cy.visit('/caizhi-app1/mylib/demo');
    cy.contains('h1', 'feature-mylib demo');
  });
});
