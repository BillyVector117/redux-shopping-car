// Dependencies
import React from "react";
import { useEffect, useState } from "react";
// Elements
import Cards from "../elements/Card";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, getProductsByCategory } from "../redux/shopActions";
// Styles
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "fontsource-roboto";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  root1: {
    "& > *": {
      margin: theme.spacing(1),
    },
    font: {
      fontWeight: 600, // or 'bold'
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Access to global states
  const products = useSelector((store) => store.mainShop.array); // Access to array property of mainShop state
  const wishListProducts = useSelector((store) => store.mainShop.myWishList);
  const active = useSelector((store) => store.user.active);

  // Internal state
  const [showCategories, setShowCategories] = useState(false);
  // console.log('Total products: ',products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // When click each category button dispatch an specific reducer to update at new state
  const getProductByCategory = (event) => {
    console.log("Loading content for category: ", event.target.textContent);
    dispatch(getProductsByCategory(event.target.textContent));
    switch (event.target.textContent) {
      case "jewelery":
        dispatch(getProductsByCategory("jewelery"));
        break;
      case "men":
        const param = "men's clothing";
        dispatch(getProductsByCategory(param));
        break;
      case "women":
        dispatch(getProductsByCategory("women's clothing"));
        break;
      default:
        break;
    }
  };
  const showMoreCategories = () => {
    setShowCategories(true);
  };
  return (
    <div>
      {active ? (
        <Typography variant="body1" color="textPrimary" component="h4">
          <div className={classes.root1}>
            <Button
              variant="outlined"
              color="primary"
              onClick={(event) => getProductByCategory(event)}
            >
              jewelery
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={(event) => getProductByCategory(event)}
            >
              men
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={(event) => getProductByCategory(event)}
            >
              women
            </Button>
            {showCategories && (
              <Button
                variant="outlined"
                color="primary"
                onClick={(event) => getProductByCategory(event)}
              >
                electronics
              </Button>
            )}

            {!showCategories && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => showMoreCategories()}
              >
                All categories
              </Button>
            )}
          </div>

          <div className={classes.root}>
            <Grid container item xs={12} spacing={3}>
              {products !== undefined ? (
                products.map((product) => {
                  return (
                    <Grid key={product.id} item xs={12} md={4}>
                      <Cards
                        id={product.id}
                        title={product.title}
                        category={product.category}
                        price={product.price}
                        description={product.description}
                        image={product.image}
                        quantity={product.quantity}
                        wishListProducts={wishListProducts}
                      />
                    </Grid>
                  );
                })
              ) : (
                <Typography
                  variant="h4"
                  color="textPrimary"
                  component="h4"
                  align="center"
                  className={classes.font}
                >
                  No data :/
                </Typography>
              )}
            </Grid>
          </div>
        </Typography>
      ) : (
        <Typography
          variant="h4"
          color="textPrimary"
          component="h4"
          align="center"
          className={classes.font}
        >
          Log In to view Store
        </Typography>
      )}
    </div>
  );
};

export default Home;
