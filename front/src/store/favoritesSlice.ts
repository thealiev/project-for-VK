import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Favorite } from "../types";
import axios from "axios";

interface FavoritesState {
  favorites: Favorite[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  status: "idle",
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId: string) => {
    const response = await fetch(`http://localhost:3002/favorites/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch favorites.");
    }
    return response.json() as Promise<Favorite[]>;
  }
);



export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async ({ userId, catId }: { userId: string; catId: string }) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/favorites`,
        { userId, catId },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data as Favorite;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to add favorite."
      );
    }
  }
);



const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    removeFavorite: (state, action: PayloadAction<string>) => {
       state.favorites = state.favorites.filter(
         (favorite) => favorite.id !== action.payload
       );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "idle";
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch favorites.";
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      });
  },
});

export const { removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
