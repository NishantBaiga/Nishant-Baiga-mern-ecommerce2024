import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalUrl: null,
  isLoading: false,
  orderId: null,
  error: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      if (!orderData) {
        console.log("formData is null in addNewProduct thunk");
        return res
          .status(400)
          .json({ message: "Form data is required in addNewProduct thunk" });
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/shop/order/create`,
        orderData
      );

      console.log(response, "create new order thunk response");
      return response.data;
    } catch (error) {
      console.error("Error in create new order thunk:", error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: "No response received from server" });
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      if (!paymentData) {
        console.log("formData is null in addNewProduct thunk");
        return res
          .status(400)
          .json({ message: "Form data is required in addNewProduct thunk" });
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/shop/order/capture`,
        { paymentId, payerId, orderId }
      );

      console.log(response, "capture payment thunk response");
      return response.data;
    } catch (error) {
      console.error("Error in capture payment thunk:", error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: "No response received from server" });
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const getAllOrdersByUser = createAsyncThunk(
  "/order/getAllOrdersByUser",
  async (userId, { rejectWithValue }) => {
    try {

      if (!userId) {
        console.error("User ID is required in getAllOrdersByUser");
        
      }
      else {
        console.log("getAllOrdersByUser thunk getting inputs :", userId);
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/shop/order/list/${userId}`
      );

      console.log(response, "getAllOrdersByUser thunk response");
      return response.data;
    } catch (error) {
      console.error("Error in getAllOrdersByUser thunk:", error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: "No response received from server" });
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return res.status(400).json({ message: "Order ID is required in getOrderDetails" });
      } else {
        console.log("getOrderDetails thunk getting inputs :", id);
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/shop/order/details/${id}`
      );

      console.log(response, "getOrderDetails thunk response");
      return response.data;
    } catch (error) {
      console.error("Error in getOrderDetails thunk:", error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: "No response received from server" });
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

const ShoppingOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalUrl = action.payload.approvalLink;
        state.orderId = action.payload.orderId;
        state.error = null;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.orderId = null;
        state.approvalUrl = null;
        state.error = action.payload;
      })
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(capturePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
        state.error = null;
      })
      .addCase(getAllOrdersByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        state.error = action.payload;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
        state.error = null;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error = action.payload;
      });
  },
});

export const { resetOrderDetails } = ShoppingOrderSlice.actions;

export default ShoppingOrderSlice.reducer;
