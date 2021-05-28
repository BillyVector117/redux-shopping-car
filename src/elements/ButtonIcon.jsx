// Dependencies
import React from "react";
// Redux
import { useDispatch } from "react-redux";
import { removeProductCar } from "../redux/shopActions";
// Styles
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    minWidth: 30,
    width: 0,
    padding: 0,
    marginLeft: 1,
  },
}));
// "productId" refers to complete product object and "indexParam" refers to Index array for that item (Table Car section)
function ButtonIcon({ productId, indexParam }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  // Delepe product action
  const HandlerDeleteProduct = () => {
    dispatch(removeProductCar(productId, indexParam));
    // console.log(`Deleting: `, productId);
  };
  return (
    <Button
      onClick={() => HandlerDeleteProduct()}
      variant="contained"
      color="secondary"
      className={classes.button}
      size="small"
    >
      <DeleteIcon />
    </Button>
  );
}

export default ButtonIcon;
