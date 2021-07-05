import firebase from "firebase/app"
import 'firebase/database'

var firebaseConfig = {
  apiKey: "AIzaSyBbG3p3fbdc0LrRN-8ltLVRFu6QkYZzMLY",
  authDomain: "diu-solution.firebaseapp.com",
  databaseURL: "https://diu-solution.firebaseio.com",
  projectId: "diu-solution",
  storageBucket: "diu-solution.appspot.com",
  messagingSenderId: "582389809936",
  appId: "1:582389809936:web:72b0bbba14a8f0c4dadb95",
  measurementId: "G-7D4MEVTTQ0",
};

// Initialize Firebase
var firebaseDB = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebaseDB.database().ref('hide-my-app/');

