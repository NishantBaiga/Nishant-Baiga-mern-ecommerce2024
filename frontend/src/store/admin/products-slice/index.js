import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (FormData) => {

    const result = await axios.post(
      "http://localhost:3000/api/admin/products/add",
      FormData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(result,"addnewproduct result");
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchallproducts",
  async () => {
    const result = await axios.get(
      "http://localhost:3000/api/admin/products/get"
    );

    console.log(result, "fetchallproducts result");
    
    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:3000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:3000/api/admin/products/delete/${id}`
    );

    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
        console.log("addNewProduct pending");
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally, add the new product to the state list
        state.productList.push(action.payload.data);
        console.log(action.payload.data, "action.payload.data");
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        console.log("addNewProduct rejected", action.error);
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        console.log("fetchAllProducts pending");
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        console.log(action.payload.data, "action.payload.data");
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        console.log("fetchAllProducts rejected", action.error);
      });
  },
});

export default AdminProductsSlice.reducer;
