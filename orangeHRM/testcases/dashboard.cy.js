/// <reference types="cypress" />
import { Dashboard } from "../support/pageobjects/dashboardpage"
import { LoginPage } from "../support/pageobjects/loginpage"

const dashboard = new Dashboard()
const loginpage = new LoginPage()

describe.only("To test Login functionality and navigate to dashboard", () => {
  beforeEach(() => {
    cy.login()
  })

  afterEach(() => {
    cy.logout()
  })

  it("Validating the tiles on the dashboard tab", () => {
    navigateToAdminPanel()
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
function navigateToAdminPanel() {
  loginpage.getSideMenu().contains("Dashboard").click({ force: true })
  loginpage.getSideMenu().contains("Dashboard").should("have.class", "oxd-main-menu-item active")
}
