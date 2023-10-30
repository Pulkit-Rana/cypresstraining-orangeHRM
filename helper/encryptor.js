/// <reference types="cypress" />
// Specify a string key:
// Don't do this though, your keys should most likely be stored in env variables
// and accessed via process.env.MY_SECRET_KEY
var key = "Please make sure you encrypt before you write any values here."

// Create an encryptor:
var encryptor = require("simple-encryptor")(key)

var encrypted = encryptor.encrypt("admin123")
// Should print gibberish:
console.log("encrypted: %s", encrypted)

var decrypted = encryptor.decrypt(
  "d17527c1fafc8fd5f0b94b02331b95df08d0d18e401753e03390482a4261b5ea10490d165f0c72e4e12b98cf214845136yWXAXghqcHVIZmsIyELUQ=="
)
// Should print 'testing'
console.log("decrypted: %s", decrypted)
