import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
  error: null,
};

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/common/feature/get"
      );
      console.log(response, "getFeatureImages thunk response");
      return response.data;
    } catch (error) {
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

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image, { rejectWithValue }) => {
    try {
      if (!image) {
        return rejectWithValue({ message: "Image data is required in addFeatureImage thunk" });
      }
      const response = await axios.post(
        "http://localhost:3000/api/common/feature/add",
        { image }
      );
      console.log(response, "addFeatureImage thunk response");
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

export const deleteFeatureImage = createAsyncThunk(
  "/order/deleteFeatureImage",
  async (imageId, { rejectWithValue }) => {
    try {
      if (!imageId) {
        return rejectWithValue({ message: "Image ID is required in deleteFeatureImage thunk" });
      }

      const response = await axios.delete(
        `http://localhost:3000/api/common/feature/delete/${imageId}`
      );
      console.log(response, "deleteFeatureImage thunk response");
      return response.data;
    } catch (error) {

      console.error(error, "Error in deleteFeatureImage thunk");
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

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.featureImageList = [];
        state.error = action?.payload?.message || "Something went wrong";
      })
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.featureImageList = [...state.featureImageList, action.payload.data];
      })
      .addCase(addFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload?.message || "Something went wrong";
      })
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.featureImageList = state.featureImageList.filter(
          (image) => image._id !== action.payload.data._id
        );
      })
      .addCase(deleteFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload?.message || "Something went wrong";
      });
  },
});

export default commonSlice.reducer;

