import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {
  errorNotification,
  successNotification,
} from "../services/notification";
import authService from "./helper/authHelper";
import productService from "./helper/productHelper";
import { useNavigate } from "react-router-dom";
import { socket } from "../helper/socketHelper";
import { useDispatch } from "react-redux";
import { cartActions } from "./shopping-cart/cartSlice";
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

export const getAdminDashBoardInf = createAsyncThunk(
  "/getAdminDashBoardInf",
  async ({ query }, thunkAPI) => {
    try {
      return await productService.getAdminDashboardInf({ query });
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
      socket.emit("newOrder", response);
      console.log("response", response);
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

export const addVariation = createAsyncThunk(
  "/addVariation",
  async ({ variation }, thunkAPI) => {
    try {
      const response = await productService.addVariation({ variation });
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
      isTakeAway,
      tip,
    },
    thunkAPI
  ) => {
    try {
      productService.createOrder({
        name,
        products,
        user,
        seller,
        shippingAddress,
        orderMessage,
        productsQnty,
        totalPrice,
        isTakeAway,
        tip,
      });
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

export const createTip = createAsyncThunk(
  "/asdasd",
  async ({ tip, id, seller }, thunkAPI) => {
    try {
      const response = await productService.createTip({
        tip,
        id,
        seller,
      });
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

export const getOrderById = createAsyncThunk(
  "/getOrderById",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await productService.getOrderById({ id });
      successNotification("Order Başarıyla getirildi");
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
  async ({ id }, thunkAPI) => {
    try {
      return await productService.getCategoryByIdHelper({ id });
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
export const updateProductsImage = createAsyncThunk(
  "/updateProductsImage",
  async ({ id, formData }, thunkAPI) => {
    try {
      console.log("id", id);
      const response = await productService.updateProductsImage({
        id,
        formData,
      });
      successNotification("İmage Güncellendi");
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification("İmage Güncellenemedi");
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

export const getCatsBySeller = createAsyncThunk(
  "/getCatsBySeller",
  async (thunkAPI) => {
    try {
      const res = await productService.getCatsHelper();
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

export const getCategoriesBySeller = createAsyncThunk(
  "/getCategoriesBySeller",
  async (thunkAPI) => {
    try {
      console.log("aşsdkjakldjaskljdklasj");
      const response = await productService.getCategoriesBySellerHelper();
      console.log(response, "response get categories");
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);

export const getPromotionsBySeller = createAsyncThunk(
  "/getPromotionsBySeller",
  async (thunkAPI) => {
    try {
      const response = await productService.getPromotionsBySeller();
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);

export const getCategoriesBySellerId = createAsyncThunk(
  "/getCategoriesBySellerId",
  async (id, thunkAPI) => {
    console.log(id, "id");
    try {
      const response = await productService.getCategoriesBySellerIdHelper(id);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
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
      const res = await productService.updateCategory({ category, id });
      successNotification("Categori Güncellendi");
      return res;
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
      console.log(response, "response");
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

export const getProductsBySellerLimit = createAsyncThunk(
  "/getProductsBySellerLimit",
  async ({ id, skip, limit }, thunkAPI) => {
    console.log(skip, "skip");
    const v = skip == 1 ? 0 : skip * 10 - 10;
    try {
      const res = await productService.getProductsBySellerWithLimit({
        id,
        skip,
        limit,
      });
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

export const getOrderBySellerWithLimit = createAsyncThunk(
  "/getOrderBySellerWithLimit",
  async ({ skip, limit, query }, thunkAPI) => {
    console.log(limit, "limit");
    const v = skip === 1 ? 0 : skip * 10 - 10;
    try {
      const res = await productService.getOrderBySellerWithLimit({
        skip,
        limit,
        query,
      });
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
  async ({ product, formData }, thunkAPI) => {
    try {
      for (var key of formData.entries()) {
        console.log(JSON.stringify(key[0]) + ", " + JSON.stringify(key[1]));
      }

      return await productService.addProduct({ product, formData });
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
    try {
      const response = await productService.updateProduct({
        product,
        productId,
      });
      successNotification("Product successfully updated");
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification("Product Güncellenemedi");
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
  order: {},
  product: {},
  sellerProducts: [],
  adminDashBoard: {},
  promotions: [],
};

// Then, handle actions in your reducers:

const productSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getPromotionsBySeller.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.promotions = action.payload;
      })
      .addCase(getPromotionsBySeller.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getPromotionsBySeller.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(updateProductsImage.fulfilled, (state, action) => {
        state.isLoadingP = false;
      })
      .addCase(updateProductsImage.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(updateProductsImage.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getOrderBySellerWithLimit.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.orders = action.payload;
      })
      .addCase(getOrderBySellerWithLimit.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getOrderBySellerWithLimit.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getAdminDashBoardInf.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.adminDashBoard = action.payload;
      })
      .addCase(getAdminDashBoardInf.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getAdminDashBoardInf.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getCategoriesBySellerId.fulfilled, (state, action) => {
        console.log(action.payload, "seller categories");
        state.isLoadingP = false;
        state.sellerCategories = action.payload;
      })
      .addCase(getCategoriesBySellerId.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getCategoriesBySellerId.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getProductsBySellerLimit.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.sellerProducts = action.payload;
      })
      .addCase(getProductsBySellerLimit.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getProductsBySellerLimit.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getCatsBySeller.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.sellerCategories = action.payload;
      })
      .addCase(getCatsBySeller.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getCatsBySeller.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload;
      })
      .addCase(getOrderById.pending, (state, action) => {
        state.isLoadingP = true;
      })
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
        state.order = action.payload;
        state.isSuccessP = {
          status: "200",
        };
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
        state.isSuccessP = true;
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
        state.category = action.payload;
        console.log(action.payload, "action payload");
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
        state.isLoadingP = false;
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
