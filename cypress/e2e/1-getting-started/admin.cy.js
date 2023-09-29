/// <reference types="cypress" />
import { Admin } from "../../support/pageobjects/adminpage"
import { LoginPage } from "../../support/pageobjects/loginpage"

const loginpage = new LoginPage()
const admin = new Admin()

const encryptor = require("simple-encryptor")(Cypress.env("info"))

describe("Tho test Login functionality and navigate to Admin Tab", () => {
  beforeEach(() => {
    cy.fixture("/adminpage.json").as("adminpage")
    cy.login()
  })

  it("Verify that the user is able to navigate to the Admin Tab & verify the page details & invoke the employee name for Admin", () => {
    cy.get("@adminpage").then(adminpage => {
      navigateToAdminPanel()
      admin.getTobBar().find("ul").should("be.visible")
      admin.getSearchPanel().should("be.visible")
      admin.getListingPanel().should("be.visible")
      admin
        .getUsernameColumn()
        .contains(adminpage.searchName)
        .parentsUntil(".oxd-table-card")
        .find("div:nth-child(4) > div")
        .invoke("text")
        .as("empName")
        .then($empName => {
          let empName = $empName.split(" ")[0]
          cy.log(empName)
          cy.readFile("cypress/fixtures/adminpage.json", err => {
            if (err) {
              return cy.log(err)
            }
          }).then(text => {
            text.empName = empName
            cy.writeFile("cypress/fixtures/adminpage.json", JSON.stringify(text))
          })
        })
    })
  })

  it("Verify the headers", () => {
    navigateToAdminPanel()
    admin
      .getListingRow()
      .find("div")
      .then($data => {
        expect($data.text())
          .include("UsernameAscendingDescending")
          .and.include("User RoleAscendingDescending")
          .and.include("Employee NameAscendingDescending")
          .and.include("Status")
          .and.include("Actions")
      })
  })

  it("Verify that the search functionality is working", () => {
    cy.intercept("GET", "/web/index.php/api/**/admin/users?**").as("page")
    cy.intercept("GET", "/web/index.php/api/**/pim/employees?**").as("results")
    cy.get("@adminpage").then(adminpage => {
      navigateToAdminPanel()
      admin.getSearchPanel().should("be.visible")
      admin.getSearchPanel().find(".oxd-input.oxd-input--active").type(adminpage.searchName)
      cy.wait("@page")
      admin
        .getStatusAndRoleDropdowns()
        .first()
        .click({ force: true })
        .then(() => {
          admin.getDropdownBox().should("be.visible")
          admin.getDropdownList().contains(adminpage.searchName).click({ force: true })
        })
      admin.getEmployeeName().type(adminpage.empName, { delay: 300 })
      admin.getEmployeeNameDropdown().should("be.visible")
      admin.getEmployeeNameList().first().click({ force: true })
      cy.wait("@results")
      admin
        .getStatusAndRoleDropdowns()
        .last()
        .click({ force: true })
        .then(() => {
          admin.getDropdownBox().should("be.visible")
          admin.getDropdownList().contains("Enabled").click({ force: true })
        })
      cy.get(".oxd-form-actions button").contains("Search").click({ force: true })
      cy.wait("@page")
      cy.get(".oxd-table-card").should("have.length", 1)
    })
  })

  it("Verify Add User Functionality", () => {
    cy.intercept("GET", "/web/index.php/api/**/admin/users?**").as("add")
    cy.intercept("GET", "/web/index.php/api/**/pim/employees?**").as("results")
    cy.get("@adminpage").then(adminpage => {
      let decryptPass = encryptor.decrypt(adminpage.addPassword)
      navigateToAdminPanel()
      cy.get(".orangehrm-header-container > .oxd-button").click({ force: true })
      cy.wait("@add")
      cy.reload()
      admin
        .getStatusAndRoleDropdowns()
        .first()
        .click({ force: true })
        .then(() => {
          admin.getDropdownBox().should("be.visible")
          admin.getDropdownList().contains(adminpage.searchName).click({ force: true })
        })
      cy.get(".oxd-autocomplete-text-input > input", { timeout: 9000 }).type(adminpage.empName, {
        delay: 300,
      })
      admin.getEmployeeNameDropdown().should("be.visible")
      admin.getEmployeeNameList().first().click({ force: true })
      cy.wait("@results")
      admin
        .getStatusAndRoleDropdowns()
        .last()
        .click({ force: true })
        .then(() => {
          admin.getDropdownBox().should("be.visible")
          admin.getDropdownList().contains("Enabled").click({ force: true })
        })
      admin.getAddUserInputFields().first().type(adminpage.addUserName, { force: true })
      admin.getAddUserInputFields().eq(1).type(decryptPass, { force: true }, { log: false })
      admin.getAddUserInputFields().eq(2).type(decryptPass, { force: true }, { log: false })
      admin.getAddUserButton().click({ force: true })
      admin.getSuccessToast().should("be.visible")
    })
  })

  it("Verify Edit Functionality", () => {
    cy.intercept("GET", "/web/index.php/api/**/admin/users?**").as("add")
    cy.intercept("GET", "/web/index.php/api/**/pim/employees?**").as("results")
    cy.get("@adminpage").then(adminpage => {
      let updatedPassword = encryptor.decrypt(adminpage.addPassword)
      navigateToAdminPanel()
      admin
        .getListingRow()
        .contains(adminpage.addUserName)
        .parentsUntil(".oxd-table-card")
        .find(".oxd-table-cell-actions .oxd-icon.bi-pencil-fill")
        .click({ force: true })
      cy.wait("@add")
      admin.getEditUserHeading().should("have.text", "Edit User")
      admin.getEmployeeName().type("{del}{selectall}{backspace}")
      admin
        .getStatusAndRoleDropdowns()
        .first()
        .click({ force: true })
        .then(() => {
          admin.getDropdownBox().should("be.visible")
          admin.getDropdownList().contains(adminpage.searchName).click({ force: true })
        })
      admin.getEmployeeName().type(adminpage.empName, { delay: 300 }, { timeout: 6000 })
      admin.getEmployeeNameDropdown().should("be.visible")
      admin.getEmployeeNameList().first().click({ force: true })
      cy.wait("@results")
      admin
        .getStatusAndRoleDropdowns()
        .last()
        .click({ force: true })
        .then(() => {
          admin.getDropdownBox().should("be.visible")
          admin.getDropdownList().contains("Enabled").click({ force: true })
        })
      admin.getAddUserInputFields().first().clearThenType(adminpage.updateUserName, { force: true })
      admin
        .getChangePassowrdCheckBox()
        .check({ force: true })
        .then(() => {
          admin
            .getAddUserInputFields()
            .eq(1)
            .should("be.visible")
            .type(updatedPassword, { force: true }, { log: false })
          admin.getAddUserInputFields().eq(2).type(updatedPassword, { force: true }, { log: false })
          admin.getAddUserButton().click({ force: true })
          admin.getSuccessToast().should("be.visible")
        })
    })
  })

  it("Verity the delete funcitionality via checkboxes & delete a user by delete icon", () => {
    cy.intercept("GET", "/web/index.php/api/**/admin/validation/user-name?**").as("userName")
    cy.intercept("GET", "/web/index.php/api/**/admin/users?**").as("add")
    cy.intercept("GET", "/web/index.php/api/**/pim/employees?**").as("results")
    cy.get("@adminpage").then(adminpage => {
      navigateToAdminPanel()
      // Deleting by Delete Icon.
      admin
        .getListingRow()
        .contains(adminpage.updateUserName)
        .parentsUntil(".oxd-table-card")
        .find(".oxd-icon.bi-trash")
        .click({ force: true })
      cy.wait("@add")
      admin.getConfirmDeleteButton().click({ force: true })
      admin.getSuccessToast().should("be.visible")
      // // Deleting by checkbox
      admin
        .getListingRow()
        .contains(adminpage.updateUserName)
        .parentsUntil(".oxd-table-card")
        .find('.oxd-table-card-cell-checkbox [type="checkbox"]')
        .check({ force: true })
      cy.wait("@add")
      admin.getConfirmDeleteButton().should("have.text", " Delete Selected ").click({ force: true })
      cy.get(".oxd-sheet").should("be.visible")
      cy.get(".orangehrm-text-center-align > .oxd-text").should(
        "have.text",
        "The selected record will be permanently deleted. Are you sure you want to continue?"
      )
      cy.get(".oxd-button--label-danger").click({ force: true })
      admin.getSuccessToast().should("be.visible")
    })
  })
})
function navigateToAdminPanel() {
  loginpage.getSideMenu().contains("Admin").click({ force: true })
  loginpage.getSideMenu().contains("Admin").should("have.class", "oxd-main-menu-item active")
}
