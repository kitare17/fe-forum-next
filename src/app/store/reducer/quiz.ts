import {createSlice} from "@reduxjs/toolkit";

import {
    getDecks, showAllQuizzes, createDeck, createQuiz
} from "@/app/store/action/quiz";
import {DeckInterface, FlashCardInterface, QuizInterface} from "@/app/interface/Quizz";


interface InitialState {
    newDeck: DeckInterface ;
     listDeck: DeckInterface[];
    isLoading: boolean;
    isError: boolean;
    listFlashCard: FlashCardInterface[];
    newQuiz: QuizInterface;
    isLike: boolean,
    isSuccess: boolean,
    message: string
}


var initialState: InitialState = {
    newDeck: {},
    listDeck: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    listFlashCard: [],
    newQuiz: {
        deckName: "",
        regionType: "",
        questions: [],
        deckOwner: ""
    },
    message: "",
    isLike: false

}
const quizSlice = createSlice({
    name: "quiz",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // Get decks
            .addCase(createDeck.fulfilled, (state, action) => {
                state.newDeck = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(createDeck.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(createDeck.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })
            .addCase(getDecks.fulfilled, (state, action) => {
                state.listDeck = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getDecks.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(getDecks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })
                 // Get flashCard list
            .addCase(showAllQuizzes.fulfilled, (state, action) => {
                state.listFlashCard = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(showAllQuizzes.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(showAllQuizzes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })
            // Create quiz
            .addCase(createQuiz.fulfilled, (state, action) => {
                state.newQuiz = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(createQuiz.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(createQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })
            
    }

})

export default quizSlice.reducer;

