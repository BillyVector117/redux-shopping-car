// Dependencies
import React from "react";
// Styles
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100%",
  },
  link: {
    textDecoration: "none",
    color: "red",
  },
}));
function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="relative" color="primary" className={classes.footer}>
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            © 2021 Billy Rodríguez Morales - GitHub:
            <a
              className={classes.link}
              href="https://github.com/BillyVector117"
            >
              BillyVector117
            </a>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
