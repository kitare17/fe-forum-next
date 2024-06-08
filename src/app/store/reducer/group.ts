import {findAllGroup, findAllNotification, findOneGroup} from "@/app/store/action/group";
import {createSlice} from "@reduxjs/toolkit";
import {BlogInterface} from "@/app/interface/Blog";
import {CommentInterface} from "@/app/interface/Comment";
import {Group} from "next/dist/shared/lib/router/utils/route-regex";
import {GroupInterface} from "@/app/interface/GroupInterface";
import {GroupNotificationInterface} from "@/app/interface/GroupNotificationInterface";

interface InitialState {
    listGroup: [GroupInterface]|[],
    listNotification: [GroupNotificationInterface]|[],
    isLoading: boolean,
    isError: boolean,
    maxPage: number,
    maxPageNotification: number,
    groupDetail?: GroupInterface,
    isJoin:boolean
}



var initialState:InitialState = {
    listGroup: [],
    maxPageNotification:1,
    listNotification:[],
    isLoading: false,
    isError: false,
    isJoin: false,
    maxPage:1,
    groupDetail:undefined
}
const groupSlice = createSlice({
    name: "group",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {

        //FIND ALL GROUP
        builder.addCase(findAllGroup.fulfilled, (state, action) => {

            // @ts-ignore
            state.listGroup=action.payload.groups;
            state.maxPage=action.payload.maxPage
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(findAllGroup.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(findAllGroup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

        //FIND ONE GROUP
        builder.addCase(findOneGroup.fulfilled, (state, action) => {

            // @ts-ignore
            state.groupDetail=action.payload;
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(findOneGroup.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(findOneGroup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

        //FIND ALL GROUP NOTIFICATION
        builder.addCase(findAllNotification.fulfilled, (state, action) => {

            // @ts-ignore
            state.listNotification=action.payload.notifications
            state.maxPageNotification=action.payload.maxPage
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(findAllNotification.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(findAllNotification.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

    }

})

export default groupSlice.reducer;

