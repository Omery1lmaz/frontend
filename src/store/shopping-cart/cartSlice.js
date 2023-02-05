import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const totalAmount =
  localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0;

const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;

const setItemFunc = (item, totalAmount, totalQuantity) => {
  console.log(totalQuantity, "totalquantity");
  localStorage.setItem("cartItems", JSON.stringify(item));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", totalQuantity);
};

const initialState = {
  cartItems: items,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // =========== add item ============
    addItem(state, action) {
      const newItem = action.payload;
      console.log(newItem, "new item test");
      const existingItem = state.cartItems.find((item) => {
        return item.id === newItem.id;
      });
      const deneme = state.cartItems.find((item) => {
        if (item.seller !== newItem.seller) {
          state.cartItems = [];
        }
        state.totalQuantity = 0;

        return item.id === newItem.id && item.variation == newItem.variation;
      });
      if (!deneme) {
        // ===== note: if you use just redux you should not mute state array instead of clone the state array, but if you use redux toolkit that will not a problem because redux toolkit clone the array behind the scene

        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          image01: newItem.image01,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          seller: newItem.seller,
          variation: newItem.variation,
          seller: newItem.seller ? newItem.seller : null,
        });
      } else {
        deneme.quantity++;
        deneme.totalPrice = Number(deneme.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),

        0
      );
      let quantity = 0;
      state.cartItems.map((item) => (quantity += item.quantity));
      console.log(quantity);
      state.totalQuantity = quantity;
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        quantity
      );
    },

    // ========= remove item ========

    removeItem(state, action) {
      const product = action.payload;
      console.log(product, "remove item");
      const existingItem = state.cartItems.find((item) => {
        console.log(
          item.id === product.id && product.variation == item.variation
        );
        if (product.variation) {
          console.log("product has a variation");
          return item.id == product.id && item.variation == product.variation;
        } else return item.id !== product.id;
      });

      if (
        existingItem &&
        existingItem.quantity &&
        existingItem.quantity === 1
      ) {
        state.cartItems = state.cartItems.filter((item) => {
          if (product.variation) {
            return item.id == product.id && item.variation != product.variation;
          } else return item.id !== product.id;
        });
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      let quantity = 0;
      state.cartItems.map((item) => (quantity += item.quantity));
      console.log(quantity);
      state.totalQuantity = quantity;

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        quantity
      );
    },

    //============ delete item ===========

    deleteItem(state, action) {
      const product = action.payload;
      console.log(product, "product delete item");
      console.log(state.cartItems.length, "state");
      if (state.cartItems.length == 1) state.cartItems = [];
      const existingItem = state.cartItems.find((item) => {
        if (product.variation && state.cartItems.length > 1) {
          console.log("product has a variation");
          console.log("product id", product.id);
          console.log("item id", item.id);
          console.log(
            item.id == product.id && item.variation == product.variation,
            "test safjıashfash"
          );
          return item.id == product.id && item.variation == product.variation;
        } else return item.id !== product.id;
      });

      if (existingItem) {
        console.log(existingItem, "existing item delete");
        state.cartItems = state.cartItems.filter((item) => {
          if (product.variation) {
            return item.id == product.id && item.variation != product.variation;
          } else return item.id !== product.id;
        });
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      let quantity = 0;
      state.cartItems.map((item) => (quantity += item.quantity));
      console.log(quantity);
      state.totalQuantity = quantity;
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        quantity
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
