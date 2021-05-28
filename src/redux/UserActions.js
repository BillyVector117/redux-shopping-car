import { auth, firebase, db } from "../firebase";
// storage import
// Constants
const initialData = {
  loading: false,
  active: false,
};
// Actions
const LOADING = "LOADING";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGIN_USER = "LOGIN_USER";
const LOG_OUT = "LOG_OUT";
const LOG_OUT_SESSION = "LOG_OUT_SESSION";
// Reducers
export default function shopReducer(state = initialData, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case LOGIN_USER:
      return { ...state, loading: false, active: true, user: action.payload };
    case LOGIN_ERROR:
      return { ...initialData };
    case LOG_OUT:
      return { ...state };
    case LOG_OUT_SESSION:
      return { ...state, loading: false, active: false, user: null };
    default:
      return { ...state };
  }
}

// Actions, Login by Google Account
export const loginUser = () => async (dispatch, getState) => {
  dispatch({
    type: LOADING,
  });

  try {
    // Google Authentication pop-up
    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await auth.signInWithPopup(provider);
    // Collect user credentials
    const user = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
    };
    // Try searching the user through E-mail
    const dbUser = await db.collection("users").doc(user.email).get();
    console.group("User found in fireStore: ");
    console.log(dbUser); // boolean
    console.groupEnd();
    // Validate if user exists in database then send to payload its info.
    if (dbUser.exist) {
      dispatch({
        type: LOGIN_USER,
        payload: dbUser.data(),
      });
      // Save uid & email in localStorage as 'user'
      localStorage.setItem(
        "user",
        JSON.stringify(dbUser.data()) // Save user data in localStorage
      );
    }
    // If do not exists then received E-mail (user) in database and create him:
    else {
      await db.collection("user").doc(user.email).set(user);
      dispatch({
        type: LOGIN_USER,
        payload: user,
      });
      // Save all user data in localStorage as 'user'
      localStorage.setItem(
        "user",
        JSON.stringify(user) // Parse and save 'user' Object in localStorage
      );
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_ERROR,
    });
  }
};
// Actions, Login By E-mail
export const loginUserEmail =
  (email, password, name) => async (dispatch, getState) => {
    dispatch({
      type: LOADING,
    });
    try {
      // Collect user credentials
      const user = {
        email: email,
        name: name,
      };
      await db.collection("users").doc(user.email).set({
        name: user.name,
        email: user.email,
      });

      // Try searching the user through E-mail
      const dbUser = await db.collection("users").doc(user.email).get();
      console.group("User found in fireStore by E-mail: ");
      console.log(dbUser); // boolean
      console.groupEnd();
      // Validate if user exists in database then send to payload its info.
      if (dbUser.exist) {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
          type: LOGIN_USER,
          payload: dbUser.data(),
        });
        // Save uid & email in localStorage as 'user'
        localStorage.setItem(
          "user",
          JSON.stringify(dbUser.data()) // Save user data in localStorage
        );
      }
      // If do not exists then received E-mail (user) in database and create him:
      else {
        const res = auth.createUserWithEmailAndPassword(email, password);
        console.log("ususario creado", res); // req.i.user.displayName
        await db.collection("user").doc(user.email).set(user);
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
          type: LOGIN_USER,
          payload: user,
        });
        // Save all user data in localStorage as 'user'
        localStorage.setItem(
          "user",
          JSON.stringify(user) // Parse and save 'user' Object in localStorage
        );
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
// Actions, close Modal
export const closeModal = (isOpen) => async (dispatch, getState) => {
  dispatch({
    type: LOG_OUT,
    payload: isOpen,
  });
};
// Actions, Log out user
export const logOutUser = () => async (dispatch, getState) => {
  try {
    firebase.auth().signOut();
  } catch (error) {
    console.log(error);
  }
  dispatch({
    type: LOG_OUT_SESSION,
  });
};
