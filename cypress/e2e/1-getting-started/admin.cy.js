/// <reference types="cypress" />
import { Admin } from "../../support/pageobjects/adminpage"
import { LoginPage } from "../../support/pageobjects/loginpage"

const loginpage = new LoginPage()
const admin = new Admin()

const encryptor = require('simple-encryptor')(Cypress.env('info'));

describe("Tho test Login functionality and navigate to Admin Tab", () => {
    beforeEach(() => {
        cy.fixture("/loginpage.json").as("login")
        cy.get("@login").then((login) => {
            cy.login(login.userName, login.password)
            cy.visit("/")
        })
        cy.fixture("/adminpage.json").as("adminpage")
    })

    it("Verify that the user is able to navigate to the Admin Tab & verify the page details & invoke the employee name for Admin", () => {
        navigateToAdminPanel()
        cy.get('.oxd-topbar-body-nav > ul').should("be.visible")
        cy.get('.oxd-table-filter').should("be.visible")
        cy.get('.orangehrm-container').should("be.visible")
        cy.get(".oxd-table-row.oxd-table-row--with-border").contains("Admin").parentsUntil(".oxd-table-card").find("div:nth-child(4) > div").invoke("text").as("empName").then(($empName) => {
            let empName = $empName
            cy.readFile("cypress/fixtures/adminpage.json", err => {
                if (err) {
                    return cy.log(err)
                }
            }).then((text) => {
                text.empName = empName
                cy.writeFile("cypress/fixtures/adminpage.json", JSON.stringify(text))
            })
        })
    })

    it("Verify the headers", () => {
        navigateToAdminPanel()
        cy.get('.oxd-table-row.oxd-table-row--with-border').find("div").then(($data) => {
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
        cy.get("@adminpage").then((adminpage) => {
            navigateToAdminPanel()

            admin.getSearchPanel().should("be.visible")
            admin.getSearchPanel().find(".oxd-input.oxd-input--active").type(adminpage.searchName)
            cy.wait("@page")
            cy.get(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").first().click({ force: true }).then(() => {
                cy.get(".oxd-select-dropdown.--positon-bottom").should("be.visible")
                cy.get(".oxd-select-option span").contains(adminpage.searchName).click({ force: true })
            })
            cy.get('.oxd-autocomplete-text-input > input').type(adminpage.empName, { delay: 200 })
            cy.get(".oxd-autocomplete-dropdown.--positon-bottom", { timeout: 9000 }).should("be.visible")
            cy.get('[role="option"] span', { timeout: 9000 }).first().click({ force: true })
            cy.wait("@results")
            cy.get(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").last().click({ force: true }).then(() => {
                cy.get(".oxd-select-dropdown.--positon-bottom").should("be.visible")
                cy.get(".oxd-select-option span").contains("Enabled").click({ force: true })
            })
            cy.get(".oxd-form-actions button").contains("Search").click({ force: true })
            cy.wait("@page")
            cy.get(".oxd-table-card").should("have.length", 1)
        })
    })

    it("Verify Add User Functionality", () => {
        cy.intercept("GET", "/web/index.php/api/**/admin/users?**").as("add")
        cy.intercept("GET", "/web/index.php/api/**/pim/employees?**").as("results")
        cy.get("@adminpage").then((adminpage) => {
            let decryptPass = encryptor.decrypt(adminpage.addPassword);
            navigateToAdminPanel()
            cy.get('.orangehrm-header-container > .oxd-button').click({ force: true })
            cy.wait("@add")
            cy.get(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").first().click({ force: true }).then(() => {
                cy.get(".oxd-select-dropdown.--positon-bottom").should("be.visible")
                cy.get(".oxd-select-option span").contains(adminpage.searchName).click({ force: true })
            })
            cy.get('.oxd-autocomplete-text-input > input').type(adminpage.empName, { delay: 200 })
            cy.get(".oxd-autocomplete-dropdown.--positon-bottom", { timeout: 9000 }).should("be.visible")
            cy.get('[role="option"] span', { timeout: 9000 }).first().click({ force: true })
            cy.wait("@results")
            cy.get(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").last().click({ force: true }).then(() => {
                cy.get(".oxd-select-dropdown.--positon-bottom").should("be.visible")
                cy.get(".oxd-select-option span").contains("Enabled").click({ force: true })
            })
            cy.get('.oxd-input-group .oxd-input').first().type(adminpage.addUserName, { force: true })
            cy.get('.oxd-input-group .oxd-input').eq(1).type(decryptPass, { force: true }, { log: false })
            cy.get('.oxd-input-group .oxd-input').eq(2).type(decryptPass, { force: true }, { log: false })
            cy.get('.oxd-button--secondary').click({ force: true })
            cy.get("#oxd-toaster_1").should("be.visible")
        })
    })

    it("Verify Edit Functionality", () => {
        cy.intercept("GET", "/web/index.php/api/**/pim/employees?**").as("empName")
        cy.intercept("GET", "/web/index.php/api/**/admin/validation/user-name?**").as("userName")
        cy.get("@adminpage").then((adminpage) => {
            navigateToAdminPanel()
            cy.get(".oxd-table-row.oxd-table-row--with-border div").contains(adminpage.addUserName).parent().find(".oxd-table-cell-actions .oxd-icon.bi-pencil-fill").click({ force: true })
            cy.get(".orangehrm-card-container h6").should("have.text", "Edit User")
            cy.get(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").first().click({ force: true }).then(() => {
                cy.get('.oxd-select-dropdown.--positon-bottom').contains("Admin").click({ force: true })
            })
            cy.get('.oxd-autocomplete-text-input > input', { timeout: 12000 }).click({ force: true }, { timeout: 9000 })
            cy.get('.oxd-autocomplete-text-input > input').clear({ force: true }, { timeout: 12000 })
            cy.get('.oxd-autocomplete-text-input > input').type("Kevi", { force: true }, { timeout: 12000 })
            cy.wait("@userName")
            cy.wait("@empName")
            cy.get(".oxd-autocomplete-dropdown.--positon-bottom").contains("Kevin Mathews").click({ force: true })
            cy.get(`.oxd-input`).last().click({ force: true }).clearThenType("Narayan", { force: true })
            cy.get('.oxd-checkbox-wrapper [type="checkbox"]').check({ force: true })
        })
    })

    it("Verity the bulk delete funcitionality via checkboxes & delete a user", () => {
        navigateToAdminPanel()
        cy.get(".oxd-table-row.oxd-table-row--with-border div").contains("").parents(".oxd-table-row.oxd-table-row--with-border").find('.oxd-table-card-cell-checkbox [type="checkbox"]').check({ force: true })
        // cy.get(".oxd-table-row.oxd-table-row--with-border").contains("Cassidy.Hope").parents(".oxd-table-row.oxd-table-row--with-border").find('.oxd-table-card-cell-checkbox [type="checkbox"]').uncheck({ force: true })
        // cy.get(".oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-horizontal-margin").should("have.text", " Delete Selected ")
        cy.get(".oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-horizontal-margin").contains("Delete Selected").click({ force: true })
        cy.get('.oxd-sheet').should("be.visible")
        cy.get('.orangehrm-text-center-align > .oxd-text').should("have.text", "The selected record will be permanently deleted. Are you sure you want to continue?")
        cy.get('.orangehrm-modal-footer > .oxd-button--label-danger').click({ force: true })
        cy.get("#oxd-toaster_1").should("be.visible")
    })
})
function navigateToAdminPanel() {
    loginpage.getSideMenu().contains("Admin").click({ force: true })
    loginpage.getSideMenu().contains("Admin").should("have.class", "oxd-main-menu-item active")
}
