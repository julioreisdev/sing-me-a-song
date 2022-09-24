export function vote(vote) {
  cy.request("GET", "http://localhost:5000/recommendations").then(
    (response) => {
      const recommendations = response.body;
      console.log(recommendations);
      if (recommendations.length !== 0) {
        cy.get(vote).click();
      }
    }
  );
}
