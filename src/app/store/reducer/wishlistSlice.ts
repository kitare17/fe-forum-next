import { createSlice } from "@reduxjs/toolkit";
import { togglePostInWishlist, getWishlist } from "../action/wishlist";

export interface WishlistState {
  wishlistData: {
    _id: string;
    userId: string;
    postLiked: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  wishlistData: null,
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistData = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(togglePostInWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistData = action.payload; // Set the entire wishlist object to the state
      })
      .addCase(togglePostInWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(togglePostInWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default wishlistSlice.reducer;
