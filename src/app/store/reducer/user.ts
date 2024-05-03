import {UserInterface} from "@/app/interface/userinterface";
import {createSlice} from "@reduxjs/toolkit";
import {fetchUsers} from "@/app/store/action/user";


var initialState = {
    listUser: [],
    isLoading: false,
    isError: false
}
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                console.log("ok xong fulfilled");
                console.log({action})
                // @ts-ignore
                state.listUser=action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchUsers.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    }

})

export default userSlice.reducer;

