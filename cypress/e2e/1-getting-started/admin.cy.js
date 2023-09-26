/// <reference types="cypress" />
import { Admin } from "../../support/pageobjects/adminpage"
import { LoginPage } from "../../support/pageobjects/loginpage"

const loginpage = new LoginPage()
const admin = new Admin()

describe("Tho test Login functionality and navigate to Admin Tab", () => {
    beforeEach(() => {
        cy.fixture("/adminpage.json").as("xyx")
        cy.get("@xyz").then((login) => {
            cy.login(login.userName, login.password)
            // cy.visit("/web/index.php/admin/viewSystemUsers")
        })
    })

    it("Verify that the user is able to navigate to the Admin Tab & verify the page details", () => {
        navigateToAdminPanel()
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
        cy.get("@xyz").then((xyz) => {
            navigateToAdminPanel()
            admin.getSearchPanel().should("be.visible")
            admin.getSearchPanel().find(".oxd-input.oxd-input--active").type(xyz.serachUserName)
            cy.get(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").first().click({ force: true })
            cy.get(".oxd-select-dropdown.--posiotion-bottom").contains("Admin").click({ force: true })
        })
    })

    it("Working with check boxes", () => {
        navigateToAdminPanel()
        cy.get(".oxd-table-row.oxd-table-row--with-border").contains("Adalwin").parents(".oxd-table-row.oxd-table-row--with-border").find('.oxd-table-card-cell-checkbox [type="checkbox"]').check({ force: true })
        // cy.get(".oxd-table-row.oxd-table-row--with-border").contains("Cassidy.Hope").parents(".oxd-table-row.oxd-table-row--with-border").find('.oxd-table-card-cell-checkbox [type="checkbox"]').uncheck({ force: true })
        // cy.get(".oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-horizontal-margin").should("have.text", " Delete Selected ")
        cy.get(".oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-horizontal-margin").contains("Delete Selected").click({ force: true })
        cy.get('.oxd-sheet').should("be.visible")
        cy.get('.orangehrm-text-center-align > .oxd-text').should("have.text", "The selected record will be permanently deleted. Are you sure you want to continue?")
        cy.get('.orangehrm-modal-footer > .oxd-button--label-danger').click({ force: true })
        cy.get("#oxd-toaster_1").should("be.visible")
    })

    it.only("Verify Edit Functionality", () => {
        cy.intercept("GET", "/web/index.php/api/**/pim/employees?**").as("empName")
        cy.intercept("GET", "/web/index.php/api/**/admin/validation/user-name?**").as("userName")
        navigateToAdminPanel()
        cy.get(".oxd-table-row.oxd-table-row--with-border").contains("Kevin.Mathews").parents(".oxd-table-row.oxd-table-row--with-border").find(".oxd-table-cell-actions .oxd-icon.bi-pencil-fill").click({ force: true })
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
function navigateToAdminPanel() {
    loginpage.getSideMenu().contains("Admin").click({ force: true })
    loginpage.getSideMenu().contains("Admin").should("have.class", "oxd-main-menu-item active")
}


