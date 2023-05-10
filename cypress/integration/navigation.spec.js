/// <reference types="cypress" />



describe("Navigation", () =>{
    it("Should navigate to conference page", () =>{
        cy.ClickViewSessions();

        cy.url().should("include","/sessions");
    })
})


// cypress Hooks 
// before(() =>{
//     root-level Hook
//     run once before all tests
// })

// beforeEach(()=>{
//     root-level hook 
//      runs before every test block 
// })

// afterEach(() =>{
//     run after each test block 
// })
// after(() =>{
//     run once after all test are done 
// })