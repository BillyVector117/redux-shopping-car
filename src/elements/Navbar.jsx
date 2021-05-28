// Dependencies
import React from "react";
// Libraries
import { useHistory } from "react-router-dom";
// Elements
import ModalTemplate from "../elements/ModalTemplate";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/FormActions";
import { logOutUser } from "../redux/UserActions";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  // Global state (Redux)
  const active = useSelector((store) => store.user.active);
  const user = useSelector((store) => store.user.user);
  const isOpenModal = useSelector((store) => store.openModal.isOpen); // Boolean variable
  const itemsLength = useSelector((store) => store.mainShop.itemsLength);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  // Return to shop button Action
  const handlerReturnButton = (event) => {
    event.preventDefault();
    history.push("/");
  };
  // Go to Car button Action
  const handlerCarButton = (event) => {
    event.preventDefault();
    history.push("/mycar");
  };
  // Go to Wish List button Action
  const handlerWishListButton = (event) => {
    event.preventDefault();
    history.push("/mywishlist");
  };
  // Go to Login button Action
  const handlerSignUpButton = (event) => {
    event.preventDefault();
    dispatch(openModal(true));
  };
  // Go out button Action
  const handlerLogOutUser = (event) => {
    event.preventDefault();
    dispatch(logOutUser());
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Redux App
          </Typography>
          {active && (
            <>
              <Button
                color="inherit"
                onClick={(event) => handlerWishListButton(event)}
              >
                WishList
              </Button>
              <Button
                color="inherit"
                onClick={(event) => handlerReturnButton(event)}
              >
                RETURN SHOPPING
              </Button>
              <Button
                color="inherit"
                onClick={(event) => handlerCarButton(event)}
              >
                <ShoppingCartIcon /> Car {itemsLength}
              </Button>
              <Button
                color="inherit"
                onClick={(event) => handlerLogOutUser(event)}
              >
                Log out
              </Button>
            </>
          )}
          {!user && (
            <Button
              color="inherit"
              onClick={(event) => handlerSignUpButton(event)}
            >
              SignUp
            </Button>
          )}
          {isOpenModal && <ModalTemplate />}
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar> {/* To avoid Material UI hide info behind Navbar */}
    </div>
  );
}
export default Navbar;
