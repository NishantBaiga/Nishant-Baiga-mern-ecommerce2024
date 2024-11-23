import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
  error: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllFilteredProducts ",
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
    // console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");

    if (!filterParams) {
      return res.status(400).json({
        message:
          "Filter params are required in fetch all filtered products thunk",
      });
    }

    if (!sortParams) {
      return res.status(400).json({
        message:
          "Sort params are required in fetch all filtered products thunk",
      });
    }

    console.log(
      filterParams,
      sortParams,
      "fetch all filtered products thunk inputs"
    );

    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });

      const result = await axios.get(
        `http://localhost:3000/api/shop/products/get?/${query.toString()}`
      );
      console.log(result, "fetchAllFilteredProducts result");
      return result?.data;
    } catch (error) {
      console.error(error, "Error in add to cart thunk");
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Response error:", error.response.data);
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // No response received
        console.error("No response received from server:", error.request);
        return rejectWithValue({ message: "No response received from server" });
      } else {
        // Unexpected error
        console.error("Unexpected error:", error.message);
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails ",
  async (id, { rejectWithValue }) => {
    //console.log(id, "id");

    try {
      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      } else {
        console.log(id, "id", typeof id);
      }

      const result = await axios.get(
        `http://localhost:3000/api/shop/products/get/${id}`
      );

      console.log("fetchProductDetails result:", result);
      return result?.data;
    } catch (error) {
      console.error(error, "Error in add to cart thunk");
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Response error:", error.response.data);
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // No response received
        console.error("No response received from server:", error.request);
        return rejectWithValue({ message: "No response received from server" });
      } else {
        // Unexpected error
        console.error("Unexpected error:", error.message);
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

const shopProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        console.error(
          "fetchAllFilteredProducts pending :",
          action.payload,
          action.error
        );
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.productList = action?.payload?.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action?.payload?.message || "Something went wrong";
        console.error(
          "fetchAllFilteredProducts rejected :",
          action.payload,
          action.error
        );
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        console.error(
          "fetchProductDetails pending :",
          action.payload,
          action.error
        );
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = [];
        state.error = action?.payload?.message  || "something went wrong"
        console.error(
          "fetchProductDetails rejected :",
          action.payload,
          action.error
        );
      });
  },
});

export const { setProductDetails } = shopProductSlice.actions;

export default shopProductSlice.reducer;
