const admin = require('firebase-admin')
const serviceAcc = require('./service-account-firebase.json')
// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAcc),
  storageBucket: "ute-food.appspot.com"
})
// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}