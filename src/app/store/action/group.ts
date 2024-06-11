import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {BlogInterface} from "@/app/interface/Blog";

import {GroupInterface} from "@/app/interface/GroupInterface";
import {
    GROUP_GET_ALL_MEMBER,
    GROUP_JOIN,
    GROUP_NOTIFICATION_SHOW_ALL,
    GROUP_REMOVE_MEMBER
} from "../../constant/ActionType";
import {GroupNotificationInterface} from "@/app/interface/GroupNotificationInterface";
import {UserInterface} from "@/app/interface/User";


export const findAllGroup = createAsyncThunk(
    Types.GROUP_SHOW_ALL,
    async ({page}: { page: number }) => {
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
    async ({slug}: { slug: number }) => {

        try {
            const response = await axios.get(`http://localhost:3001/groups/${slug}`);
            const data: GroupInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_SHOW_ONE);
        }
    }
);


export const findAllNotification = createAsyncThunk(
    Types.GROUP_NOTIFICATION_SHOW_ALL,
    async ({page, groupId}: { page: number, groupId: string }) => {
        console.log("page dipatch", page)
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
    async ({title, detail, group}: { title: string, detail: string, group: string }) => {
        try {
            const response = await axios.post(`http://localhost:3001/groups/notification`, {
                "title": title,
                "detail": detail,
                "group": group
            });

            const data: GroupNotificationInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_CREATE_NOTIFICATION);
        }
    }
);

export const getAllMember = createAsyncThunk(
    Types.GROUP_GET_ALL_MEMBER,
    async ({groupId}: { groupId: string }) => {

        try {
            const response = await axios.get(`http://localhost:3001/groups/${groupId}/members`);

            const data: UserInterface[] = response.data.members;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_GET_ALL_MEMBER);
        }
    }
);

export const removeMember = createAsyncThunk(
    Types.GROUP_REMOVE_MEMBER,
    async ({groupId, userId}: { groupId: string, userId: string }) => {

        try {
            const response = await axios.delete(`http://localhost:3001/groups/${groupId}/members`, {
                data: {
                    userId: userId
                }
            });

            const data = response.data;
            console.log("action ne", response.data)
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_REMOVE_MEMBER);
        }
    }
);

export const joinGroup = createAsyncThunk(
    Types.GROUP_JOIN,
    async ({groupId, userId}: { groupId: string, userId: string }) => {

        try {
            const response = await axios.put(`http://localhost:3001/groups/${groupId}/members`,
                {
                    userId: userId
                }
            );

            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_JOIN);
        }
    }
);