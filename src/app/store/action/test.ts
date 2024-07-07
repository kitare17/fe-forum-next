import * as Types from "../../constant/ActionType"
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { TestResponse, TestInterfaceRequest} from "@/app/interface/Quizz";
import { toast } from "react-toastify";

// Region Deck
export const getResultTest = createAsyncThunk(
    Types.TEST_LIST_RESULT,
    async ( {id} : {id: string}) => {
        try {
            const response = await axios.get(`http://localhost:5000/test/${id}`);
            const data: TestResponse = response.data;
            // Ensure the data is returned as an array
            return data;
        } catch (error) {
            console.error("Error: " + Types.TEST_LIST_RESULT, error);
            throw error;
        }
    }
);

export const submitTest = createAsyncThunk(
  Types.TEST_CREATE,
  async (newTest: TestInterfaceRequest) => {
    try {
      const response = await axios.post('http://localhost:5000/test', newTest);
      toast.success('Nộp bài thành công');
      return response.data;
    } catch (error) {
      console.error('Error creating deck:', error);
      throw error; 
    }
  }
);

