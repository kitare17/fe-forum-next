import {createSlice} from "@reduxjs/toolkit";

import {
    addNewComment,
    createBlog, createReplyComment, createReport, createReportComment, editBlog,
    findOneBlog, getOneBlogCheck,
    likeBlog, removeBlog, removeCommentBlog,
    showAllBlog,
    showOneTopic,
    unlikeBlog
} from "@/app/store/action/blog";
import {BlogInterface} from "@/app/interface/Blog";
import {CommentInterface} from "@/app/interface/Comment";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";


interface InitialState {
    newBlog: BlogInterface;
    isLoading: boolean;
    isError: boolean;
    blogDetail: BlogInterface;
    comments?: CommentInterface[] | undefined;
    listBlog: { posts: BlogInterface[], maxPage: number },
    isLike: boolean,
    isSuccess: boolean,
    isLoadAddComment:boolean,
    message: string
}


var initialState: InitialState = {
    newBlog: {
        detail:"",
        title:""
    },
    isLoading: false,
    isError: false,
    isSuccess: false,
    isLoadAddComment: false,

    blogDetail: {
        detail:"",
        title:""
    },
    listBlog: {
        posts: [],
        maxPage: 1
    },
    message: "",
    isLike: false

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
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })

            //FIND ONE BLOG
            .addCase(findOneBlog.fulfilled, (state, action) => {

                var userId = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes') ?? "{}")?.userEmailId : {};
                // @ts-ignore
                state.blogDetail = action.payload;
                // @ts-ignore
                if ([...(action.payload.likes ?? [])].includes(userId)) {
                    state.isLike = true
                }
                // alert(typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes')??"{}")?.userEmailId : {})
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(findOneBlog.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(findOneBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })
            //ADD COMMENT
            .addCase(addNewComment.fulfilled, (state, action) => {
                // @ts-ignore
                state.blogDetail = action.payload;
                state.isLoadAddComment=false;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(addNewComment.pending, (state, action) => {
                state.isSuccess = false;
                state.isLoadAddComment=true;
                state.isLoading = true;
                state.isError = false
            })
            .addCase(addNewComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })
            //LIKE BLOG
            .addCase(likeBlog.fulfilled, (state, action) => {
                var userId = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes') ?? "{}")?.userEmailId : {};
                // @ts-ignore
                state.blogDetail = action.payload;
                // @ts-ignore
                if ([...(action.payload.likes ?? [])].includes(userId)) {
                    state.isLike = true
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(likeBlog.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(likeBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })
            //UNLIKE BLOG
            .addCase(unlikeBlog.fulfilled, (state, action) => {
                var userId = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes') ?? "{}")?.userEmailId : {};
                // @ts-ignore
                state.blogDetail = action.payload;
                // @ts-ignore
                if (![...(action.payload.likes ?? [])].includes(userId)) {
                    state.isLike = false
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(unlikeBlog.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(unlikeBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false

            })
            //SHOW ALL BLOG
            .addCase(showAllBlog.fulfilled, (state, action) => {
                // @ts-ignore
                state.listBlog.posts = action.payload.posts;
                state.listBlog.maxPage = action.payload.maxPage;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(showAllBlog.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(showAllBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false

            })
            //SHOW ONE TOPIC
            .addCase(showOneTopic.fulfilled, (state, action) => {
                // @ts-ignore
                state.listBlog.posts = action.payload.posts;
                state.listBlog.maxPage = action.payload.maxPage;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(showOneTopic.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(showOneTopic.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false

            })


            //REPORT BLOG
            .addCase(createReport.fulfilled, (state, action) => {
                state.message = "️🎉️🎉️🎉Cảm ơn bạn đã đóng góp️🎉️🎉️🎉️"
                state.isSuccess = true
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(createReport.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(createReport.rejected, (state, action) => {
                state.message = "Vui lòng thử lại sau"
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })


            //REPORT COMMENT
            .addCase(createReportComment.fulfilled, (state, action) => {
                state.message = "️🎉️🎉️🎉Cảm ơn bạn đã đóng góp️🎉️🎉️🎉️"
                state.isSuccess = true
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(createReportComment.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(createReportComment.rejected, (state, action) => {
                state.message = "Vui lòng thử lại sau"
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })


            //REPLY COMMENT
            .addCase(createReplyComment.fulfilled, (state, action) => {
                // @ts-ignore
                state.blogDetail = action.payload;
                // alert(typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes')??"{}")?.userEmailId : {})
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(createReplyComment.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(createReplyComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })

        //EDIT COMMENT
            .addCase(editBlog.fulfilled, (state, action) => {
                // @ts-ignore
                state.blogDetail = action.payload;
                // alert(typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes')??"{}")?.userEmailId : {})
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(editBlog.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(editBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })


            //REMOVE BLOG
            .addCase(removeBlog.fulfilled, (state, action) => {
                // @ts-ignore
                state.message=action.payload.message
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(removeBlog.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(removeBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })


            //REMOVE COMMENT BLOG
            .addCase(removeCommentBlog.fulfilled, (state, action) => {
                // @ts-ignore
                state.blogDetail=action.payload
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(removeCommentBlog.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(removeCommentBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })

            //FIND ONE BLOG CHECK
            .addCase(getOneBlogCheck.fulfilled, (state, action) => {

                var userId = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes') ?? "{}")?.userEmailId : {};
                // @ts-ignore
                state.blogDetail = action.payload;
                // @ts-ignore
                if ([...(action.payload.likes ?? [])].includes(userId)) {
                    state.isLike = true
                }
                // alert(typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes')??"{}")?.userEmailId : {})
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getOneBlogCheck.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(getOneBlogCheck.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // @ts-ignore
                toast.error(action.payload?.data?.message);

            })
    }

})

export default blogSlice.reducer;

