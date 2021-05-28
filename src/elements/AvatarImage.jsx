// Dependencies
import React from "react";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
// Receive two params (Title (to "alt") and src (to show Image))
function AvatarImage({ title, src }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={title} src={src} />
    </div>
  );
}
export default AvatarImage;
