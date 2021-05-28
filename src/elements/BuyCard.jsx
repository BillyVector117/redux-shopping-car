// Dependencies
import React, { useState } from "react";
// Elements
import AlertMessage from "../elements/AlertMessage";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCar } from "../redux/shopActions";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    margin: 10,
    padding: 10,
    height: 250,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 250,
  },
  field: {
    width: 50,
    height: 50,
  },
});
function BuyCard() {
  const classes = useStyles();
  // Global state (Redux)
  const productInfo = useSelector((store) => store.mainShop.productInfo);
  const dispatch = useDispatch();
  // Internal state
  const [message, setMessage] = useState(""); // Custom message
  const [type, setType] = useState(""); // Custom message
  const [number, setNumber] = useState(null); // Number Input

  // Add to car action
  const handlerSubmit = (event) => {
    event.preventDefault();
    // console.log("Quantiry product (Input): ",  number);
    dispatch(addToCar(productInfo, number));
    setMessage("Added to Car");
    setType("success");
    setTimeout(() => {
      setMessage("");
      setType("");
    }, 3000);
  };
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={(event) => handlerSubmit(event)}
    >
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {productInfo.title}
          </Typography>
          <Typography variant="h5" component="h2">
            ${productInfo.price}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            %%%
          </Typography>
          <Typography variant="body2" component="p">
            Add a payment method
            <br />
          </Typography>
          <TextField
            onChange={(event) => setNumber(event.target.value)}
            id="standard-number"
            label="Select quantity"
            placeholder="1"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </CardContent>
        <CardActions align="center">
          <Button type="submit" size="small" align="center">
            ADD TO CAR
          </Button>
        </CardActions>
      </Card>
      {message && <AlertMessage type={type} message={message} />}
    </form>
  );
}
export default BuyCard;
