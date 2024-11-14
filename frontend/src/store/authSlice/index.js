import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state of the auth slice
const initialState = {
  isAuthenticated: false, // Track if the user is authenticated
  isLoading: true, // Track loading state during API requests
  user: null, // Store user data when authenticated
};

// Thunk to handle user registration
export const register = createAsyncThunk("auth/register", async (formData) => {
  // Sends a POST request to the server to register a new user
  const response = await axios.post(
    "http://localhost:3000/api/auth/register",
    formData, // Data passed to the registration request (name, email, password)
    { withCredentials: true } // Ensures cookies are included for authentication
  );
  return response.data; // Return the response data from the API
});

// Thunk to handle user login
export const login = createAsyncThunk("auth/login", async (formData) => {
  // Sends a POST request to the server to log in the user
  const response = await axios.post(
    "http://localhost:3000/api/auth/login",
    formData, // Data passed to the login request (email, password)
    { withCredentials: true } // Ensures cookies are included for authentication
  );
  return response.data; // Return the response data from the API
});

// Thunk to handle user logout
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  // Sends a POST request to log out the user
  const response = await axios.post(
    "http://localhost:3000/api/auth/logout",
    {}, // Empty payload for the logout request
    { withCredentials: true } // Ensures cookies are included for session termination
  );
  return response.data; // Return the response data from the API
});

// Thunk to check if the user is authenticated
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  // Sends a GET request to check the current authentication state
  const response = await axios.get(
    "http://localhost:3000/api/auth/check-auth",
    {
      withCredentials: true, // Ensures cookies are included to verify session
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate", // Prevents caching to always get the latest status
      },
    }
  );
  return response.data; // Return the authentication status
});

// Create the auth slice
const authslice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state defined earlier
  reducers: {
    // Reducer to manually set the user (if needed for external operations)
    setUser: (state, action) => {
      // This function can be used to manually update the user state
    },
  },
  extraReducers: (builder) => {
    // Handling async actions (extraReducers for thunk actions)
    builder
      // Handling registration
      .addCase(register.pending, (state) => {
        state.isLoading = true; // Set loading to true when the registration request starts
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false when registration completes
        state.isAuthenticated = true; // Set authenticated to true upon success
        state.user = null; // Clear user data (user might be required to log in after registration)
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false; // Stop loading on registration failure
        state.isAuthenticated = false; // Ensure not authenticated if registration fails
        state.user = null; // Clear any user data
      })

      // Handling login
      .addCase(login.pending, (state) => {
        state.isLoading = true; // Start loading when login request begins
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false; // Stop loading once login completes
        state.user = action.payload.success ? action.payload.user : null; // Set user if login succeeds, else null
        state.isAuthenticated = action.payload.success; // Set authentication status based on response
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false; // Stop loading on login failure
        state.isAuthenticated = false; // Set authenticated to false on login failure
        state.user = null; // Clear any user data
      })

      // Handling authentication check
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true; // Set loading to true when the checkAuth request starts
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false; // Stop loading after the auth check completes
        state.user = action.payload.success ? action.payload.user : null; // Set user if authenticated, else null
        state.isAuthenticated = action.payload.success; // Set authentication state based on response
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false; // Stop loading on failure
        state.user = null; // Clear user data if the authentication check fails
        state.isAuthenticated = false; // Set authentication to false
      })

      // Handling logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false; // Ensure loading is false after logout
        state.user = null; // Clear user data after successful logout
        state.isAuthenticated = false; // Set authentication to false
      });
  },
});

// Export actions to allow manual dispatches if needed
export const { setUser } = authslice.actions;

// Export the reducer to be used in the Redux store
export default authslice.reducer;
