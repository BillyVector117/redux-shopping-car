import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import shopReducer from "./shopActions";
import FormReducer from "./FormActions";
import userReducer from "./UserActions";
// Combine reducers
const rootReducer = combineReducers({
  mainShop: shopReducer,
  openModal: FormReducer,
  user: userReducer,
  // Another reducer
});
// DevToold Config
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
