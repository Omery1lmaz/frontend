import { configureStore } from "@reduxjs/toolkit";
import authenticationSlices from "./authenticationSlices";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import productSlices from "./productSlices";
import waiterSlice from "./waiterSlice";
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    auth: authenticationSlices,
    product: productSlices,
    waiter: waiterSlice,
  },
});

export default store;
