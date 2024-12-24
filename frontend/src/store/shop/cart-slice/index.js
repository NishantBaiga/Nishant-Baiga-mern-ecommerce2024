import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  isloading: false,
  cartItems: [],
  error: null,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      // Input validation
      if (!userId || !productId || !quantity) {
        console.error("Invalid data provided to add to cart thunk");
        return rejectWithValue({ message: "Invalid data provided" });
      } else {
        console.log(
          "add to cart thunk getting inputs :",
          userId,
          typeof userId,
          productId,
          typeof productId,
          quantity,
          typeof quantity
        );
      }

      // API request
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/shop/cart/add`,
        {
          userId,
          productId,
          quantity,
        }
      );

      console.log(response.data, "add to cart thunk response");
      return response.data;
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

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItem",
  async (userId, { rejectWithValue }) => {
    try {
      // Input validation
      if (!userId) {
        console.log("invalid data provided in fetchCartItem thunk");
        return res.status(400).json({ message: "invalid data provided" });
      } else {
        console.log(
          "fetch cart item thunk getting inputs :",
          userId,
          typeof userId
        );
      }

      // API request
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/shop/cart/get/${userId}`
      );

      console.log(response, "fetch cart item thunk response");
      return response.data;
    } catch (error) {
      console.error(error, "Error in fetch cart item thunk");
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

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      if (!userId || !productId) {
        console.log("invalid data provided in delete cart items thunk");
        return res.status(400).json({ message: "invalid data provided" });
      } else {
        console.log(
          "delete cart item thunk getting inputs",
          userId,
          typeof userId,
          productId,
          typeof productId
        );
      }

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/shop/cart/${userId}/${productId}`
      );
      console.log(response, "delete cart item thunk response");

      return response.data;
    } catch (error) {
      console.error(error, "Error in fetch cart item thunk");
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

export const updateCartItems = createAsyncThunk(
  "cart/updateCartItem",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      if (!userId || !productId || !quantity) {
        console.log("invalid data provided in update cart items thunk");
        return res.status(400).json({ message: "invalid data provided" });
      } else {
        console.log(
          "update cart item thunk getting inputs",
          userId,
          typeof userId,
          productId,
          typeof productId,
          quantity,
          typeof quantity
        );
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/shop/cart/update-cart`,
        { userId, productId, quantity }
      );
      console.log(response, "update cart item thunk response");

      return response.data;
    } catch (error) {
      console.error(error, "Error in fetch cart item thunk");
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

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isloading = false;
        state.cartItems = action.payload.data;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isloading = false;
        (state.error = true),
          (state.error = action.payload?.message || "Something went wrong");
        console.error(
          "Add to cart rejectederror:",
          action.payload,
          action.error
        );
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isloading = false;
        state.error = null;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isloading = false;
        (state.error = true),
          (state.error = action.payload?.message || "Something went wrong");
        console.error(
          "Fetch cart items rejected error:",
          action.payload,
          action.error
        );
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isloading = false;
        state.error = null;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isloading = false;
        (state.error = true),
          (state.error =
            action.payload?.message ||
            action.error?.message ||
            "Something went wrong");
        console.error(
          "Delete cart item rejected error:",
          action.payload,
          action.error
        );
      })
      .addCase(updateCartItems.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        state.isloading = false;
        state.cartItems = action.payload.data;
        state.error = null;
      })
      .addCase(updateCartItems.rejected, (state, action) => {
        state.isloading = false;
        (state.error = true),
          (state.error = action.payload?.message || "Something went wrong");
        console.error(
          "Update cart item rejected error:",
          action.payload,
          action.error
        );
      });
  },
});

export default shoppingCartSlice.reducer;
