// Dependencies
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Elements
import Navbar from "./elements/Navbar";
import Footer from "./elements/Footer";
// Components
import Home from "./components/Home";
import ProductInfo from "./components/ProductInfo";
import Car from "./components/Car";
import WishList from "./components/WishList";
// Styles
import "./App.css";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  content: {
    minHeight: 840,
  },
}));
function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Navbar />
      <Box className={classes.content}>
        <Switch>
          <Route path="/ProductInfo/:id">
            <ProductInfo />
          </Route>
          <Route path="/mycar">
            <Car />
          </Route>
          <Route path="/mywishlist">
            <WishList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Box>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
