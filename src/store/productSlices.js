import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {
  errorNotification,
  successNotification,
} from "../services/notification";
import authService from "./helper/authHelper";
import productService from "./helper/productHelper";
import { useSelector } from "react-redux";

export const getCategories = createAsyncThunk(
  "/getCategories",
  async (thunkAPI) => {
    try {
      return await productService.getCategoriesHelper();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  "/updateOrderStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await productService.UpdateOrderStatus({ id, status });
      successNotification(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(error.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "/createOrder",
  async (
    {
      totalPrice,
      orderMessage,
      name,
      products,
      user,
      seller,
      shippingAddress,
      productsQnty,
    },
    thunkAPI
  ) => {
    try {
      const response = await productService.createOrder({
        name,
        products,
        user,
        seller,
        shippingAddress,
        orderMessage,
        productsQnty,
        totalPrice,
      });
      const v = {
        response,
        status: "ok",
      };
      console.log("test");
      successNotification("Order Oluşturuldu");
      return {
        response,
        status: "200",
      };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(error.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOrderBySeller = createAsyncThunk(
  "/getOrderBySeller",
  async (thunkAPI) => {
    try {
      return await productService.getOrderBySeller();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "/deleteOrder",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await productService.deleteOrder({ id });
      successNotification("Order Başarıyla silindi");
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(error.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "/getCategoryById",
  async ({ id, userId }, thunkAPI) => {
    try {
      console.log("id", id, userId);
      return await productService.getCategoryByIdHelper({ id, userId });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "/getProduct",
  async ({ id }, thunkAPI) => {
    try {
      console.log("id", id);
      return await productService.getProduct({ id });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCategoryById = createAsyncThunk(
  "/deleteCategoryById",
  async ({ id, user }, thunkAPI) => {
    try {
      console.log("id", id, user);
      return await productService.deleteCategoryById({ id, user });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProductById = createAsyncThunk(
  "/deleteProductById",
  async ({ id, user }, thunkAPI) => {
    try {
      console.log("id", id, user);
      return await productService.deleteProductById({ id, user });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCategoriesBySeller = createAsyncThunk(
  "/getCategoriesBySeller",
  async ({ id, user }, thunkAPI) => {
    try {
      console.log("getCategoriesBySeller", id, user);
      return await productService.getCategoriesBySellerHelper({ id, user });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addCategories = createAsyncThunk(
  "/addCategories",
  async (category, thunkAPI) => {
    try {
      console.log(category);
      return await productService.addCategoriesHelper(category);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "/updateCategory",
  async ({ category, id }, thunkAPI) => {
    try {
      console.log(id);
      console.log(category);
      return await productService.updateCategory({ category, id });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProductsById = createAsyncThunk(
  "/getProducts",
  async (id, thunkAPI) => {
    try {
      const response = await productService.getProductsByIdHelper(id);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(error.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProductsBySeller = createAsyncThunk(
  "/getProductsBySeller",
  async (id, thunkAPI) => {
    try {
      const res = await productService.getProductsBySeller(id);
      return res;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(error.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "/addProduct",
  async (product, thunkAPI) => {
    try {
      return await productService.addProduct(product);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "/updateProduct",
  async ({ product, productId }, { thunkAPI }) => {
    console.log("updateProduct", product, productId);
    try {
      return await productService.updateProduct({ product, productId });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  categories: [],
  category: {},
  sellerCategories: [],
  isErrorP: false,
  isSuccessP: false,
  isLoadingP: false,
  messageP: "",
  products: [],
  orders: [],
  product: {},
};

// Then, handle actions in your reducers:

const productSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoadingP = false;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoadingP = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getProduct.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.orders = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(deleteOrder.pending, (state, action) => {
        state.isLoadingP = true;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoadingP = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(createOrder.pending, (state, action) => {
        state.isLoadingP = true;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoadingP = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(deleteCategoryById.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getOrderBySeller.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoadingP = false;
      })
      .addCase(getOrderBySeller.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getOrderBySeller.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.sellerCategories = action.payload;
        state.isLoadingP = false;
      })
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(deleteProductById.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoadingP = false;
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getCategories.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isLoadingP = false;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getCategoryById.pending, (state, action) => {
        state.isLoadingP = true;
      })

      .addCase(getCategoriesBySeller.fulfilled, (state, action) => {
        state.sellerCategories = action.payload;
        state.isLoadingP = false;
        state.isSuccessP = true;
      })
      .addCase(getCategoriesBySeller.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getCategoriesBySeller.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(addCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoadingP = false;
        state.isSuccessP = true;
      })
      .addCase(addCategories.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(addCategories.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.isSuccessP = true;
        state.messageP = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoadingP = false;
        state.isSuccessP = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getProductsBySeller.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLisLoadingPoadingP = false;
        state.isSuccessP = true;
      })
      .addCase(getProductsBySeller.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getProductsBySeller.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getProductsById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoadingP = false;
        state.isSuccessP = true;
      })
      .addCase(getProductsById.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getProductsById.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoadingP = false;
        state.isSuccessP = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.isLoadingP = true;
      });
  },
});

export default productSlice.reducer;
