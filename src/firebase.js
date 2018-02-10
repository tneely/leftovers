// Initialize Firebase
var config = {
  apiKey: "AIzaSyB2wRUHmMG9FUwDBHDwVAVTSQLFQKVfxEE",
  authDomain: "leftovers-978c1.firebaseapp.com",
  databaseURL: "https://leftovers-978c1.firebaseio.com",
  projectId: "leftovers-978c1",
  storageBucket: "leftovers-978c1.appspot.com",
  messagingSenderId: "465712258249"
};

firebase.initializeApp(config);
window.db = firebase.firestore();
