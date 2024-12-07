import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  reviewList: [],
  error: null,
};

export const addProductReview = createAsyncThunk(
  "review/addProductReview",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/shop/review/add/",
      formData
      );
      console.log(response, "addProductReview thunk response");
      return response.data;
    } catch (error) {
      console.error("Error in addProductReview thunk:", error);
      throw error;
    }
  }
);

export const getProductReviews = createAsyncThunk(
  "review/getProductReviews",
  async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/shop/review/${productId}`
      );
      console.log(response, "getProductReviews thunk response");
      return response.data;
    } catch (error) {
      console.error("Error in getProductReviews thunk:", error);
      throw error;
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewList = action.payload;
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewList = action.payload;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetReviewList } = reviewSlice.actions;

export default reviewSlice.reducer;
