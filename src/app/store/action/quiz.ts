import {QuestionResponse } from './../../interface/Quizz';
import { chatEnglish } from '@/app/store/action/chat';
import * as Types from "../../constant/ActionType"
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { DeckInterface, QuestionRequest, QuizInterface} from "@/app/interface/Quizz";
import { toast } from "react-toastify";

// Region Deck
export const getDecks = createAsyncThunk(
    Types.DECK_SHOW_ALL,
    async () => {
        try {
            const response = await axios.get(`http://localhost:5000/deck`);
            const data: any = response.data;
            return data;
        } catch (error) {
            console.error("Error: " + Types.DECK_SHOW_ALL, error);
            throw error;
        }
    }
);



export const createDeck = createAsyncThunk(
  Types.DECK_CREATE,
  async (newDeck: DeckInterface) => {
    try {
      // Send POST request to create a new deck
      const response = await axios.post('http://localhost:5000/deck', {
        name: newDeck.name,
        regionType: newDeck.regionType,
        deckOwner: newDeck.deckOwner,
      });

      // Display success message
      toast.success('Tạo bài viết thành công');

      // Return the created deck data
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error creating deck:', error);
      throw error; // Re-throw the error to let Redux Toolkit handle it
    }
  }
);
// end region deck 

// Region Quiz
export const createQuiz = createAsyncThunk(
    Types.QUIZ_CREATE,
    async (newQuiz: QuizInterface) => {
        try {
            console.log("newQuiz" , newQuiz)
            const response = await axios.post('http://localhost:5000/quizzes', {
                questions: newQuiz.questions,
                deckName: newQuiz.deckName,
                regionType: newQuiz.regionType,
                deckOwner: newQuiz.deckOwner,
                deckId: newQuiz.deckId
            });

            console.log("response",response);
            const data = response.data;
            toast.success("Quiz created successfully");
            return data;
        } catch (error) {
            console.error("Error creating quiz:", error);
            throw error;
        }
    }
);
export const editQuestion = createAsyncThunk(
  Types.QUESTION_EDIT,
    async ({ id, newQuestion }: { id: string, newQuestion: QuestionResponse }) => {
        try {
            console.log("newQuestion", newQuestion);
            const response = await axios.put(`http://localhost:5000/quizzes/${id}`, {
                deck: newQuestion.deck,
                answers: newQuestion.answers,
                name: newQuestion.name,
            });

            console.log("response", response);
            const data = response.data;
            toast.success("Update question successfully");
            return data;
        } catch (error) {
            console.error("Error question quiz:", error);
            throw error;
        }
    }
);

export const deleteQuestion = createAsyncThunk(
    Types.QUESTION_DELETE,
    async (questionId: String) => {
        try {
            const response = await axios.delete(`http://localhost:5000/quizzes/${questionId}`);
            const data: QuestionResponse = response.data;
            toast.success("Delete question successfully");
            return response;
        } catch (error) {
            console.error("Error Delete question :", error);
            throw error;
        }
    }
);

export const getQuestion = createAsyncThunk(
    Types.QUESTION_GET,
    async (questionId: string) => {
        try {
            console.log("In Connect DB ", questionId);
            const response = await axios.get(`http://localhost:5000/quizzes/${questionId}`);
            const data: QuestionResponse = response.data;
            return data;
        } catch (error) {
            console.error("Error: " + Types.QUESTION_GET, error);
            throw error;
        }
    }
);

export const showAllQuizzes = createAsyncThunk(
    Types.QUIZ_SHOW_ALL,
    async () => {
        try {
            const response = await axios.get(`http://localhost:5000/quizzes`);
            const data: any = response.data;
            console.log('data from response' , data)
            return data;
        } catch (error) {
            console.error("Error: " + Types.QUIZ_SHOW_ALL, error);
            throw error;
        }
    }
);

