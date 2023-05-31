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
          state.totalQuantity = 0;
        }
        return (
          JSON.stringify(item.promotion) == JSON.stringify(newItem.promotion) &&
          JSON.stringify(item.variation) == JSON.stringify(newItem.variation) &&
          item.id == newItem.id
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
        console.log("else");
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
      const existingItem = state.cartItems.find((item) => {
        return (
          JSON.stringify(product.promotion) == JSON.stringify(item.promotion) &&
          JSON.stringify(product.variation) == JSON.stringify(item.variation) &&
          product.id == item.id
        );
      });
      if (existingItem?.quantity && existingItem?.quantity === 1) {
        console.log("existing item quantity = 1", JSON.stringify(existingItem));
        state.cartItems = state.cartItems.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(existingItem)
        );
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
      if (state.cartItems.length == 1) {
        state.cartItems = [];
      } else {
        const existingIndex = state.cartItems.findIndex((item) => {
          return (
            JSON.stringify(product.promotion) ==
              JSON.stringify(item.promotion) &&
            JSON.stringify(product.variation) ==
              JSON.stringify(item.variation) &&
            product.id == item.id
          );
        });
        console.log(
          existingIndex,
          "existingIndex",
          state.cartItems[existingIndex].quantity
        );
        state.totalQuantity =
          state.totalQuantity - state.cartItems[existingIndex].quantity;
        const newlist = [...state.cartItems];
        newlist.splice(existingIndex, 1);
        state.cartItems = newlist;
      }
      // state.totalQuantity =
      //   state.totalQuantity - state.cartItems[existingIndex].quantity;
      // const existingItem = state.cartItems.find((item) => {
      //   return (
      //     JSON.stringify(product.promotion) == JSON.stringify(item.promotion) &&
      //     JSON.stringify(product.variation) == JSON.stringify(item.variation) &&
      //     product.id == item.id
      //   );
      // });
      // if (existingItem) {
      //   state.cartItems = state.cartItems.filter((item) => {
      //     if (product.variation || product.promotion) {
      //       console.log("şlsömaflşökas");
      //       return (
      //         // item.variation !== product.variation ||
      //         // item.title !== product.title ||
      //         // JSON.stringify(item.promotion) ==
      //         //   JSON.stringify(product.promotion)
      //         item.id !== product.id ||
      //         item.variation !== product.variation ||
      //         item.title !== product.title ||
      //         JSON.stringify(item.promotion) !==
      //           JSON.stringify(product.promotion)
      //       );
      //     } else return item.id !== product.id;
      //   });
      //   state.totalQuantity = state.totalQuantity - existingItem.quantity;
      // }
      // state.totalQuantity = state.totalQuantity - state.cartItems[existingItem].quantity existingItem.quantity;

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
