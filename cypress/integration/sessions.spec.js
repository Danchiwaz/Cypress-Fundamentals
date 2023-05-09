/// <reference types="cypress" />

describe("The sessions page", () => {
  // before each function and defining aliases 
  beforeEach(() => {
    cy.visit("/conference");
    cy.get("h1").contains("View Sessions").click();
    cy.url().should("include", "/sessions");

    // define the aliases in before each function 

    cy.get("[data-cy=AllSessions]").as("AllSessionsBtn");
    cy.get("[data-cy=Wednesday]").as("WednesdayBtn");
    cy.get("[data-cy=Thursday]").as("ThursdayBtn")
    cy.get("[data-cy=Friday]").as("FridayBtn")

  })
  it("should navigate to conference sessions page and view day filter buttons", () => {
    
    // validate that the buttons to filter by day exist

    cy.get("@AllSessionsBtn");
    cy.get("@WednesdayBtn");
    cy.get("@ThursdayBtn");
    cy.get("@FridayBtn");
  });
  // wednesday sessions
  it("should filter sessions and only display wednesday sessions when wednesday Button is clicked", () => {
    cy.get("[data-cy=Wednesday]").click();
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
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


// Retry-ability - cypress only retries commands that query the DOM 
// commands that may change the state of application are not retried 