const { defineConfig } = require("cypress")

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on) {
      require("cypress-mochawesome-reporter/plugin")(on)
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: "https://opensource-demo.orangehrmlive.com/",
  },
  env: {
    info: "Please make sure you encrypt before you write any values here.",
    userName: "Admin",
    password:
      "d17527c1fafc8fd5f0b94b02331b95df08d0d18e401753e03390482a4261b5ea10490d165f0c72e4e12b98cf214845136yWXAXghqcHVIZmsIyELUQ==",
  },
})
