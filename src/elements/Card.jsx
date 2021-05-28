import React, { useEffect, useState } from "react";
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
import { addToCar, addToWish, removeToWish } from "../redux/shopActions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../elements/AlertMessage";
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
  id = "0",
  title = "undefiend",
  category = "undefiend",
  price = "undefiend",
  description = "undefiend",
  image = "undefiend",
  quantity = 1,
  wishListProducts,
}) {
  const products = useSelector((store) => store.mainShop.myWishList);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    // console.log("my wish-List: ", wishListProducts);
    const isThisProductInWishList = wishListProducts.filter((element) => {
      return element.id === id;
    });
    // console.log("product in wishList: ", isThisProductInWishList); // Ensure this maped product exists in WishList state

    if (isThisProductInWishList.length !== 0) {
      setFilled(true);
      console.log("id found");
    } else {
      console.log("No id found!");
    }
  }, [id, wishListProducts]);
  const handlerClickImage = () => {
    // console.log("Product clicked");
    history.push(`/productInfo/${id}`);
  };
  const handlerClickButton = (event) => {
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
      console.log("Removing from WishList");
      return;
    } else {
      console.log("Adding to WishList");
      const product = {
        id,
        title,
        category,
        description,
        price,
        image,
        quantity,
      };
      const found = products.find((el) => el.id === product.id);
      console.log("found: ", found);
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
