import { chatEnglish } from '@/app/store/action/chat';
import * as Types from "../../constant/ActionType"
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { DeckInterface, QuizInterface} from "@/app/interface/Quizz";
import { toast } from "react-toastify";

// Region Deck
export const getDecks = createAsyncThunk(
    Types.DECK_SHOW_ALL,
    async () => {
        try {
            const response = await axios.get(`http://localhost:5000/deck`);
            const data: any = response.data;
            console.log('deck ne ', data)
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
            console.log("Creating quiz with questions:", newQuiz);
            const response = await axios.post('http://localhost:5000/deck', newQuiz);
            // const response = await axios.post('http://localhost:5000/quizzes', newQuiz);
            const data = response.data ;
            toast.success("Tạo bài kiểm tra thành công");
            return data ; // Assuming you want to return the created quiz data
        } catch (error) {
            console.error("Error: " + Types.QUIZ_CREATE, error);
            throw error;
        }
    }
);

export const findOneQuiz = createAsyncThunk(
    Types.QUIZ_FIND_ONE,
    async (quizId: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/quizzes/${quizId}`);
            const data: QuizInterface = response.data;
            return data;
        } catch (error) {
            console.error("Error: " + Types.QUIZ_FIND_ONE, error);
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
            return data;
        } catch (error) {
            console.error("Error: " + Types.QUIZ_SHOW_ALL, error);
            throw error;
        }
    }
);
// end Region Quiz

