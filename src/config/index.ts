import * as admin from "firebase-admin";

var serviceAccount = require("../../serviceAccountKey.json");

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let fireStore = admin.firestore();

fireStore.settings({ ignoreUndefinedProperties: true });

console.log("firebase connected successfully");
