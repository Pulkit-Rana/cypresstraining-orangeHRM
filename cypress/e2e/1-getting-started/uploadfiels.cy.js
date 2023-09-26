




cy.get("#IfYOUHAVEMONEY").then(() => {
    //logic
})

cy.get("#IfYOUHAVEMONEYUSETHEM").then(($money) => {
    // $money. do something
})

cy.get(".oxd-select-text.oxd-select-text--active").click({ force: true }).then(() => {
    cy.get("#Check dorpdown").should("be.visible")
    cy.select("Indian")

})

it("Verify the headers", () => {
    navigateToAdminPanel()
    cy.get('.oxd-table-row.oxd-table-row--with-border').then(($el) => {
        if ($el.find("div").is(":visible")) {
            //do something
        }
        else {
            // I will do someting else.
        }

    })
})