import {createSlice} from "@reduxjs/toolkit";
import { fetchUserProfile } from "../action/user";
import { UserInterface } from "@/app/interface/User";
// import {fetchUsers} from "@/app/store/action/user";

interface InitialState {
    detailUser: UserInterface,
    listUser: { users: UserInterface[]; maxPage: number };
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    message: ""
}
var initialState: InitialState = {
    detailUser: {
        username:"",
        password:"",
        email:"",
        phone:"",
        admin:false,
        _id:"",
        fullname:""
    },
    listUser: {users: [],
    maxPage: 1},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        // .addCase(fetchUsers.fulfilled, (state, action) => {
        //         console.log("ok xong fulfilled");
        //         console.log({action})
        //         // @ts-ignore
        //         state.listUser=action.payload;
        //         state.isLoading = false;
        //         state.isError = false;
        //     })
        //     .addCase(fetchUsers.pending, (state, action) => {

        //         state.isLoading = true;
        //         state.isError = false
        //     })
        //     .addCase(fetchUsers.rejected, (state, action) => {
        //         state.isLoading = false;
        //         state.isError = true;
        //     })

         // DETAIL PROFILE
         .addCase(fetchUserProfile.fulfilled, (state, action) => {
             // @ts-ignore
            state.detailUser = action.payload.user;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess=true;
            // @ts-ignore
            state.message=action.payload?.message;
        })
        .addCase(fetchUserProfile.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
            // @ts-ignore
            state.message = action.payload?.data?.message;
            state.isLoading = false;
            state.isError = true;
        })
            
    }

})

export default userSlice.reducer;

