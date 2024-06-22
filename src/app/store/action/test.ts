import * as Types from "../../constant/ActionType"
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { TestResponse} from "@/app/interface/Quizz";
import { toast } from "react-toastify";

// Region Deck
export const getResultTest = createAsyncThunk(
    Types.TEST_LIST_RESULT,
    async (id: any) => {
        try {
          console.log("id", id);
            const response = await axios.get(`http://localhost:5000/test/${id.id}`);
            const data: TestResponse = response.data;
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
      toast.success('Tạo bài viết thành công');
      return response.data;
    } catch (error) {
      console.error('Error creating deck:', error);
      throw error; 
    }
  }
);
// end region deck 

