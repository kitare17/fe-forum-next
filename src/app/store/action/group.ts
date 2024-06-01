import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {BlogInterface} from "@/app/interface/Blog";

import {GroupInterface} from "@/app/interface/GroupInterface";


export const findAllGroup = createAsyncThunk(
    Types.GROUP_SHOW_ALL,
    async ({page}:{page:number}) => {
        console.log("page dipatch",page)
        try {
            const response = await axios.get(`http://localhost:3001/groups?page=${page}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_SHOW_ALL);
        }
    }
);