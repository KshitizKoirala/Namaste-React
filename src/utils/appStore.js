import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
  // Add slices here
  reducer: {
    cart: cartReducer,
    // user: userReducer
  },
});

export default appStore;
