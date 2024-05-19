import {createSlice} from "@reduxjs/toolkit";
import {fetchLogin, fetchLogout, fetchRegister} from "@/app/store/action/auth";

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
            state.user= {};
        },
    },
    extraReducers: (builder) => {
        builder
            // REGISTER
            .addCase(fetchRegister.fulfilled, (state, action) => {

                // @ts-ignore
                state.user = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchRegister.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                // @ts-ignore
                state.message = action.payload?.data?.message;
                state.isLoading = false;
                state.isError = true;
            })

            // LOGIN
            .addCase(fetchLogin.fulfilled, (state, action) => {

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
                // @ts-ignore
                state.message = action.payload?.data?.message;
                state.isLoading = false;
                state.isError = true;
            })

    },
});
export const {resetInitialState} = authSlice.actions;

export default authSlice.reducer;
