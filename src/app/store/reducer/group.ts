import {findAllGroup} from "@/app/store/action/group";
import {createSlice} from "@reduxjs/toolkit";


var initialState = {
    listGroup: [],
    isLoading: false,
    isError: false,
    maxPage:1
}
const groupSlice = createSlice({
    name: "group",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
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

    }

})

export default groupSlice.reducer;

