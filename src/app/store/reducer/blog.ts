import {createSlice} from "@reduxjs/toolkit";

import {createBlog, findOneBlog} from "@/app/store/action/blog";
import {BlogInterface} from "@/app/interface/Blog";

interface InitialState {
    newBlog: BlogInterface;
    isLoading: boolean;
    isError: boolean;
    blogDetail: BlogInterface;
}



var initialState:InitialState = {
    newBlog: {},
    isLoading: false,
    isError: false,
    blogDetail:{}
}
const blogSlice = createSlice({
    name: "blog",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            //CREATE BLOG
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

            //FIND ONE BLOG
            .addCase(findOneBlog.fulfilled, (state, action) => {
                console.log({action})
                // @ts-ignore
                state.blogDetail=action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(findOneBlog.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(findOneBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    }

})

export default blogSlice.reducer;

