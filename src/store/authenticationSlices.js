import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { browserHistory } from "..";
import AddCategory from "../pages/AddCategory";
import {
  errorNotification,
  successNotification,
} from "../services/notification";
import authService from "./helper/authHelper";

const user =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user"))
    : null;

// Login User
export const loginUser = createAsyncThunk(
  "loginUser",
  async (user, thunkAPI) => {
    console.log("user", user);
    try {
      const response = await authService.login(user);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.name,
          email: response.email,
          _id: response._id,
          isAdmin: response.isAdmin,
        })
      );
      console.log(response, "reesponse");
      successNotification("Giriş başarılı");
      browserHistory.push("/home");
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      browserHistory.push("/home");
      errorNotification(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getsellerInfo = createAsyncThunk(
  "sellerInfo",
  async (thunkAPI) => {
    console.log("user", user);
    try {
      const response = await authService.getInfoHelper();
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getSellerInfoById = createAsyncThunk(
  "/getSellerInfoById",
  async (id, thunkAPI) => {
    console.log(id, "id getsellerinfo");
    try {
      const response = await authService.getSellerInfoHelper(id);
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

export const updateSellerProfile = createAsyncThunk(
  "/updateSellerProfile",
  async (profile, thunkAPI) => {
    try {
      const response = await authService.updateUserProfileHelper(profile);
      successNotification("Profile updated successfully");
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateSellerImage = createAsyncThunk(
  "/updateSellerImage",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await authService.updateUserImageHelper({
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

export const RegisterUser = createAsyncThunk(
  "registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await authService.register(user);
      successNotification("Emailinizi onaylayınız");
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const VerifyEmailUser = createAsyncThunk(
  "VerifyEmailUser",
  async ({ id, token }, thunkAPI) => {
    try {
      return await authService.VerifyUser({ id, token });
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

export const ResetPasswordLink = createAsyncThunk(
  "post/resetPasswordLink",
  async (email, thunkAPI) => {
    try {
      console.log(email);
      return await authService.resetPasswordLink(email);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPasswordVerify = createAsyncThunk(
  "post/resetPasswordVerify",
  async ({ password, id, token }, thunkAPI) => {
    try {
      return await authService.resetPasswordVerify({ password, id, token });
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

export const GetUserDetails = createAsyncThunk(
  "get/userDetails",
  async (thunkAPI) => {
    try {
      return await authService.GetUserDetails();
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

export const getSellers = createAsyncThunk(
  "get/getSellers",
  async (thunkAPI) => {
    try {
      return await authService.GetSellers();
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
  user: user ? user : null,
  userDetail: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  sellers: null,
  sellerInfo: {},
  sellerDetails: {},
};

// Then, handle actions in your reducers:
const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSellerInfoById.fulfilled, (state, action) => {
        state.sellerDetails = action.payload;
        state.isLoading = false;
      })
      .addCase(getSellerInfoById.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(getSellerInfoById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getsellerInfo.fulfilled, (state, action) => {
        state.sellerInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(getsellerInfo.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getsellerInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(GetUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(GetUserDetails.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(GetUserDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(RegisterUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ResetPasswordLink.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(ResetPasswordLink.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(ResetPasswordLink.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordVerify.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(resetPasswordVerify.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(resetPasswordVerify.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(VerifyEmailUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(VerifyEmailUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(VerifyEmailUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSellers.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.sellers = action.payload;
      })
      .addCase(getSellers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getSellers.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export default authSlice.reducer;
