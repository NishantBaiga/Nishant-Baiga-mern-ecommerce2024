import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

export const getUserProfile = createAsyncThunk(
  "handleProfile/getUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/shop/profile/get/${userId}`
      );
      console.log(response, "get user profile thunk response");
      return response.data;
    } catch (error) {
      console.log("Error in get user profile thunk:", error);
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

const updateUserProfile = createAsyncThunk(
  "handleProfile/updateUserProfile",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/shop/profile/update`,
        user
      );
      console.log(response, "update user profile thunk response");
      return response.data;
    } catch (error) {
      console.log("Error in update user profile thunk:", error);
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

const handleProfileSlice = createSlice({
  name: "handleProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default handleProfileSlice.reducer;
