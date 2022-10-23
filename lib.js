// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { getAuth,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi9w0icl1F7KgoXwbyY3A_6BnIe6wRVls",
  authDomain: "profile-5fec1.firebaseapp.com",
  projectId: "profile-5fec1",
  storageBucket: "profile-5fec1.appspot.com",
  messagingSenderId: "474277258771",
  appId: "1:474277258771:web:d84fe2411567e0f33f41e6",
  measurementId: "G-C4PHBTE7L9"
};
// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


// onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in,
//       const uid = user.uid;
//       console.log(" User is signed in,");
//       // ...
//     } else {
//       // User is signed out
//       console.log(" User is signed out,");

//       // ...
//     }
//   });



