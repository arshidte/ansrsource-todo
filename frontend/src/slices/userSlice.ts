import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../constants";

interface User {
  email: string;
  password: string;
}
interface registerUser {
  userName: string;
  email: string;
  password: string;
}

// Fetching userInfo from local storage if already logged in
const storedUserInfo = localStorage.getItem("userInfo");
const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};

// Define the initial state
const initialState = {
  data: parsedUserInfo,
  status: "idle",
  error: {},
};

// Define an async thunk for the login API call
export const loginUser = createAsyncThunk(
  "loginUser",
  async (data: User, { rejectWithValue }) => {
    const { email, password } = data;
    try {
      const config = {
        headers: { "content-type": "application/json" },
      };
      const response = await axios.post(
        `${URL}/api/users/login`,
        {
          email,
          password,
        },
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : "An unexpected error occurred"
      );
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout(state) {
      state.status = "success";
      state.data = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;

        // Save the userData into local storage
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "An unexpected error occurred";
      });
  },
});

//////////////////////////////////////////////////////////////////////////

// Define an async thunk for the register API call
export const registerUser = createAsyncThunk(
  "registerUser",
  async (data: registerUser, { rejectWithValue }) => {
    const { userName, email, password } = data;

    try {
      const config = {
        headers: { "content-type": "application/json" },
      };
      const response = await axios.post(
        `${URL}/api/users`,
        {
          email,
          password,
          userName,
        },
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : "An unexpected error occurred"
      );
    }
  }
);

// Create the slice
const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;

        // Save the userData into local storage
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "An unexpected error occurred";
      });
  },
});

export const registerUserReducer = registerSlice.reducer;
export const fetchUserReducer = authSlice.reducer;
export const { logout } = authSlice.actions;