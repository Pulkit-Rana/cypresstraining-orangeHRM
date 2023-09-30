export class Admin {
  getTobBar() {
    return cy.get(".oxd-topbar-body-nav")
  }

  getSearchPanel() {
    return cy.get(".oxd-form-row")
  }

  getSearchButton() {
    return cy.get(".oxd-form-actions button")
  }

  getAddButton() {
    return cy.get(".orangehrm-header-container > .oxd-button")
  }

  getListingPanel() {
    return cy.get(".orangehrm-container")
  }

  getUsernameColumn() {
    return cy.get("div:nth-child(n+1) > div > div:nth-child(2) > div")
  }

  getListingRow() {
    return cy.get(".oxd-table-row.oxd-table-row--with-border")
  }

  getRowData() {
    return cy.get(".oxd-table-card")
  }

  getStatusAndRoleDropdowns() {
    return cy.get(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow")
  }

  getDropdownBox() {
    return cy.get(".oxd-select-dropdown.--positon-bottom")
  }

  getDropdownList() {
    return cy.get(".oxd-select-option span")
  }

  getEmployeeName() {
    return cy.get(".oxd-autocomplete-text-input > input", { timeout: 9000 })
  }

  getEmployeeNameDropdown() {
    return cy.get(".oxd-autocomplete-dropdown.--positon-bottom", { timeout: 9000 })
  }

  getEmployeeNameList() {
    return cy.get('[role="option"] span', { timeout: 9000 })
  }

  getAddUserInputFields() {
    return cy.get(".oxd-input-group .oxd-input")
  }

  getAddUserButton() {
    return cy.get(".oxd-button--secondary")
  }

  getSuccessToast() {
    return cy.get("#oxd-toaster_1")
  }

  getEditUserHeading() {
    return cy.get(".orangehrm-card-container h6")
  }

  getChangePassowrdCheckBox() {
    return cy.get('.oxd-checkbox-wrapper [type="checkbox"]')
  }

  getConfirmDeleteButton() {
    return cy.get(".oxd-button--label-danger")
  }
}
