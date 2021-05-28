import firebase from "firebase/app";
import "firebase/auth"; // Import auth methods
import "firebase/firestore"; // Import firestore methods
// import "firebase/storage"; // Import storage methods

var firebaseConfig = {
  apiKey: "AIzaSyA6MmejWqYW2GZinKP7DACSM13oBLI9fug",
  authDomain: "redux-store-d4ea2.firebaseapp.com",
  projectId: "redux-store-d4ea2",
  storageBucket: "redux-store-d4ea2.appspot.com",
  messagingSenderId: "316787658739",
  appId: "1:316787658739:web:ce3e5e63ea3230f8cc8c86",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
/* const storage = firebase.storage();
, storage */
export { auth, db, firebase };
