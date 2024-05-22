import {createSlice} from "@reduxjs/toolkit";

import {
    addNewComment,
    createBlog, createReport,
    findOneBlog,
    likeBlog,
    showAllBlog,
    showOneTopic,
    unlikeBlog
} from "@/app/store/action/blog";
import {BlogInterface} from "@/app/interface/Blog";
import {CommentInterface} from "@/app/interface/Comment";
import {toast} from "react-toastify";

interface InitialState {
    newBlog: BlogInterface;
    isLoading: boolean;
    isError: boolean;
    blogDetail: BlogInterface;
    comments?: CommentInterface[] | undefined;
    listBlog: {posts:BlogInterface[],maxPage:number},
    isLike:boolean,
    isSuccess:boolean,
    message:string
}


var initialState: InitialState = {
    newBlog: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    blogDetail: {},
    listBlog:{
        posts:[],
        maxPage:1
    },
    message:"",
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
                state.isSuccess=false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess=false
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
                state.isSuccess=false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(findOneBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess=false
            })
            //ADD COMMENT
            .addCase(addNewComment.fulfilled, (state, action) => {
                // @ts-ignore
                state.blogDetail = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(addNewComment.pending, (state, action) => {
                state.isSuccess=false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(addNewComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess=false
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
                state.isSuccess=false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(likeBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess=false
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
                state.isSuccess=false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(unlikeBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess=false

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
                state.isSuccess=false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(showAllBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess=false

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
                state.isSuccess=false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(showOneTopic.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess=false

            })


            //REPORT BLOG
            .addCase(createReport.fulfilled, (state, action) => {
                state.message="️🎉️🎉️🎉Cảm ơn bạn đã đóng góp️🎉️🎉️🎉️"
                state.isSuccess=true
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(createReport.pending, (state, action) => {
                state.isSuccess=false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(createReport.rejected, (state, action) => {
                state.message="Vui lòng thử lại sau"
                state.isLoading = false;
                state.isError = true;
                state.isSuccess=false
            })
    }

})

export default blogSlice.reducer;

