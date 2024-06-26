import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";


export const getAllSalePost = createAsyncThunk(
    Types.SAlE_SHOW_ALL,
    async ({page}:{page:number}) => {
        try {
            const response = await axios.get(`http://localhost:3001/saleposts?page=${page}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.SAlE_SHOW_ALL);

        }
    }
);