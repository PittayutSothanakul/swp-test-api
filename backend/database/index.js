const firebase = require("firebase/app");
require("firebase/database");

const apis = {
  apiKey: "AIzaSyC55N0L67PrMRvinPm8hcstefcUSz4hrWE",
  authDomain: "test-swp-tradewar.firebaseapp.com",
  databaseURL: "https://test-swp-tradewar.firebaseio.com",
  projectId: "test-swp-tradewar",
  storageBucket: "test-swp-tradewar.appspot.com",
  messagingSenderId: "83531788819",
  appId: "1:83531788819:web:9f6402d42e3239ce"
};

firebase.initializeApp(apis);

const push = value => {
  firebase
    .database()
    .ref("/database")
    .push(value);
};

module.exports = {
  push
};
