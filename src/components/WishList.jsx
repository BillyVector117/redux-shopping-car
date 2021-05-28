import Container from "@material-ui/core/Container";

import React from "react";
import { useSelector } from "react-redux";
import WishListTable from "../elements/WishListTable";

const WishList = () => {
  const wishList = useSelector((store) => store.mainShop.myWishList);
  console.log("my wish list: ", wishList);
  return (
    <Container maxWidth="md">
      <WishListTable wishList={wishList} />
    </Container>
  );
};

export default WishList;
