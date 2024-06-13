import {
    createDocGroup,
    createGroup,
    createNotification,
    findAllGroup, findAllGroupByName,
    findAllNotification,
    findOneGroup,
    getAllMember, getDocGroup, joinGroup, removeMember
} from "@/app/store/action/group";
import {createSlice} from "@reduxjs/toolkit";
import {BlogInterface} from "@/app/interface/Blog";
import {CommentInterface} from "@/app/interface/Comment";
import {Group} from "next/dist/shared/lib/router/utils/route-regex";
import {GroupInterface} from "@/app/interface/GroupInterface";
import {GroupNotificationInterface} from "@/app/interface/GroupNotificationInterface";
import {UserInterface} from "@/app/interface/User";
import {DocGroupInterface} from "@/app/interface/DocGroupInterface";

interface InitialState {
    listGroup: [GroupInterface] | [],
    listNotification: [GroupNotificationInterface] | [],
    isLoading: boolean,
    isError: boolean,
    maxPage: number,
    maxPageNotification: number,
    groupDetail?: GroupInterface,
    isJoin: boolean,
    members?: [UserInterface],
    message?: string,
    listDoc?: [DocGroupInterface]| []
}


var initialState: InitialState = {
    listGroup: [],
    listDoc:[],
    maxPageNotification: 1,
    listNotification: [],
    isLoading: false,
    isError: false,
    isJoin: false,
    maxPage: 1
}
const groupSlice = createSlice({
    name: "group",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {

        //FIND ALL GROUP
        builder.addCase(findAllGroup.fulfilled, (state, action) => {

            // @ts-ignore
            state.listGroup = action.payload.groups;
            state.maxPage = action.payload.maxPage
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
            const user = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes') ?? "{}") : {}
            if (action.payload?.members.includes(user.userEmailId) || action.payload?.adminGroup._id === user.userEmailId) {
                // console.log("member",action.payload?.members)
                // console.log("user id ",user.userEmailId)
                // console.log("Check nhom truong",action.payload?.adminGroup._id===user.userEmailId)
                // console.log("Check thanh vien",action.payload?.members.includes(user.userEmailId))
                // console.log("thanh vien do")
                state.isJoin = true
            }

            // @ts-ignore
            state.groupDetail = action.payload;
            state.isLoading = false;
            state.isError = false;

        })
            .addCase(findOneGroup.pending, (state, action) => {
                state.isJoin = false;
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
            state.listNotification = action.payload.notifications
            state.maxPageNotification = action.payload.maxPage
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
        //CREATE GROUP NOTIFICATION
        builder.addCase(createNotification.fulfilled, (state, action) => {

            // @ts-ignore
            state.listNotification = [action.payload, ...state.listNotification]
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(createNotification.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(createNotification.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })


        //GET ALL MEMBER
        builder.addCase(getAllMember.fulfilled, (state, action) => {

            // @ts-ignore
            state.members = action.payload
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(getAllMember.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(getAllMember.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

        //REMOVE MEMBER
        builder.addCase(removeMember.fulfilled, (state, action) => {


            if (action.payload.members.length > 0)
                // @ts-ignore
                state.members = [...state.members.filter((member) => action.payload.members.includes(member._id) > 0)]
            else {
                // @ts-ignore
                state.members = [];
            }
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(removeMember.pending, (state, action) => {


                state.isLoading = true;
                state.isError = false
            })
            .addCase(removeMember.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

        //JOIN GROUP

        builder.addCase(joinGroup.fulfilled, (state, action) => {
            const user = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes') ?? "{}") : {}

            if (action.payload.members.includes(user.userEmailId)) {
                state.isJoin = true;
            }

            state.isLoading = false;
            state.isError = false;
        })
            .addCase(joinGroup.pending, (state, action) => {
                state.message = ""
                state.isJoin = false;
                state.isLoading = true;
                state.isError = false
            })
            .addCase(joinGroup.rejected, (state, action) => {

                // @ts-ignore
                state.message = action.payload?.data?.message
                state.isLoading = false;
                state.isError = true;
            })

        //FIND GROUP

        builder.addCase(findAllGroupByName.fulfilled, (state, action) => {

            state.listGroup = action.payload.groups;
            state.maxPage = action.payload.maxPage > 0 ? action.payload.maxPage : 1;
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(findAllGroupByName.pending, (state, action) => {
                state.message = ""
                state.isJoin = false;
                state.isLoading = true;
                state.isError = false
            })
            .addCase(findAllGroupByName.rejected, (state, action) => {

                // @ts-ignore
                state.message = action.payload?.data?.message
                state.isLoading = false;
                state.isError = true;
            })

        //Create group
        builder.addCase(createGroup.fulfilled, (state, action) => {
            //@ts-ignore
            state.listGroup = [action.payload, ...state.listGroup]
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(createGroup.pending, (state, action) => {
                state.message = ""
                state.isJoin = false;
                state.isLoading = true;
                state.isError = false
            })
            .addCase(createGroup.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })

        //Create doc group
        builder.addCase(createDocGroup.fulfilled, (state, action) => {
            //@ts-ignore
            state.listDoc = [action.payload, ...state.listDoc]
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(createDocGroup.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(createDocGroup.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
        //Get  doc group
        builder.addCase(getDocGroup.fulfilled, (state, action) => {
            //@ts-ignore
            state.listDoc = action.payload
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(getDocGroup.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(getDocGroup.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
            })
    }
})

export default groupSlice.reducer;

