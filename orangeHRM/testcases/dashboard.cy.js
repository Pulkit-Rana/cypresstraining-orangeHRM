/// <reference types="cypress" />

import { Dashboard } from "../support/pageobjects/dashboardpage"

const dashboard = new Dashboard()

describe("Tho test Login functionality and navigate to dashboard", () => {
  beforeEach(() => {
    cy.login()
  })

  afterEach(() => {
    cy.logout()
  })

  it("Validating the tiles on the dashboard tab", () => {
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
