/// <reference types="cypress" />

describe("The sessions page", () => {
  it("should navigate to conference sessions page and view day filter buttons", () => {
    cy.visit("/conference");
    cy.get("h1").contains("View Sessions").click();
    cy.url().should("include", "/sessions");

    // validate that the buttons to filter by day exist

    cy.get("[data-cy=AllSessions]");
    cy.get("[data-cy=Wednesday]");
    cy.get("[data-cy=Thursday]");
    cy.get("[data-cy=Friday]");
  });
  // wednesday sessions
  it("should filter sessions and only display wednesday sessions when wednesday Button is clicked", () => {
    cy.get("[data-cy=Wednesday]").click();
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });
  // thursday sessions
  it("should filter sessions and only display thursday sessions when thursday Button is clicked", () => {
    cy.get("[data-cy=Thursday]").click();
    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });
  // thursday sessions
  it("should filter sessions and only display friday sessions when friday Button is clicked", () => {
    cy.get("[data-cy=Friday]").click();
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");
    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
  });
});
