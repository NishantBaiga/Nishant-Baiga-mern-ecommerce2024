import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllFilteredProducts ",
  async ({ filterParams, sortParams }) => {
 
    // console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");
    
    
    const query = new URLSearchParams({
      ...filterParams,
      sortBy : sortParams
    });

    const result = await axios.get(
      `http://localhost:3000/api/admin/products/get?${query}`

    );

    // console.log(result,"fetchAllFilteredProducts result");
    
    return result?.data;
  }
);

const shopProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
        console.log("fetchAllFilteredProducts pending");
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        console.log(action.payload.data, "action.payload.data");
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        console.log(action.error,"fetchAllFilteredProducts rejected");
      });
  },
});

export default shopProductSlice.reducer;
