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
  async ({ filterParams, sortParams }) => {
    // console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");

    if (!filterParams) {
      return res.status(400).json({ message: "Filter params are required in fetch all filtered products thunk" });
    }

    if (!sortParams) {
      return res.status(400).json({ message: "Sort params are required in fetch all filtered products thunk" });
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
      `http://localhost:3000/api/shop/products/get?/${query}`
    );
    console.log(result,"fetchAllFilteredProducts result");
    return result?.data  ;
   } catch (error) {
    console.log(error, "error in fetchAllFilteredProducts thunk");
    res.status(500).json({ message: error.message, success: false });
    
   }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails ",
  async (id) => {
   //console.log(id, "id");
 
    try {  
      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
       }else{
         console.log(id, "id", typeof id);
       }
     
    const result = await axios.get(
      `http://localhost:3000/api/shop/products/get/${id}`
    );

    console.log("fetchProductDetails result:" ,result);
    return result?.data;
    } catch (error) {
      console.log(error, "error in fetchProductDetails thunk");
       res.status(500).json({ message: error.message, success: false });
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
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("fetchAllFilteredProducts pending :", action.payload, action.error);
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        //console.log(action.payload.data, "action.payload.data");
        state.isLoading = false;
        state.error = null;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      state.error= action?.payload?.message || "Something went wrong";
        state.error = true;
       console.log( "fetchAllFilteredProducts rejected :",action.payload,action.error);
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
        console.log("fetchProductDetails pending");
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
        //console.log(action.payload.data, "action.payload.data");
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
        console.log("fetchProductDetails rejected :",action.payload,action.error, );
      });
  },
});


export const { setProductDetails } = shopProductSlice.actions;  

export default shopProductSlice.reducer;
