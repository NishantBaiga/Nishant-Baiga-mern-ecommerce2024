import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  userList: [],
  error: null,
};

export const getAllUsers = createAsyncThunk("/users/getAllUsers", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/users/fetchAllUsers`
    );
    return response.data;
  } catch (error) {
    console.log("error in getAllUsers thunk", error);
  }
});

export const deleteUser = createAsyncThunk("/users/deleteUser", async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/admin/users/deleteUser/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("error in deleteUser thunk", error);
  }
});

export const AdminFetchUsersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = state.userList.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default AdminFetchUsersSlice.reducer;
