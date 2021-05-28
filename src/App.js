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
// Redux
import { useSelector } from "react-redux";

// Styles
import "./App.css";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  content: {
    minHeight: 840, // To fix footer position
  },
}));
function App() {
  const classes = useStyles();
  // Global state (Redux) To check if current user exists
  const isUserActive = useSelector((store) => store.user.active);
  return (
    <BrowserRouter>
      <Navbar />
      {isUserActive ? (
        <>
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
        </>
      ) : (
        <>
          <Box className={classes.content}>
            <Switch>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Box>
        </>
      )}

      <Footer />
    </BrowserRouter>
  );
}

export default App;
