/// <reference types="cypress" />

import { LoginPage } from "../../support/pageobjects/loginpage"

const loginpage = new LoginPage()

describe("Tho test Login functionality and navigate to dashboard", () => {
    beforeEach(() => {
        cy.fixture("/Loginpage.json").as("data")
        cy.visit("https://opensource-demo.orangehrmlive.com/web/")
    })

    it("Validate Login Functionality", () => {
        cy.get("@data").then((data) => {
            loginpage.getLoginContainerUI().should("be.visible")
            loginpage.getUserName().type(data.userName, { force: true })
            loginpage.getuserPassword().type(data.password, { force: true })
            loginpage.getLoginSubmiButton().click({ force: true })
            loginpage.getDashboardTab().contains("Dashboard").should("have.class", "oxd-main-menu-item active")
        })
    })
})