/// <reference types="cypress" />

describe("Tho test Login functionality and navigate to Admin Tab", { retries: 3 }, () => {

    it("Verify that the user is able to navigate to the Admin Tab & verify the page details", () => {
        cy.visit("/")
        cy.xpath(`//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input`).type("Admin")
    })
})