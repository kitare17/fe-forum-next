import {createSlice} from "@reduxjs/toolkit";

import {createBlog} from "@/app/store/action/blog";


var initialState = {
    newBlog: {},
    isLoading: false,
    isError: false
}
const blogSlice = createSlice({
    name: "blog",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createBlog.fulfilled, (state, action) => {
                console.log({action})
                // @ts-ignore
                state.newBlog=action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(createBlog.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    }

})

export default blogSlice.reducer;

