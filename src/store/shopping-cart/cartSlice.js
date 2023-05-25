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
      console.log(newItem, "new Item");
      const existingItem = state.cartItems.find((item) => {
        return item.id === newItem.id;
      });
      const deneme = state.cartItems.find((item) => {
        if (item.seller.id !== newItem.seller.id) {
          state.cartItems = [];
        }
        state.totalQuantity = 0;

        return (
          item.id === newItem.id &&
          item.variation == newItem.variation &&
          item.title == newItem.title &&
          JSON.stringify(item.promotion) == JSON.stringify(newItem.promotion)
        );
      });
      if (!deneme) {
        console.log("No deneme", newItem.price);
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
          promotion: newItem.promotion,
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
      state.totalQuantity = quantity;
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        quantity
      );
    },
    removeAllItems(state, action) {
      state.totalAmount = 0;
      let quantity = 0;
      state.totalQuantity = quantity;
      setItemFunc((state.cartItems = []), state.totalAmount, quantity);
    },
    // ========= remove item ========

    removeItem(state, action) {
      const product = action.payload;
      console.log("remove item");
      const existingItem = state.cartItems.find((item) => {
        if (product.variation || product.promotion) {
          return (
            item.id === product.id &&
            item.variation === product.variation &&
            item.title === product.title &&
            JSON.stringify(item.promotion) == JSON.stringify(product.promotion)
          );
        } else {
          return item.id === product.id;
        }
      });

      if (existingItem?.quantity && existingItem?.quantity === 1) {
        console.log("asdakln");
        state.cartItems = state.cartItems.filter((item) => {
          if (product.variation || product.promotion) {
            return (
              // item.variation !== product.variation ||
              // item.title !== product.title ||
              // JSON.stringify(item.promotion) ==
              //   JSON.stringify(product.promotion)
              item.id !== product.id ||
              item.variation !== product.variation ||
              item.title !== product.title ||
              JSON.stringify(item.promotion) !==
                JSON.stringify(product.promotion)
            );
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
      console.log("delete item", product);
      if (state.cartItems.length == 1) state.cartItems = [];
      const existingItem = state.cartItems.find((item) => {
        if (product.variation || product.promotion) {
          return (
            item.id === product.id &&
            item.variation === product.variation &&
            item.title === product.title &&
            JSON.stringify(item.promotion) == JSON.stringify(product.promotion)
          );
        } else {
          return item.id === product.id;
        }
      });
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => {
          if (product.variation || product.promotion) {
            console.log("şlsömaflşökas");
            return (
              // item.variation !== product.variation ||
              // item.title !== product.title ||
              // JSON.stringify(item.promotion) ==
              //   JSON.stringify(product.promotion)
              item.id !== product.id ||
              item.variation !== product.variation ||
              item.title !== product.title ||
              JSON.stringify(item.promotion) !==
                JSON.stringify(product.promotion)
            );
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
