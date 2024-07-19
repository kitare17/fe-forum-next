import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action để toggle post in wishlist
export const togglePostInWishlist = createAsyncThunk(
  'wishlist/togglePostInWishlist',
  async ({ userId, salePostId }: { userId: string, salePostId: string }, { rejectWithValue }) => {
    try {
      await axios.put('http://localhost:3001/wishlists/', { userId, salePostId });
      // Sau khi toggle thành công, gọi lại getWishlist để lấy dữ liệu mới
      const response1 = await axios.get(`http://localhost:3001/wishlists/${userId}`);
      return response1.data;
    } catch (error: any) {
      // Nếu có lỗi, trả về message lỗi
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

// Action để lấy wishlist
export const getWishlist = createAsyncThunk(
  'wishlist/getWishlist',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/wishlists/${userId}`);
      return response.data; // Trả về toàn bộ dữ liệu, không chỉ postLiked
    } catch (error: any) {
      // Nếu có lỗi, trả về message lỗi
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);
