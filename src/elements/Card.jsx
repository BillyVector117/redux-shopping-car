// Dependencies
import React, { useEffect, useState } from "react";
// Libraries
import { useHistory } from "react-router-dom";
// Elements
import AlertMessage from "../elements/AlertMessage";
// Redux
import { addToCar, addToWish, removeToWish } from "../redux/shopActions";
import { useDispatch, useSelector } from "react-redux";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Cards({
  // Default data
  id = "0",
  title = "undefined",
  category = "undefined",
  price = "undefined",
  description = "undefined",
  image = "undefined",
  quantity = 1,
  wishListProducts, // Array
}) {
  const classes = useStyles();
  const history = useHistory();
  // Global state
  const wishListProductsState = useSelector((store) => store.mainShop.myWishList);
  const dispatch = useDispatch();
  // Internal state
  const [message, setMessage] = useState(""); // Custom message
  const [type, setType] = useState(""); // Custom message
  const [filled, setFilled] = useState(false);

  // This effect allows to check if a product is saved at WishList, if true, set a filled hearth icon, else an empty hearth icon
  useEffect(() => {
    // console.log("My wish List items: ", wishListProducts);
    const isThisProductInWishList = wishListProducts.filter((element) => {
      return element.id === id;
    });

    // console.log("Product in wishList: ", isThisProductInWishList); // Ensure this maped product exists in WishList state
    if (isThisProductInWishList.length !== 0) {
      setFilled(true);
      // console.log("ID found");
    } else {
      // console.log("No ID found!");
    }
  }, [id, wishListProducts]);

  const handlerClickImage = () => {
    // console.log("Redirecting to propduct clicked");
    history.push(`/productInfo/${id}`);
  };
  // Adding to car action
  const handlerClickButton = (event) => {
    event.preventDefault();

    // Capture all data from this maped item
    const product = {
      id,
      title,
      category,
      description,
      price,
      image,
      quantity,
    };

    dispatch(addToCar(product));
    setMessage("Product added to Car");
    setType("success");
    setTimeout(() => {
      setMessage("");
      setType("");
    }, 3000);
  };
  const handlerClickFavorite = (event) => {
    event.preventDefault();
    // If this product already exists in WishList then remove from WishList else, add it.
    if (filled) {
      const product = {
        id,
        title,
        category,
        description,
        price,
        image,
        quantity,
      };
      dispatch(removeToWish(product));
      setFilled(false);
      setMessage("Removed from Wish List");
      setType("error");
      setTimeout(() => {
        setMessage("");
        setType("");
      }, 3000);
      // console.log("This item is removed from WishList");
      return;
    } else {
      // console.log("Adding to WishList");
      const product = {
        id,
        title,
        category,
        description,
        price,
        image,
        quantity,
      };
      const found = wishListProductsState.find(
        (element) => element.id === product.id
      );
      // console.log("Product found: ", found);
      // If this product does not exists at WishList state, then added.
      if (!found) {
        dispatch(addToWish(product));
        setFilled(true);
        setMessage("Added to Wish List");
        setType("info");
        setTimeout(() => {
          setMessage("");
          setType("");
        }, 3000);
      } else {
        setMessage("This item already exists in your Wish List");
        setType("error");
        setTimeout(() => {
          setMessage("");
          setType("");
        }, 3000);
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            onClick={() => console.log("avatar")}
            aria-label="recipe"
            className={classes.avatar}
          >
            {id}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={category}
      />
      <CardMedia
        onClick={() => handlerClickImage()}
        className={classes.media}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="h4">
          PRICE: $ {price}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          PRODUCT DESCRIPTION:
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={(event) => handlerClickFavorite(event)}
        >
          {filled ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button
          size="small"
          color="primary"
          onClick={(event) => handlerClickButton(event)}
        >
          ADD TO CAR
        </Button>
      </CardActions>
      {message && <AlertMessage type={type} message={message} />}
    </Card>
  );
}
export default Cards;
