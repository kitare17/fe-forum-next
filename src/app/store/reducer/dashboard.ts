import {UserInterface} from "@/app/interface/userinterface";
import {createSlice} from "@reduxjs/toolkit";
import {fetchUsers} from "@/app/store/action/user";
import {BlogInterface} from "@/app/interface/Blog";
import {CommentInterface} from "@/app/interface/Comment";
import {getAmountBlogMonth, getTotalReport, getTotalUser,showAllBlog} from "@/app/store/action/dashboard";

interface InitialState {
    totalUser:number,
    totalBlogMonth:number,
    totalReport:number,
    listBlog?: { posts: BlogInterface[], maxPage: number },
    isLoading:boolean,
    isError:boolean

}
var initialState:InitialState = {
    totalUser:0,
    totalBlogMonth:0,
    totalReport:0,
    isLoading: false,
    isError: false
}
const userSlice = createSlice({
    name: "dashboard",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {

        // GET TOTAL USER
        builder.addCase(getTotalUser.fulfilled, (state, action) => {

            // @ts-ignore
            state.totalUser=action.payload.totalUser;
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
        // GET TOTAL BLOG MONTH
        builder.addCase(getAmountBlogMonth.fulfilled, (state, action) => {

            // @ts-ignore
            state.totalBlogMonth=action.payload.totalBlogMonth;
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
            state.totalReport=action.payload.totalReport;
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
// GET POST MANAGE
builder.addCase(showAllBlog.fulfilled, (state, action) => {

    // @ts-ignore
    state.listBlog=action.payload;
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

    }
})

export default userSlice.reducer;

