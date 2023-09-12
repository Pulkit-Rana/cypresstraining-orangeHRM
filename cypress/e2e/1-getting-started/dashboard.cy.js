import { LoginPage } from "../../support/pageobjects/loginpage"

const loginpage = new LoginPage()

describe("Tho test Login functionality and navigate to dashboard", () => {
    beforeEach(() => {
        cy.fixture("/loginpage.json").as("login")
        cy.get("@login").then((login) => {
            cy.login(login.userName, login.password)
        })
    })

    afterEach(() => {
        cy.logout()
    })

    it("Validating the tiles on the dashboard tab", () => {
        cy.get(".oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-dashboard-widget").should("have.length", 7)
     
        })
})

