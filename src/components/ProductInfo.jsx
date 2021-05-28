import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductInfo } from "../redux/shopActions";
import SingleCard from "../elements/SingleCard";
const ProductInfo = () => {
  const { id } = useParams();
  console.log(id);
  const singleUrl = `https://fakestoreapi.com/products/${id}/`;
  const dispatch = useDispatch();
  const productInfo = useSelector((store) => store.mainShop.productInfo);
  // Extract object properties
  const { category, description, image, price, title } = productInfo;
  console.log("product info: ", productInfo);
  useEffect(() => {
    dispatch(getProductInfo(singleUrl));
  }, [dispatch, singleUrl]);
  return (
    <div>
      <Typography gutterBottom variant="h5" component="h2">
        Product Info: {id}
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
