const { defineConfig } = require("cypress")
const fs = require("fs")

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  extraSmall: {
    viewportWidth: 375,
    viewportHeight: 667,
  },
  small: {
    viewportWidth: 390,
    viewportHeight: 844,
  },
  medium: {
    viewportWidth: 1280,
    viewportHeight: 960,
  },
  large: {
    viewportWidth: 1600,
    viewportHeight: 900,
  },
  extraLarge: {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  chromeWebSecurity: false,
  downloadsFolder: "orangeHRM/downloads",
  screenshotsFolder: "orangeHRM/screenshots",
  videosFolder: "orangeHRM/videos",
  fixturesFolder: "orangeHRM/fixtures",
  defaultCommandTimeout: 5000,
  video: true,
  videoCompression: 15,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "reports",
    overwrite: true,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  pageLoadTimeout: 120000,
  requestTimeout: 30000,
  responseTimeout: 120000,
  e2e: {
    specPattern: "orangeHRM/testcases/*",
    supportFile: "orangeHRM/support/e2e.js",
    setupNodeEvents(on) {
      require("cypress-mochawesome-reporter/plugin")(on)
      on("after:spec", results => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = results.tests.some(test =>
            test.attempts.some(attempt => attempt.state === "failed")
          )
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video)
          }
        }
      })
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
