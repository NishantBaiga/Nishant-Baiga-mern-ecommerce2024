import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
  error: null,
};

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (formData, { rejectWithValue }) => {
    try {
      if (!formData) {
        return rejectWithValue({ message: "Form data is required" });
      } else {
        console.log("add address thunk getting form data", formData);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/shop/address/add`,
        formData
      );

      console.log(response, "add address thunk response");
      return response.data;
    } catch (error) {
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

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        console.log("invalid data provided in fetch addresses thunk");
        return res.status(400).json({ message: "invalid data provided" });
      } else {
        console.log(
          "fetch addresses thunk getting inputs :",
          userId,
          typeof userId
        );
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/shop/address/get/${userId}`
      );
      console.log(response, "fetch addresses thunk response");

      return response.data;
    } catch (error) {
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

export const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      if (!userId || !addressId || !formData) {
        console.log("invalid data provided in edit address thunk");
        return res.status(400).json({ message: "invalid data provided" });
      } else {
        console.log(
          "edit address thunk getting inputs :",
          userId,
          typeof userId,
          addressId,
          typeof addressId,
          formData,
          typeof formData
        );
      }
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/shop/address/update/${userId}/${addressId}`,
        formData
      );
      console.log(response, "edit address thunk response");

      return response.data;
    } catch (error) {
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

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      if (!userId || !addressId) {
        console.log("invalid data provided in delete address thunk");
        return res.status(400).json({ message: "invalid data provided" });
      } else {
        console.log(
          "delete address thunk getting inputs :",
          userId,
          typeof userId,
          addressId,
          typeof addressId
        );
      }
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/shop/address/delete/${userId}/${addressId}`
      );
      console.log(response, "delete address thunk response");

      return response.data;
    } catch (error) {
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

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addressList.push(action.payload.data);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAddresses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.addressList = action.payload.data;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
