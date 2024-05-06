import {createSlice} from "@reduxjs/toolkit";
import {chatEnglish} from "@/app/store/action/chat";

var initialState = {
    listMessageResponse: [
        {
            id: 1,
            role: true,
            text: "Xin chào bạn tôi là chat bot AI dịch nghĩa từ vựng, bạn cần tôi giúp gì không?"
        }
    ],
    isLoading: false,
    isError: false
}
const chatEnglishSlice = createSlice({
    name: "chatEnglish",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(chatEnglish.fulfilled, (state, action) => {

                console.log(action.payload)
                // @ts-ignore
                state.listMessageResponse = [...state.listMessageResponse,...action.payload];
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(chatEnglish.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(chatEnglish.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    }

})

export default chatEnglishSlice.reducer;

