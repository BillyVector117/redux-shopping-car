import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { removeProductCar } from "../redux/shopActions";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    minWidth: 30,
    width: 0,
    padding: 0,
    marginLeft: 1,
  },
}));
// "productId" refers to Index from Car array
function ButtonIcon({ productId, indexParam }) {
  const dispatch = useDispatch();
  //const productInfo = useSelector((store) => store.mainShop.productInfo);
  const classes = useStyles();
  const HandlerDeleteProduct = () => {
    dispatch(removeProductCar(productId, indexParam));
    console.log(`Deleting;: `, productId);
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
