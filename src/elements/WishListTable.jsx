// Dependencies
import React from "react";
// Elements
import AvatarImage from "./AvatarImage";
// Libraries
import { useHistory } from "react-router-dom";
// Functions
import AmountFormat from "../functions/Currency";
// Redux (Might use)
// Styles
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import TableHead from "@material-ui/core/TableHead";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
// Instead "wishList" props we can access through Redux state
function WishListTable({ wishList }) {
  const classes = useStyles();
  const history = useHistory();
  const rows = wishList;
  // Click On preview button action
  const handlercheckProductButton = (event, id) => {
    event.preventDefault();
    history.push(`/ProductInfo/${id}`);
  };
  return (
    <TableContainer component={Paper}>
      {wishList.length !== 0 ? (
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="left">{row.category}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">{AmountFormat(row.price)}</TableCell>
                  <TableCell align="center">
                    <Container>
                      <AvatarImage title={row.title} src={row.image} />
                    </Container>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      color="inherit"
                      onClick={(event) =>
                        handlercheckProductButton(event, row.id)
                      }
                    >
                      Check!
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
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
          Wishlist empty, select a product first
        </Typography>
      )}
    </TableContainer>
  );
}

export default WishListTable;
