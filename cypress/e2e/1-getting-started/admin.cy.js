/// <reference types="cypress" />
import { LoginPage } from "../../support/pageobjects/loginpage"

const loginpage = new LoginPage()

describe("Tho test Login functionality and navigate to Admin Tab", () => {
    beforeEach(() => {
        cy.fixture("/loginpage.json").as("login")
        cy.get("@login").then((login) => {
            cy.login(login.userName, login.password)
        })
    })

    afterEach(() => {
        cy.logout()
    })

    it("Verify that the user is able to navigate to the Admin Tab & verify the page details", () => {
        loginpage.getSideMenu().contains("Admin").click({ force: true })
        loginpage.getSideMenu().contains("Admin").should("have.class", "oxd-main-menu-item active")
    })
})