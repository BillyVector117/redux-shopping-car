// Dependencies
import React from "react";
// Elements
import ButtonIcon from "./ButtonIcon";
// Functions
import AmountFormat from "../functions/Currency";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    marginRight: 3,
  },
  font: {
    fontWeight: 600, // 'Bold'
  },
});
// Receive items from Car component
function TableU({ itemsLength, car, total }) {
  const classes = useStyles();

  /* NEXT UPDATE "SHOW A TD FOR REPETITIVE PRODUCT INSTEAD ONE FOR EACH REPETITIVE PRODUCT "
    const equalProduct = (car, index, item) => {
    if (index !== 0) {
      const currentProduct = item.quantity;
      const previousProduct = car[index - 1].quantity;

      if (currentProduct > previousProduct) {
        return true;
      } else {
        return false;
      }
    }
  }; */
  /*   const equalProduct = (car, index, item) => {
    if (index !== 0) {
      const currentProduct = item.id;
      const previousProduct = car[index - 1].id;
      if (currentProduct === previousProduct) {
        if (item.quantity >= car[index - 1].quantity) {
          return item;
        }
      }
    }
  }; */
  /*  if (currentProduct > previousProduct) {
        return true;
      } else {
        return false;
      } */

  return (
    <TableContainer component={Paper}>
      {car.length !== 0 ? (
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Products ({itemsLength})</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {car.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left" component="th" scope="row">
                  {/* Send "index" array to delete only that item and not repetead data */}
                  <ButtonIcon productId={row} indexParam={index} />
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{AmountFormat(row.price)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="right">
                <span className="totalPrice">{AmountFormat(total)}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <Typography
          variant="h4"
          color="textPrimary"
          component="h4"
          align="center"
          className={classes.font}
        >
          Car section is empty, select a product
        </Typography>
      )}
    </TableContainer>
  );
}
export default TableU;
