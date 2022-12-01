import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import authService from "./helper/authHelper";

const user = null;

// Login User
export const loginUser = createAsyncThunk(
  "loginUser",
  async (user, thunkAPI) => {
    try {
      const response = await authService.login(user);
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const RegisterUser = createAsyncThunk(
  "registerUser",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
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
      .addCase(GetUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(GetUserDetails.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
        state.user = null;
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
