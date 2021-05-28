import React from "react";
import TableU from "../elements/Table";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";

const Car = () => {
  const itemsLength = useSelector((store) => store.mainShop.itemsLength);
  const car = useSelector((store) => store.mainShop.car);
  const total = useSelector((store) => store.mainShop.total);
  console.log("items length: ", itemsLength);
  console.log("car array: ", car);

  return (
    <Container maxWidth="md">
      <hr />
      <TableU itemsLength={itemsLength} car={car} total={total} />
    </Container>
  );
};

export default Car;
