import {createSlice} from "@reduxjs/toolkit";

import {
    getResultTest, submitTest
} from "@/app/store/action/test";
import {TestInterfaceRequest, TestResponse} from "@/app/interface/Quizz";


interface InitialState {
    newTest: TestInterfaceRequest;
    resultTest: TestResponse[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
}


var initialState: InitialState = {
    newTest: {
        testOwner: "",
        deckId: "",
        score: 0,
        numberCorrectAnswer: 0,
        totalQuestionTest: 0,
        durationInMinutes: 0
    },
    resultTest: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
}



const testSlice = createSlice({
    name: "test",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getResultTest.fulfilled, (state, action) => {
                  // @ts-ignore
                state.resultTest = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getResultTest.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(getResultTest.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })
        
            // Create quiz
            .addCase(submitTest.fulfilled, (state, action) => {
                state.newTest = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(submitTest.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(submitTest.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })
            
    }

})

export default testSlice.reducer;

