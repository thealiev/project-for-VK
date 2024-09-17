import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Cat } from "../types";
import axios from "axios";

const API_URL = "http://localhost:3002";

export const fetchCats = createAsyncThunk("cats/fetchCats", async () => {
  const response = await axios.get<Cat[]>(`${API_URL}/cats`);
  return response.data;
});

const catsSlice = createSlice({
  name: "cats",
  initialState: {
    cats: [] as Cat[],
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cats = action.payload;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default catsSlice.reducer;
