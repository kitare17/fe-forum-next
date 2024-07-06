import {createSlice} from "@reduxjs/toolkit";
import {BlogInterface} from "@/app/interface/Blog";
import {CommentInterface} from "@/app/interface/Comment";
import {
    findBlog,
    findUser,
    getAmountBlogMonth,
    getTotalReport,
    getTotalUser,
    showAllBlog,
    showAllUser,
    updateBlogStatus,
    updateUserStatus
} from "@/app/store/action/dashboard";
import { UserInterface } from "@/app/interface/User";

interface InitialState {
    user: UserInterface,
    totalUser: number,
    totalBlogMonth: number,
    totalReport: number,
    listBlog?: { posts: BlogInterface[] | [], maxPage: number },
    listUser?: { users: UserInterface[] | [], maxPage: number },
    isLoading: boolean,
    isError: boolean,
    isUpdate: boolean,

}

var initialState: InitialState = {
    user: {
        username: "",
        _id: ""
    },
    totalUser: 0,
    totalBlogMonth: 0,
    totalReport: 0,
    isLoading: false,
    isError: false,
    isUpdate: false,
    listBlog: {
        posts: [],
        maxPage: 1
    },
    listUser: {
        users: [],
        maxPage: 1
    }
}
const userSlice = createSlice({
    name: "dashboard",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {

        // GET TOTAL USER
        builder.addCase(getTotalUser.fulfilled, (state, action) => {

            // @ts-ignore
            state.totalUser = action.payload.totalUser;
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(getTotalUser.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(getTotalUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

             // GET ALL USER
        builder.addCase(showAllUser.fulfilled, (state, action) => {

            // @ts-ignore
            state.listUser = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(showAllUser.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(showAllUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

             // FIND USER 
        builder.addCase(findUser.fulfilled, (state, action) => {

            // @ts-ignore
            state.listUser = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(findUser.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(findUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

              // UPDATE STATUS
        builder.addCase(updateUserStatus.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isError = false;
        })
            .addCase(updateUserStatus.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(updateUserStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

        // GET TOTAL BLOG MONTH
        builder.addCase(getAmountBlogMonth.fulfilled, (state, action) => {

            // @ts-ignore
            state.totalBlogMonth = action.payload.totalBlogMonth;
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(getAmountBlogMonth.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(getAmountBlogMonth.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

        // GET TOTAL REPORT
        builder.addCase(getTotalReport.fulfilled, (state, action) => {

            // @ts-ignore
            state.totalReport = action.payload.totalReport;
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(getTotalReport.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(getTotalReport.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
        // GET BLOG MANAGE
        builder.addCase(showAllBlog.fulfilled, (state, action) => {

            // @ts-ignore
            state.listBlog = action.payload;
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
        // FIND BLOG MANAGE
        builder.addCase(findBlog.fulfilled, (state, action) => {

            // @ts-ignore
            state.listBlog = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(findBlog.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(findBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
        // UPDATE STATUS BLOG MANAGE
        builder.addCase(updateBlogStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isUpdate = false;
        })
            .addCase(updateBlogStatus.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.isUpdate = true;


            })
            .addCase(updateBlogStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isUpdate = false;
            })
    }
})

export default userSlice.reducer;

