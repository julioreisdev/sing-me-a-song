describe("Testa navegação entre rotas", () => {
  it("Deve ir para localhost:3000/ ao clicar em home.", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Home").click();
    cy.url().should("equals", "http://localhost:3000/");
  });

  it("Deve ir para localhost:3000/top ao clicar em top.", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Top").click();
    cy.url().should("equals", "http://localhost:3000/top");
  });

  it("Deve ir para localhost:3000/random ao clicar em random.", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Random").click();
    cy.url().should("equals", "http://localhost:3000/random");
  });
});
