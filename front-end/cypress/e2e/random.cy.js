import { vote } from "./utils";

describe("Testa Random", () => {
  it("Se existir, dá upvote em recomendação.", () => {
    cy.visit("http://localhost:3000/random");
    vote("#upvote");
  });
  it("Se existir, dá downvote em recomendação.", () => {
    cy.visit("http://localhost:3000/random");
    vote("#downvote");
  });
});
