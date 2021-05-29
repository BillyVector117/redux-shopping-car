import firebase from "firebase/app";
import "firebase/auth"; // Import auth methods
import "firebase/firestore"; // Import firestore methods
// import "firebase/storage"; // Import storage methods

var firebaseConfig = {
  apiKey: "YOUR_FIREBASE_APP_CONFIG",
  authDomain: "YOUR_FIREBASE_APP_CONFIG",
  projectId: "YOUR_FIREBASE_APP_CONFIG",
  storageBucket: "YOUR_FIREBASE_APP_CONFIG",
  messagingSenderId: "YOUR_FIREBASE_APP_CONFIG",
  appId: "YOUR_FIREBASE_APP_CONFIG",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
/* const storage = firebase.storage();
, storage */
export { auth, db, firebase };
