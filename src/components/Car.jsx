// Dependencies
import React from "react";
// Elements
import TableU from "../elements/Table";
// Redux
import { useSelector } from "react-redux";
// Styles
import Container from "@material-ui/core/Container";

const Car = () => {
  // Global state (Redux)
  const itemsLength = useSelector((store) => store.mainShop.itemsLength);
  const car = useSelector((store) => store.mainShop.car);
  const total = useSelector((store) => store.mainShop.total);
  // console.log("Items length on Car: ", itemsLength);
  // console.log("Car items: ", car);
  return (
    <Container maxWidth="md">
      <hr />
      <TableU itemsLength={itemsLength} car={car} total={total} />
    </Container>
  );
};

export default Car;
