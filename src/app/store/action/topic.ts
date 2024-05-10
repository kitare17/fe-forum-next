import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

import {BlogInterface} from "@/app/interface/Blog";
import {TopicInterface} from "@/app/interface/Topic";


export const findAllTopic = createAsyncThunk(
    Types.TOPIC_FIND_ALL,
    async (newBlog:BlogInterface) => {
        try {
            const response = await axios.get('http://localhost:3001/topics');
            const data: TopicInterface[] = response.data.topics;
            return data;
        } catch (error) {
            console.log("Error: " + Types.TOPIC_FIND_ALL);
        }
    }
);