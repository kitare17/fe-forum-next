import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {BlogInterface} from "@/app/interface/Blog";

import {GroupInterface} from "@/app/interface/GroupInterface";
import {GROUP_GET_ALL_MEMBER, GROUP_NOTIFICATION_SHOW_ALL} from "../../constant/ActionType";
import {GroupNotificationInterface} from "@/app/interface/GroupNotificationInterface";
import {UserInterface} from "@/app/interface/User";


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


export const createNotification = createAsyncThunk(
    Types.GROUP_CREATE_NOTIFICATION,
    async ({title,detail,group}:{title:string,detail:string,group:string}) => {
        console.log("create ne")
        try {
            const response = await axios.post(`http://localhost:3001/groups/notification`,{
                "title":title,
                "detail":detail,
                "group":group
            });

            const data:GroupNotificationInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_CREATE_NOTIFICATION);
        }
    }
);

export const getAllMember = createAsyncThunk(
    Types.GROUP_GET_ALL_MEMBER,
    async ({groupId}:{groupId:string}) => {
        console.log("lay member ne"+ groupId)
        try {
            const response = await axios.get(`http://localhost:3001/groups/${groupId}/members`);

            const data:UserInterface[] = response.data.members;
            console.log("member",response.data.members)
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_GET_ALL_MEMBER);
        }
    }
);