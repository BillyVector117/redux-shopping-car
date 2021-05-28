// Dependencies
import React from "react";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
// Receive two params, the type (color message, and text Message (content))
function AlertMessage({ type, message }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={type}>{message}</Alert>
    </div>
  );
}
export default AlertMessage;
