import { vote } from "./utils";

describe("Testa Top", () => {
  it("Se existir, dá upvote em recomendação.", () => {
    cy.visit("http://localhost:3000/top");
    vote("#upvote");
  });
  it("Se existir, dá downvote em recomendação.", () => {
    cy.visit("http://localhost:3000/top");
    vote("#downvote");
  });
});
