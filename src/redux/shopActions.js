import axios from "axios";

// Contstans
const initialData = {
  array: [],
  productsByCategory: [],
  productInfo: [],
  itemsLength: 0,
  car: [],
  total: 0,
  myWishList: [],
};
// Actions
const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
const GET_PRODUCT_INFO = "GET_PRODUCT_INFO";
const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY";
const ADD_TO_CAR = "ADD_TO_CAR";
const ADD_TO_WISH_LIST = "ADD_TO_WISH_LIST";
const REMOVE_TO_CAR = "REMOVE_TO_CAR";
const REMOVE_TO_WISH_LIST = "REMOVE_TO_WISH_LIST";
// Reducers
export default function shopReducer(state = initialData, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, array: action.payload };
    case GET_PRODUCTS_BY_CATEGORY:
      return { ...state, array: action.payload };
    case GET_PRODUCT_INFO:
      return { ...state, productInfo: action.payload };
    case ADD_TO_CAR:
      return { ...state, ...action.payload };
    case ADD_TO_WISH_LIST:
      return { ...state, ...action.payload };
    case REMOVE_TO_WISH_LIST:
      return { ...state, myWishList: action.payload };
    case REMOVE_TO_CAR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// Actions (Api call)
export const getAllProducts = () => async (dispatch, getState) => {
  // Check if data exists at LocalStorage
  if (localStorage.getItem("products")) {
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: JSON.parse(localStorage.getItem("products")),
    });
    console.log("Data from LocalStorage");
    return;
  }
  try {
    // const url = "https://fakestoreapi.com/products?limit=5";
    const url = "https://fakestoreapi.com/products";
    const result = await axios.get(url);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: result.data,
    });
    // Save data at LocalStorage if no exists
    localStorage.setItem("products", JSON.stringify(result.data));
    console.log("Data from API");
  } catch (error) {
    console.log(error);
  }
};
export const getProductsByCategory =
  (category) => async (dispatch, getState) => {
    const url = `https://fakestoreapi.com/products/category/${category}`;
    // Check if data exists at LocalStorage
    if (localStorage.getItem(url)) {
      dispatch({
        type: GET_PRODUCTS_BY_CATEGORY,
        payload: JSON.parse(localStorage.getItem(url)),
      });
      console.log("Category data from LocalStorage");
      return;
    }
    try {
      const result = await axios.get(url);
      dispatch({
        type: GET_PRODUCTS_BY_CATEGORY,
        payload: result.data,
      });
      // Save data at LocalStorage if no exists
      localStorage.setItem(url, JSON.stringify(result.data));
      console.log("Category from API");
    } catch (error) {
      console.log(error);
    }
  };
// Actions (Remove product car)
export const removeProductCar =
  (product, indexParam) => async (dispatch, getState) => {
    let mainStage = getState().mainShop; //
    let stage = getState().mainShop.car; //
    const filterCarArray = stage.filter((currentProduct, index) => {
      // Return all products except the product passed as Param
      // return currentProduct.id !== product.id;
      return index !== indexParam;
    }); // Buscar el index de filter y eliminar con eso el producto en vez de id (ya que el index 0 no existe como id de producto)
    const output = {
      ...mainStage,
      itemsLength: mainStage.itemsLength - 1,
      car: filterCarArray,
      total: mainStage.total - product.price,
      card: mainStage.card - 1,
    };
    try {
      dispatch({
        type: REMOVE_TO_CAR,
        payload: output,
      });
      console.log("Item removed from car!", typeof 1);
    } catch (error) {
      console.log(error);
    }
  };
export const getProductInfo =
  (url = "https://fakestoreapi.com/products/1/") =>
  async (dispatch, getState) => {
    // Check if data exists in LocalSotrage
    if (localStorage.getItem(url)) {
      dispatch({
        type: GET_PRODUCT_INFO,
        payload: JSON.parse(localStorage.getItem(url)),
      });
      console.log("Single product from LocalStorage");
      return;
    }
    try {
      const result = await axios.get(url);
      dispatch({
        type: GET_PRODUCT_INFO,
        payload: result.data,
        /* This is a preview for Api-data
        id:1,
        title:'...',
        price:'...',
        category:'...',
        description:'...',
        image:'...'
         */
      });
      // Object to save at LocalStorage
      const saveToLocal = {
        id: result.data.id,
        title: result.data.title,
        price: result.data.price,
        category: result.data.category,
        description: result.data.description,
        image: result.data.image,
      };
      localStorage.setItem(url, JSON.stringify(saveToLocal));
      console.log("Single product from API");
    } catch (error) {
      console.log(error);
    }
  };

// Actions (Amount increase refers to input type "Number" selected by User)
export const addToCar =
  (product, amountIncrease) => async (dispatch, getState) => {
    if (amountIncrease == null) {
      // console.log("Increasing +1");
      amountIncrease = 1;
    }
    let stage = getState().mainShop;
    // Check for repetead added products
    /*  let repeteadProduct = stage.car.find((item) => item.id === product.id);
    let repetead = stage.car.filter((item) => {
      return item.id === product.id;
    }); */

    product.quantity = amountIncrease;
    product.price = product.price * amountIncrease; //

    const output = {
      array: stage.array,
      productInfo: stage.productInfo,
      itemsLength: stage.itemsLength + parseInt(amountIncrease), // Int for Car component
      card: stage.car.push(product), // Contains all products added to car
      total: stage.total + product.price, // Contains total price for all products
    };
    try {
      dispatch({
        type: ADD_TO_CAR,
        payload: output,
      });
      console.log("Actions: Product added to car", stage.itemsLength);
    } catch (error) {
      console.log(error);
    }
  };
export const addToWish = (product) => async (dispatch, getState) => {
  let stage = getState().mainShop;
  // CHECK IF CURRENT PRODUCT EXISTS IN STATE (USER CAN NOT ADD TWICE THE SAME PRODUCT )
  const found = stage.myWishList.find((el) => el.id === product.id);

  if (!found) {
    const output = {
      array: stage.array,
      productInfo: stage.productInfo,
      itemsLength: stage.itemsLength,
      card: stage.car,
      total: stage.total,
      myWishList: stage.myWishList.concat(product), // Adding product to myWishList array
    };
    try {
      dispatch({
        type: ADD_TO_WISH_LIST,
        payload: output,
      });
      console.log("Product added to wishlist");
    } catch (error) {
      console.log(error);
    }
  } else {
    // Error case: Product already exists in state
    console.error("This product exists in your Wish List!");
  }
};
export const removeToWish = (product) => async (dispatch, getState) => {
  let stage = getState().mainShop;
  // CHECK IF CURRENT PRODUCT EXISTS IN STAGE, REMOVE FROM STATE IF TRUE
  const filterArray = stage.myWishList.filter((currentProduct) => {
    return currentProduct.id !== product.id; // Get all items except the selected item to remove
  });
  const output = filterArray;
  try {
    dispatch({
      type: REMOVE_TO_WISH_LIST,
      payload: output,
    });
    console.log("Product removed from wishlist");
  } catch (error) {
    console.log(error);
  }
};
