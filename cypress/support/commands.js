// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { LoginPage } from "./pageobjects/loginpage"

const loginpage = new LoginPage()

Cypress.Commands.add("login", (userName, password) => {
    cy.visit("/")
    loginpage.getLoginContainerUI().should("be.visible")
    loginpage.getUserName().type(userName, { force: true })
    loginpage.getuserPassword().type(password, { force: true })
    loginpage.getLoginSubmiButton().click({ force: true })
    loginpage.getSideMenu().contains("Dashboard").should("have.class", "oxd-main-menu-item active")
})

Cypress.Commands.add("logout", () => {
    cy.get(".oxd-userdropdown").click({ force: true })
    cy.get(".oxd-topbar-header-userarea ul li").should("have.class", "--active oxd-userdropdown")
    cy.get('[href="/web/index.php/auth/logout"]').click({ force: true })
})

Cypress.Commands.add("clearThenType", { prevSubject: true }, (locator, text) => {
    cy.wrap(locator).clear({ force: true }).type(text, { force: true })
})
