import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import BuyCard from "../elements/BuyCard";
import { useSelector } from "react-redux";
const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 500,
  },
});

function SingleCard() {
  const productInfo = useSelector((store) => store.mainShop.productInfo);
  const { category, description, image, price, title } = productInfo;
  const classes = useStyles();

  return (
    <Box
      justifyContent="center"
      bgcolor="text.disabled"
      display="flex"
      flexDirection="row"
      p={1}
      m={1}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            image={image}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title} - $ {price}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            {category}
          </Button>
        </CardActions>
      </Card>
      <BuyCard />
    </Box>
  );
}
export default SingleCard;
