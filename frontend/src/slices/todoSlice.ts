import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../constants";

interface oneTodo {
  todoText: string;
}
interface ToDo {
  todoName: string;
  todos: oneTodo[];
}

// Define an async thunk for the API call
export const postTodo = createAsyncThunk(
  "postTodo",
  async (data: ToDo, { rejectWithValue }) => {
    const { todoName, todos } = data;
    try {
      const token: any = localStorage.getItem("userInfo");
      const parsedData = JSON.parse(token);

      const config = {
        headers: {
          Authorization: `Bearer ${parsedData.access_token}`,
          "content-type": "application/json",
        },
      };

      const response = await axios.post(
        `${URL}/api/todo`,
        {
          todoName,
          todos,
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

// Define the initial state
const initialState = {
  data: {},
  status: "idle",
  error: {},
};

// Create the slice
const addTodoSlice = createSlice({
  name: "addTodoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
        console.log(action.payload);
        
      })
      .addCase(postTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "An unexpected error occurred";
      });
  },
});

export const addTodoReducer = addTodoSlice.reducer;
