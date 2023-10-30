/// <reference types="cypress" />

import { Admin } from "../support/pageobjects/adminpage"
import { Dashboard } from "../support/pageobjects/dashboardpage"
import { Navigate } from "../support/pageobjects/navigate"

const dashboard = new Dashboard()
const admin = new Admin()
const navigate = new Navigate()

describe.only("To test Login functionality and navigate to dashboard", () => {
  beforeEach(() => {
    cy.login()
  })

  afterEach(() => {
    cy.logout()
  })

  it("Validating the tiles on the dashboard tab", () => {
    navigate.navigateToAdminPanel()
    dashboard.getDashboardTiles().should("have.length", 7)
    dashboard
      .getDashboardPage()
      .should("be.visible")
      .then($ele => {
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
