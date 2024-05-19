import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchRegister } from "@/app/store/action/auth";

var initialState = {
  user: {},
  isLoading: false,
  isError: false,
  message: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetInitialState: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(fetchRegister.fulfilled, (state, action) => {
        // @ts-ignore
        if (!(action.payload?.statusMessage === "Error")) {
          // @ts-ignore
          state.user = action.payload;
        } else {
          // @ts-ignore
          state.message = action.payload?.message;
        }
        state.isLoading = false;
        // @ts-ignore
        state.isError = (action.payload?.statusMessage === "Error");
      })
      .addCase(fetchRegister.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        // @ts-ignore
        console.log("400");
        state.isLoading = false;
        state.isError = true;
      })



      // LOGIN
      .addCase(fetchLogin.fulfilled, (state, action) => {
        console.log({ action });
        console.log("action.payload", action.payload)
        // @ts-ignore
        state.user = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchLogin.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export const { resetInitialState } = authSlice.actions;

export default authSlice.reducer;
