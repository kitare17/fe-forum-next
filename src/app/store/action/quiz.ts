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
    async ({ regionType, deckOwner }: { regionType: string; deckOwner?: string }) => {
        try {
            const params: { regionType: string; deckOwner?: string } = { regionType };
            if (deckOwner) {
                params.deckOwner = deckOwner;
            }
            const response = await axios.get('http://localhost:3001/deck', { params });
            const data = response.data;
            return data;
        } catch (error) {
            console.error("Error: " + Types.DECK_SHOW_ALL, error);
            throw error;
        }
    }
);

export const deleteDeck = createAsyncThunk(
    Types.DECK_DELETE,
    async (deckId: string) => {
        try {
            await axios.delete(`http://localhost:3001/deck/${deckId}`);
            return deckId; // Return deckId to identify which deck was deleted
        } catch (error) {
            console.error("Error: " + Types.DECK_DELETE, error);
            throw error;
        }
    }
);

export const createDeck = createAsyncThunk(
  Types.DECK_CREATE,
  async (newDeck: DeckInterface) => {
    try {
      // Send POST request to create a new deck
      const response = await axios.post('http://localhost:3001/deck', {
        name: newDeck.name,
        regionType: newDeck.regionType,
        deckOwner: newDeck.deckOwner,
      });

      // Display success message
      toast.success('Tạo chủ đề thành công');

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
            const response = await axios.post('http://localhost:3001/quizzes', {
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
            const response = await axios.put(`http://localhost:3001/quizzes/${id}`, {
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
            const response = await axios.delete(`http://localhost:3001/quizzes/${questionId}`);
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
            const response = await axios.get(`http://localhost:3001/quizzes/${questionId}`);
            const data: QuestionResponse = response.data;
            console.log("Data", data)
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
            const response = await axios.get(`http://localhost:3001/quizzes`);
            const data: any = response.data;
            console.log('data from response' , data)
            return data;
        } catch (error) {
            console.error("Error: " + Types.QUIZ_SHOW_ALL, error);
            throw error;
        }
    }
);

