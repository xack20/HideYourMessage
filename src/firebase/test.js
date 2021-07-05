const firebase = require("firebase/app");
require("firebase/database");

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

const ref = firebaseDB.database().ref("hide-my-app/");

// ref
//   .child("users")
//   .get()
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//         console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

ref.child("users").push(
  {
    user_info: {
      full_name: "Ashik",
      email: "ashik@gmail.com",
      password: "ashik",
    },
    messages: {
      recieved: [
        {
          from: "Admin",
          id : 'asdafDG-ADfad-A',
          content: "Dummy Message Inbox",
          recieved_at: "10:30 PM",
          seen: false,
        },
      ],
      sent: [{ to: "Admin", content: "Dummy Message Sent", sent_at: "8:35 AM" }],
    },
  },
  (err) => {
    console.log(err);
  }
);
