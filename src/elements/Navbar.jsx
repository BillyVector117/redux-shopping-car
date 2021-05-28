import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { useHistory } from "react-router-dom";
import ModalTemplate from "../elements/ModalTemplate";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/FormActions";
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
  const dispatch = useDispatch();
  const active = useSelector((store) => store.user.active);
  const user = useSelector((store) => store.user.user);

  const isOpenModal = useSelector((store) => store.openModal.isOpen); // Boolean variable
  const history = useHistory();
  const classes = useStyles();
  const itemsLength = useSelector((store) => store.mainShop.itemsLength);

  const handlerReturnButton = (event) => {
    event.preventDefault();
    history.push("/");
  };
  const handlerCarButton = (event) => {
    event.preventDefault();
    history.push("/mycar");
  };

  const handlerWishListButton = (event) => {
    event.preventDefault();
    history.push("/mywishlist");
  };
  const handlerSignUpButton = (event) => {
    event.preventDefault();
    dispatch(openModal(true));
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
      <Toolbar></Toolbar>
    </div>
  );
}
export default Navbar;
