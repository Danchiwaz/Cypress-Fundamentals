/// <reference types="cypress" />



const thursdaySessionData = {
  "data": {
 "intro": [
   {
     "id": "78170",
     "title": "Cypress 9 Fundamentals",
     "startsAt": "8:30",
     "day": "Thursday",
     "room": "Jupiter",
     "level": "Introductory and overview",
     "speakers": [
       {
         "id": "37313769-11ae-4245-93b3-e6e60d5d187c",
         "name": "Adhithi Ravichandran",
         "__typename": "Speaker"
       }
     ],
     "__typename": "Session"
   } ,
   {
     "id": "123",
     "title": "GraphQL Fundamentals",
     "startsAt": "8:30",
     "day": "Thursday",
     "room": "Jupiter",
     "level": "Introductory and overview",
     "speakers": [
       {
         "id": "37313769-11ae-4245-93b3-e6e60d5d187c",
         "name": "Adhithi Ravichandran",
         "__typename": "Speaker"
       }
     ],
     "__typename": "Session"
   } 
 ],
  "intermediate": [
   {
     "id": "85324",
     "title": " Bamboo Spec",
     "startsAt": "8:30",
     "day": "Thursday",
     "room": "Io",
     "level": "Intermediate",
     "speakers": [
       {
         "id": "e9c40ccc-1ffd-44f5-90c2-9d69ada76073",
         "name": "Benjamin Cox",
         "__typename": "Speaker"
       }
     ],
     "__typename": "Session"
   }
 ],
 "advanced": [
   {
     "id": "84969",
     "title": "Microservices -- The Hard Way is the right Way",
     "startsAt": "9:45",
     "day": "Thursday",
     "room": "Ganymede",
     "level": "Advanced",
     "speakers": [
       {
         "id": "60e31e1b-2d77-4f36-8e11-4d9f8b639bc8",
         "name": "Joe Lopez",
         "__typename": "Speaker"
       }
     ],
     "__typename": "Session"
   }
 ]
}
}




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

    // cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionInfo");
    
    cy.get("@WednesdayBtn").click();
    // cy.wait(500)
    // cy.wait('@getSessionInfo');

    // assertions 
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });
  // thursday sessions
  it("should filter sessions and only display thursday sessions when thursday Button is clicked", () => {

     cy.intercept("POST", "http://localhost:4000/graphql", {
      fixture:"sessions.json"
     }).as("getSessionInfo");
    cy.get("@ThursdayBtn").click();
    // setting the wait period 
    cy.wait('@getSessionInfo');

    cy.get("[data-cy=day]").should("have.length", 4)



    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });
  // thursday sessions
  it("should filter sessions and only display friday sessions when friday Button is clicked", () => {
    cy.get("@FridayBtn").click();
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");
    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
  });
});


// Retry-ability - cypress only retries commands that query the DOM 
// commands that may change the state of application are not retried 

// CYPRESS NETWORK TESTING STRATEGY 



// a) Stub Responses => As a developer , you decide how the response should look like 
// => Extremely fast and reliable response with no flakiness in templateSettings(responses in less than 20ms)
// => Perfect JSON responses 
// => No test coverage on some server endpoints 




// b) Use Server Responses 
// => True end-to-end tests that wait for a response from the server 
// => Greate for traditional server-side HTML rendering 
// => Tests will be slower and unreliable(Needs to go through all the server layers of the server)


// NB
// Use stubbed response test more often for speed , simplicity and reliabilty. 
// Don't use stubbed responses for server-side render architecture. 
// Avoid stubs for critical paths like login 
// the intercept stub the server response 



// Air, car and hotel 