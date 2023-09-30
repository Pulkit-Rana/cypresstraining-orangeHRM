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
const encryptor = require("simple-encryptor")(Cypress.env("info"))

Cypress.Commands.add("login", () => {
  cy.visit("/")
  loginpage.getLoginContainerUI().should("be.visible")
  loginpage.getUserName().type(Cypress.env("userName"), { force: true })
  loginpage.getuserPassword().type(encryptor.decrypt(Cypress.env("password")), { log: false })
  loginpage.getLoginSubmiButton().click({ force: true })
  loginpage.getSideMenu().contains("Dashboard").should("have.class", "oxd-main-menu-item active")
})

Cypress.Commands.add("logout", () => {
  cy.get(".oxd-userdropdown").click({ force: true })
  cy.get(".oxd-topbar-header-userarea ul li").should("have.class", "--active oxd-userdropdown")
  cy.get('[href="/web/index.php/auth/logout"]').click({ force: true })
})

Cypress.Commands.add("clearThenType", { prevSubject: true }, (locator, text) => {
  cy.wrap(locator).clear({ force: true })
  cy.wrap(locator).type(text, { force: true })
})
