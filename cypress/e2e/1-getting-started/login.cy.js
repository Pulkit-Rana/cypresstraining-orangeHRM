/// <reference types="cypress" />

describe("Tho test Login functionality and navigate to dashboard", () => {
    beforeEach(() => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/")
    })

    it("Validate Login Functionality", () => {
        cy.get(".orangehrm-login-container").should("be.visible")
        cy.get('[placeholder="Username"]').type("Admin", { force: true })
        cy.get('[placeholder="Password"]').type("admin123", { force: true })
        cy.get('[type="submit"]').click({ force: true })
        cy.get(".oxd-main-menu-item-wrapper").contains("Dashboard").should("have.class", "oxd-main-menu-item active")
    })
})