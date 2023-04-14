import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  errorNotification,
  successNotification,
} from "../services/notification";
import waiterService from "./helper/waiterHelper";
// GET WAITER
export const getWaiter = createAsyncThunk(
  "/getWaiter",
  async ({ id }, thunkAPI) => {
    try {
      return await waiterService.getWaiter(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // return thunkAPI.rejectWithValue(message);
      errorNotification("Error");
      console.log(error);
    }
  }
);
// GET WAITERS
export const getWaiters = createAsyncThunk("/getWaiters", async (thunkAPI) => {
  try {
    return await waiterService.getWaitersHelper();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // return thunkAPI.rejectWithValue(message);
    errorNotification("Error");
    console.log(error);
  }
});

// GET WAITERS BY SELLER ID
export const getWaitersBySellerId = createAsyncThunk("/getWaitersBySellerId", async ({ id }, thunkAPI) => {
  try {
    return await waiterService.getWaitersBySellerIdHelper(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // return thunkAPI.rejectWithValue(message);
    errorNotification("Error");
    console.log(error);
  }
});


// ADD WAITER
export const addWaiter = createAsyncThunk(
  "/addWaiter",
  async ({ waiter }, thunkAPI) => {
    console.log(waiter);
    try {
      const v = await waiterService.addWaiterHelper(waiter);
      successNotification("Waiter Eklendi");
      return v;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // return thunkAPI.rejectWithValue(message);
      errorNotification("Error");
      console.log(error);
    }
  }
);

// UPDATE WAITER
export const updateWaiter = createAsyncThunk(
  "/updateWaiter",
  async ({ waiter }, thunkAPI) => {
    try {
      const v = await waiterService.updateWaiterHelper(waiter);
      successNotification("Waiter updated");
      return v;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // return thunkAPI.rejectWithValue(message);
      errorNotification("Error");
      console.log(error);
    }
  }
);
// DELETE WAITER
export const deleteWaiter = createAsyncThunk(
  "/deleteWaiter",
  async ({ id }, thunkAPI) => {
    try {
      const v = await waiterService.deleteWaiterHelper(id);
      successNotification("Waiter deleted");
      return v;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // return thunkAPI.rejectWithValue(message);
      errorNotification("Error");
      console.log(error);
    }
  }
);

const initialState = {
  waiters: [],
  waiter: {},
  isErrorW: false,
  isSuccessW: false,
  isLoadingW: false,
};

// Then, handle actions in your reducers:

const waiterSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      // Get Waiter By ID
      .addCase(getWaiter.fulfilled, (state, action) => {
        state.isLoadingW = false;
        state.waiter = action.payload;
      })
      .addCase(getWaiter.rejected, (state, action) => {
        state.isErrorW = true;
        state.isSuccessW = false;
        state.isLoadingW = false;
      })
      .addCase(getWaiter.pending, (state, action) => {
        state.isLoadingW = true;
      })
      // Get Waiters By Seller
      .addCase(getWaiters.fulfilled, (state, action) => {
        state.isLoadingW = false;
        state.waiters = action.payload;
      })
      .addCase(getWaiters.rejected, (state, action) => {
        state.isErrorW = true;
        state.isSuccessW = false;
        state.isLoadingW = false;
      })
      .addCase(getWaiters.pending, (state, action) => {
        state.isLoadingW = true;
      })
      // GET WAITERS BY SELLER ID
      .addCase(getWaitersBySellerId.fulfilled, (state, action) => {
        state.isLoadingW = false;
        console.log(action.payload, "waiters action payload");
        state.waiters = action.payload;
      })
      .addCase(getWaitersBySellerId.rejected, (state, action) => {
        state.isErrorW = true;
        state.isSuccessW = false;
        state.isLoadingW = false;
      })
      .addCase(getWaitersBySellerId.pending, (state, action) => {
        state.isLoadingW = true;
      })
      // Add Waiter
      .addCase(addWaiter.fulfilled, (state, action) => {
        state.isLoadingW = false;
        state.isSuccessW = true;
      })
      .addCase(addWaiter.rejected, (state, action) => {
        state.isErrorW = true;
        state.isSuccessW = false;
        state.isLoadingW = false;
      })
      .addCase(addWaiter.pending, (state, action) => {
        state.isLoadingW = true;
      })
      // UPDATE WAITER BY ID
      .addCase(updateWaiter.fulfilled, (state, action) => {
        state.isLoadingW = false;
        state.isSuccessW = true;
      })
      .addCase(updateWaiter.rejected, (state, action) => {
        state.isErrorW = true;
        state.isSuccessW = false;
        state.isLoadingW = false;
      })
      .addCase(updateWaiter.pending, (state, action) => {
        state.isLoadingW = true;
      });
  },
});

export default waiterSlice.reducer;
