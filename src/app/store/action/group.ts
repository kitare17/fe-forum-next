import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {BlogInterface} from "@/app/interface/Blog";

import {GroupInterface} from "@/app/interface/GroupInterface";
import {GROUP_NOTIFICATION_SHOW_ALL} from "../../constant/ActionType";


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

export const findOneGroup = createAsyncThunk(
    Types.GROUP_SHOW_ONE,
    async ({slug}:{slug:number}) => {
        console.log(slug)
        try {
            const response = await axios.get(`http://localhost:3001/groups/${slug}`);
            const data:GroupInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_SHOW_ONE);
        }
    }
);


export const findAllNotification = createAsyncThunk(
    Types.GROUP_NOTIFICATION_SHOW_ALL,
    async ({page,groupId}:{page:number,groupId:string}) => {
        console.log("page dipatch",page)
        try {
            const response = await axios.get(`http://localhost:3001/groups/${groupId}/notifications?page=${page}`);

            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_NOTIFICATION_SHOW_ALL);
        }
    }
);