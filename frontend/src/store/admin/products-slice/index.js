import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (FormData) => {
    try {
      if (!FormData) {
        console.log("formData is null in addNewProduct thunk");
        return res
          .status(400)
          .json({ message: "Form data is required in addNewProduct thunk" });
      }

      const result = await axios.post(
        "http://localhost:3000/api/admin/products/add",
        FormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result, "addnewproduct thunk result");
      return result?.data;
    } catch (error) {
      console.log(error, "error in addNewProduct thunk");
      res.status(500).json({ message: error.message, success: false });
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchallproducts",
  async () => {
    try {
      const result = await axios.get(
        "http://localhost:3000/api/admin/products/get"
      );
      console.log(result, "fetchallproducts thunk result");
      return result?.data;
    } catch (error) {
      console.log(error, "error in fetchAllProducts thunk");
      res.status(500).json({ message: error.message, success: false });
    }
  }
);

export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    try {
      if (!id) {
        console.log("id is null in editProduct thunk");
        return res.status(400).json({ message: "Product ID is required" });
      }

      if (!formData) {
        console.log("formData is null in editProduct thunk");
        return res.status(400).json({ message: "Form data is required" });
      }

      const result = await axios.put(
        `http://localhost:3000/api/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(result, "editProduct thunk result");
      return result?.data;
    } catch (error) {
      console.log(error, "error in editProduct thunk");
      res.status(500).json({ message: error.message, success: false });
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    try {
      if (!id) {
        console.log("id is null in deleteProduct thunk");
        return res.status(400).json({ message: "Product ID is required" });
      }
      const result = await axios.delete(
        `http://localhost:3000/api/admin/products/delete/${id}`
      );
      console.log(result, "deleteProduct thunk result");
      return result?.data;
    } catch (error) {
      console.log(error, "error in deleteProduct thunk");
      res.status(500).json({ message: error.message, success: false });
    }
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
       // console.log(action.payload.data, "action.payload.data");
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        //console.log("addNewProduct rejected", action.error);
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        console.log("fetchAllProducts pending");
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        //console.log(action.payload.data, "action.payload.data");
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        //console.log("fetchAllProducts rejected", action.error);
      });
  },
});

export default AdminProductsSlice.reducer;
