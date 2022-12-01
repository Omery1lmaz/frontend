import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import authService from "./helper/authHelper";
import productService from "./helper/productHelper";

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

export const getCategoryById = createAsyncThunk(
  "/getCategoryById",
  async ({id, userId}, thunkAPI) => {
    try {
      console.log("id", id, userId)
      return await productService.getCategoryByIdHelper({id, userId});
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
  async (id, thunkAPI) => {
    try {
      return await productService.getCategoryByIdHelper(id );
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
    async (category,thunkAPI) => {
      try {
        console.log(category)
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
  async ({category, id}, thunkAPI) => {
    try {
      console.log(id)
      console.log(category)
      return await productService.updateCategory({category, id});
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
  async (id,thunkAPI) => {
    try {
      return await productService.getProductsByIdHelper(id);
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


export const getProductsBySeller = createAsyncThunk(
  "/getProductsBySeller",
  async (id,thunkAPI) => {
    try {
      return await productService.getProductsBySeller(id);
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


export const addProduct = createAsyncThunk(
    "/addProduct",
    async (product,thunkAPI) => {
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
  async (product, productId, {thunkAPI}) => {
    try {
      return await productService.updateProduct(product, productId);
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
  product: {},

};

// Then, handle actions in your reducers:
const productSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
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
})


  },
});

export default productSlice.reducer;