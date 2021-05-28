import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginUserEmail } from "../redux/UserActions"; // Action
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const Form = ({ handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // create state variables for each input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Redux state
  const loading = useSelector((store) => store.user.loading);
  const active = useSelector((store) => store.user.active);
  //
  console.group("loading in button");
  console.log(loading); // By default is true, once an actions is finished switch to false
  console.groupEnd();
  console.group("active user");
  console.log(active); // Changes to true once user is signed-in
  console.groupEnd();

  React.useEffect(() => {
    console.group("useEffect: active user");
    console.log(active);
    console.groupEnd();
    if (active) {
      handleClose();
    }
  }, [active, handleClose]);
  //

  const handleSubmit = (event) => {
    // Sign In with E-mail
    event.preventDefault();
    console.log(firstName, lastName, email, password);
    dispatch(loginUserEmail(email, password, firstName));
  };
  const handleSubmitGoogle = (event) => {
    // Sign In with Google
    event.preventDefault();
    dispatch(loginUser());
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="filled"
        required
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <TextField
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Signup
        </Button>
      </div>
      <hr />
      <Divider variant="middle" />
      <Button
        type="submit"
        variant="outlined"
        color="secondary"
        disabled={loading}
        onClick={(event) => handleSubmitGoogle(event)}
      >
        Sign In with Google Account
      </Button>
    </form>
  );
};

export default Form;
