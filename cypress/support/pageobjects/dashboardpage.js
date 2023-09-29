export class Dashboard {
  getDashboardTiles() {
    return cy.get(".oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-dashboard-widget")
  }

  getDashboardPage() {
    return cy.get(".oxd-grid-3.orangehrm-dashboard-grid")
  }
}
