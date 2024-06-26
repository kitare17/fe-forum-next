import { SaleInterface } from "@/app/interface/SaleInterface";
import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import { CategoryInterface } from "@/app/interface/CategoryInterface";


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


export const getOneSalePost = createAsyncThunk(
    Types.SAlE_SHOW_ONE,
    async (saleId:string) => {
        try {
            const response = await axios.get(`http://localhost:3001/saleposts/${saleId}`);
            const data:SaleInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.SAlE_SHOW_ONE);

        }
    }
);



export const getAllCategory = createAsyncThunk(
    Types.CATEGORY_SHOW_ALL,
    async () => {
        try {
            const response = await axios.get(`http://localhost:3001/categories`);
            const data:CategoryInterface[] = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.CATEGORY_SHOW_ALL);

        }
    }
);