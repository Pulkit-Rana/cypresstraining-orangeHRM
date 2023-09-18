/// <reference types="cypress" />
import { Admin } from "../../support/pageobjects/adminpage"
import { LoginPage } from "../../support/pageobjects/loginpage"

const loginpage = new LoginPage()
const admin = new Admin()

describe("Tho test Login functionality and navigate to Admin Tab", () => {
    beforeEach(() => {
        cy.fixture("/loginpage.json").as("login")
        cy.get("@login").then((login) => {
            cy.login(login.userName, login.password)
            // cy.visit("/web/index.php/admin/viewSystemUsers")
        })
    })

    // afterEach(() => {
    //     cy.logout()
    // })

    it("Verify that the user is able to navigate to the Admin Tab & verify the page details", () => {
        navigateToAdminPanel()
    })

    it("Verify the headers", () => {
        navigateToAdminPanel()
        cy.get('.oxd-table-row.oxd-table-row--with-border').eq(0).then(($data) => {
            expect($data.text())
                .include("UsernameAscendingDescending")
                .and.include("User RoleAscendingDescending")
                .and.include("Employee NameAscendingDescending")
                .and.include("Status")
                .and.include("Actions")
        })
    })

    it("Verify that the search functionality is working", () => {
        navigateToAdminPanel()
        admin.getSearchPanel().should("be.visible")
        admin.getSearchPanel().find(".oxd-input.oxd-input--active").type("Admin")
        cy.get(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").first().click({ force: true })
        cy.get(".oxd-select-dropdown.--posiotion-bottom").contains("Admin").click({ force: true })
    })

    it.skip("Working with check boxes", () => {
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
        navigateToAdminPanel()
        cy.get(".oxd-table-row.oxd-table-row--with-border").contains("Kevin.Mathews").parents(".oxd-table-row.oxd-table-row--with-border").find(".oxd-table-cell-actions .oxd-icon.bi-pencil-fill").click({ force: true })
        cy.get(".orangehrm-card-container h6").should("have.text", "Edit User")
        cy.get(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").first().click({ force: true }).then(() => {
            cy.get('[role="listbox"]').select("Admin").click({ force: true })
        })
        cy.get('.oxd-autocomplete-text-input > input').clearThenType("Kevi").then(() => {
            cy.get('[role="listbox"]').contains("Kevin.Mathews").click({ force: true })
        })



    })




})
function navigateToAdminPanel() {
    loginpage.getSideMenu().contains("Admin").click({ force: true })
    loginpage.getSideMenu().contains("Admin").should("have.class", "oxd-main-menu-item active")
}
