import {createSlice} from "@reduxjs/toolkit";
import {findAllTopic} from "@/app/store/action/topic";
import {TopicInterface} from "@/app/interface/Topic";

interface InitialState {
    isLoading: boolean;
    isError: boolean;
    listTopic?:TopicInterface[] ;
}
var initialState :InitialState = {
    listTopic: [],
    isLoading: false,
    isError: false
}
const topicSlice = createSlice({
    name: "topic",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(findAllTopic.fulfilled, (state, action) => {
                // @ts-ignore
                state.listTopic=action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(findAllTopic.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(findAllTopic.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    }

})

export default topicSlice.reducer;