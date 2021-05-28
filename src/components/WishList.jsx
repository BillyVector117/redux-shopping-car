// Dependencies
import React from "react";
// Elements
import WishListTable from "../elements/WishListTable";
// Redux
import { useSelector } from "react-redux";
// Styles
import Container from "@material-ui/core/Container";
const WishList = () => {
  // Global state (Redux)
  const wishList = useSelector((store) => store.mainShop.myWishList); // array
  // console.log("My wish list: ", wishList);
  return (
    <Container maxWidth="md">
      <WishListTable wishList={wishList} />
    </Container>
  );
};

export default WishList;
