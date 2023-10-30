export class Navigate {

    navigateToAdminPanel = () => {
        loginpage.getSideMenu().contains("Admin").click({ force: true })
        loginpage.getSideMenu().contains("Admin").should("have.class", "oxd-main-menu-item active")
    }
}