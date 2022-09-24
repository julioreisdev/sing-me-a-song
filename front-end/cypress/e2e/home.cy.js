import { faker } from "@faker-js/faker";
import { vote } from './utils'

describe("Testa Home", () => {
  it("Deve criar uma recomendação", () => {
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "/recommendations").as("getRecommendations");
    const fake = {
      name: faker.lorem.words(2),
      link: `https://www.youtube.com/watch?list=RDAiay8I5IPB8&v=Aiay8I5IPB8`,
    };

    cy.get("#name").type(fake.name);
    cy.get("#link").type(fake.link);
    cy.intercept("POST", "/recommendations").as("postRecommendation");
    cy.get("#sand").click();
    cy.wait("@postRecommendation");
    cy.wait("@getRecommendations");
  });
  it("Dá upvote em uma recomendação", () => {
    cy.visit("http://localhost:3000");
    vote("#upvote");
  });
  it("Dá downvote em uma recomendação", () => {
    cy.visit("http://localhost:3000");
    vote("#downvote");
  });
});
