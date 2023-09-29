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

var decrypted = encryptor.decrypt(encrypted)
// Should print 'testing'
console.log("decrypted: %s", decrypted)
