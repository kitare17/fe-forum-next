import * as Types from "../../constant/ActionType"
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { QuizInterface } from "@/app/interface/Quizz";
import { toast } from "react-toastify";

export const createQuiz = createAsyncThunk(
    Types.QUIZ_CREATE,
    async ({ newQuiz }: { newQuiz: QuizInterface }) => {
        try {
            const response = await axios.post('http://localhost:3000/quizzes', {
                questions: newQuiz.questions,
                deckId: newQuiz.deckId,
                deckName: newQuiz.deckName,
                regionType: newQuiz.regionType,
                deckOwner: newQuiz.deckOwner
            });
            toast.success("Tạo bài kiểm tra thành công");
            const data: QuizInterface = response.data;
            return data;
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
    async ({ page }: { page: number }) => {
        try {
            const response = await axios.get(`http://localhost:3000/quizzes?page=${page}`);
            const data: any = response.data;
            return data;
        } catch (error) {
            console.error("Error: " + Types.QUIZ_SHOW_ALL, error);
            throw error;
        }
    }
);