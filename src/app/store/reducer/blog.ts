import {createSlice} from "@reduxjs/toolkit";

import {
    addNewComment,
    createBlog,
    findOneBlog,
    likeBlog,
    showAllBlog,
    showOneTopic,
    unlikeBlog
} from "@/app/store/action/blog";
import {BlogInterface} from "@/app/interface/Blog";
import {CommentInterface} from "@/app/interface/Comment";

interface InitialState {
    newBlog: BlogInterface;
    isLoading: boolean;
    isError: boolean;
    blogDetail: BlogInterface;
    comments?: CommentInterface[] | undefined;
    listBlog: {posts:BlogInterface[],maxPage:number},
    isLike:boolean
}


var initialState: InitialState = {
    newBlog: {},
    isLoading: false,
    isError: false,
    blogDetail: {},
    listBlog:{
        posts:[],
        maxPage:1
    },
    isLike:false

}
const blogSlice = createSlice({
    name: "blog",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            //CREATE BLOG
            .addCase(createBlog.fulfilled, (state, action) => {
                // @ts-ignore
                state.newBlog = action.payload;
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
                // @ts-ignore
                state.blogDetail = action.payload;
                // @ts-ignore
                if([...(action.payload.likes??[])].includes("65f6aa46e21e50bbf7cf0e1c")){
                    state.isLike=true
                }

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
            //ADD COMMENT
            .addCase(addNewComment.fulfilled, (state, action) => {
                // @ts-ignore
                state.blogDetail = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(addNewComment.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(addNewComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            //LIKE BLOG
            .addCase(likeBlog.fulfilled, (state, action) => {
                // @ts-ignore
                state.blogDetail = action.payload;
                // @ts-ignore
                if([...(action.payload.likes??[])].includes("65f6aa46e21e50bbf7cf0e1c")){
                    state.isLike=true
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(likeBlog.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(likeBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            //UNLIKE BLOG
            .addCase(unlikeBlog.fulfilled, (state, action) => {
                // @ts-ignore
                state.blogDetail = action.payload;
                // @ts-ignore
                if(![...(action.payload.likes??[])].includes("65f6aa46e21e50bbf7cf0e1c")){
                    state.isLike=false
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(unlikeBlog.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(unlikeBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            //SHOW ALL BLOG
            .addCase(showAllBlog.fulfilled, (state, action) => {
                // @ts-ignore
                state.listBlog.posts = action.payload.posts;
                state.listBlog.maxPage=action.payload.maxPage;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(showAllBlog.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(showAllBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            //SHOW ONE TOPIC

            .addCase(showOneTopic.fulfilled, (state, action) => {
                // @ts-ignore
                state.listBlog.posts = action.payload.posts;
                state.listBlog.maxPage=action.payload.maxPage;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(showOneTopic.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(showOneTopic.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    }

})

export default blogSlice.reducer;

