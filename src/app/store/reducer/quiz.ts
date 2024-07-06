import {createSlice} from "@reduxjs/toolkit";

import {
    getDecks, showAllQuizzes, createDeck, createQuiz, editQuestion, deleteQuestion,
    getQuestion
} from "@/app/store/action/quiz";
import {DeckInterface, FlashCardInterface, QuestionRequest, QuestionResponse, QuizInterface} from "@/app/interface/Quizz";


interface InitialState {
    newDeck: DeckInterface ;
     listDeck: DeckInterface[];
    isLoading: boolean;
    isError: boolean;
    listFlashCard: QuestionResponse[];
    newQuiz: QuizInterface;
    newQuestion: QuestionRequest;
    question: QuestionResponse;
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
    newQuestion: {
        deck: "",
        answers: [],
        name: ""
    },
    question: {
        _id: "",
        name: "",
        answers: [],
        deck: "",
        createdAt: "",
        updatedAt: "",
        __v: 0
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

            // EDIT Question 
            .addCase(editQuestion.fulfilled, (state, action) => {
                state.newQuestion = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(editQuestion.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(editQuestion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })
            //DELETE Question 
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.question = action.payload.data;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(deleteQuestion.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })

           // GET QUESTION BY ID 
              .addCase(getQuestion.fulfilled, (state, action) => {
                state.question = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getQuestion.pending, (state, action) => {
                state.isSuccess = false
                state.isLoading = true;
                state.isError = false
            })
            .addCase(getQuestion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false
            })

    }

})

export default quizSlice.reducer;

