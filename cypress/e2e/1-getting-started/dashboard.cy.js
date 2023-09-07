/// <reference types="cypress" />

import { LoginPage } from "../../support/pageobjects/loginpage"

const loginpage = new LoginPage()

describe("Tho test Login functionality and navigate to dashboard", () => {
    beforeEach(() => {
        cy.fixture("/Loginpage.json").as("login")
        cy.get("@login").then((login) => {
            cy.login(login.userName, login.password)
        })
    })

    afterEach(() => {
        cy.logout()
    })

    it("Validating the tiles on the dashboard tab", () => {
        cy.get(".oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-dashboard-widget").should("have.length", 7)
        cy.get(".oxd-grid-3.orangehrm-dashboard-grid").should("be.visible").then($ele => {
            expect($ele.text())
                .include("Time at Work")
                .and.include("My Action")
                .and.include("Quick Launch")
                .and.include("Buzz Latest Posts")
                .and.include("Employees on Leave Today")
                .and.include("Employee Distribution by Sub Unit")
                .and.include("Employee Distribution by Location")
        })
    })
})

