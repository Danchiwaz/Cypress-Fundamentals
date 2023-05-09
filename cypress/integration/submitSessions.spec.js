/// <reference types="cypress" />

describe("Submit sessions", () => {
  // Run before each test in this describe block
  beforeEach(() => {
    cy.visit("/conference");
    cy.get("h1").contains("View Sessions").click();
    cy.url().should("include", "/sessions");

    // getting the link to submit a session
    cy.get("a").contains("Submit a Session!").click();
  });

  it("navigate to submit session page", () => {
    cy.url().should("include", "/sessions/new");
  });

  it("Should submit the session Successfully", () => {
    //    Filling the form with session information
    cy.contains("Title").type("New session title");
    cy.contains("Description").type("This is the session Description");
    cy.contains("Day").type("Thursday");
    cy.contains("Level").type("New Session level");

    // Submit the form
    cy.get("form").submit();

    // validate the form was submitted
    cy.contains("Session Submitted Successfully");
  });
});
