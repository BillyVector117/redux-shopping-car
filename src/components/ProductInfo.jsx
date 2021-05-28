// Dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// Elements
import SingleCard from "../elements/SingleCard";
// Redux
import { getProductInfo } from "../redux/shopActions";
// Styles
import Typography from "@material-ui/core/Typography";

const ProductInfo = () => {
  const { id } = useParams(); // Capture params (named ":id")
  // console.log('Url-Params: ', id);
  // URL-API
  const singleUrl = `https://fakestoreapi.com/products/${id}/`;
  // Global state (Redux)
  const productInfo = useSelector((store) => store.mainShop.productInfo);
  const dispatch = useDispatch();
  // Extract object properties
  const { category, description, image, price, title } = productInfo; // Undefined until useEffect below is finished
  // console.log("Product info: ", productInfo);
  useEffect(() => {
    dispatch(getProductInfo(singleUrl));
  }, [dispatch, singleUrl]);
  return (
    <div>
      <Typography gutterBottom variant="h5" component="h2">
        Product {id} description:
      </Typography>

      <SingleCard
        title={title}
        description={description}
        image={image}
        price={price}
        category={category}
      />
    </div>
  );
};

export default ProductInfo;
