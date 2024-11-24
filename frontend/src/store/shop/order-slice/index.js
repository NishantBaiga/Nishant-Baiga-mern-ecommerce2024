import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  approvalUrl: null,
  isLoading: false,
  orderId: null,
  error: null,
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
        "http://localhost:3000/api/shop/order/create",
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

const ShoppingOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalUrl = action.payload.approvalUrl;
        state.orderId = action.payload;
        state.error = null;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.orderId = null;
        state.approvalUrl = null;
        state.error = action.payload;
      });
  },
});

export default ShoppingOrderSlice.reducer;
