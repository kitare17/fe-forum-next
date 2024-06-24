import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {BlogInterface} from "@/app/interface/Blog";

import {GroupInterface} from "@/app/interface/GroupInterface";
import {
    GROUP_CREATE, GROUP_CREATE_DOC, GROUP_CREATE_TASK,
    GROUP_FIND_BY_NAME,
    GROUP_GET_ALL_MEMBER,
    GROUP_JOIN,
    GROUP_NOTIFICATION_SHOW_ALL,
    GROUP_REMOVE_MEMBER, GROUP_SHOW_TASK, GROUP_UPDATE_TASK
} from "../../constant/ActionType";
import {GroupNotificationInterface} from "@/app/interface/GroupNotificationInterface";
import {UserInterface} from "@/app/interface/User";
import {DocGroupInterface} from "@/app/interface/DocGroupInterface";
import {GroupTaskInterface} from "@/app/interface/GroupTaskInterface";


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

export const findAllGroupByName = createAsyncThunk(
    Types.GROUP_FIND_BY_NAME,
    async ({page, groupName}: { page: number, groupName: string }) => {
        try {
            const response = await axios.get(`http://localhost:3001/groups/query/find?groupName=${groupName}&page=${page}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_FIND_BY_NAME);
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
    async ({title, detail, group}: { title: string, detail: string, group: string | undefined }) => {
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
    async ({groupId, userId, password}: { groupId: string, userId: string, password: string }, {rejectWithValue}) => {

        try {
            const response = await axios.put(`http://localhost:3001/groups/${groupId}/members`,
                {
                    userId: userId,
                    password: password
                }
            );

            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_JOIN);
            // @ts-ignore
            const errorData = error as AxiosError;
            return rejectWithValue({data: errorData.response?.data});
        }
    }
);

export const createGroup = createAsyncThunk(
    Types.GROUP_CREATE,
    async ({groupName, password, adminGroup}: { groupName: string, password: string, adminGroup: string }) => {
        try {
            const response = await axios.post(`http://localhost:3001/groups`, {
                "groupName": groupName,
                "adminGroup": adminGroup,
                "password": password
            });

            const data: GroupInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_CREATE);
        }
    }
);


export const createDocGroup = createAsyncThunk(
    Types.GROUP_CREATE_DOC,
    async ({docName, link, group}: { docName: string, link: string, group: string }) => {
        try {
            const response = await axios.post(`http://localhost:3001/groups/docs/add`, {
                "docName": docName,
                "link": link,
                "group": group
            });

            const data: DocGroupInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_CREATE_DOC);
        }
    }
);


export const getDocGroup = createAsyncThunk(
    Types.GROUP_GET_DOC,
    async ({groupId}: { groupId: string }) => {
        try {
            const response = await axios.get(`http://localhost:3001/groups/${groupId}/docs/get`);

            const data: [DocGroupInterface] = response.data.docs;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_GET_DOC);
        }
    }
);


export const deleteDocGroup = createAsyncThunk(
    Types.GROUP_DELETE_DOC,
    async ({docId, groupId}: { groupId: string, docId: string }) => {
        try {
            const response = await axios.delete(`http://localhost:3001/groups/${groupId}/docs/${docId}`);

            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_DELETE_DOC);
        }
    }
);


export const createTaskGroup = createAsyncThunk(
    Types.GROUP_CREATE_TASK,
    async ({title, detail, startDay, endDay, level, assignee, groupId}: {
        title: string,
        detail: string,
        startDay: string,
        endDay: string,
        level: string,
        assignee: string[],
        groupId: string | undefined
    }) => {
        console.log(level)
        try {
            const response = await axios.post(`http://localhost:3001/groups/${groupId}/tasks`, {
                title,
                detail,
                startDate: startDay,
                endDate: endDay,
                label: level,
                assignee,
                group: groupId
            });

            console.log(response.data);
            const data: GroupTaskInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_CREATE_TASK);
        }
    }
);


export const getTaskGroup = createAsyncThunk(
    Types.GROUP_SHOW_TASK,
    async ({groupId}: { groupId: string | undefined }) => {
        try {
            const response = await axios.get(`http://localhost:3001/groups/${groupId}/tasks`,);
            console.log(response.data);
            const data: GroupTaskInterface[] = response.data?.tasks;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_SHOW_TASK);
        }
    }
);


export const updateTask = createAsyncThunk(
    Types.GROUP_UPDATE_TASK,
    async ({
               title,
               detail,
               startDay,
               endDay,
               level,
               assignee,
               groupId,
               status,
               taskId
           }: {
        title: string | undefined,
        detail: string | undefined,
        startDay: string | undefined,
        endDay: string | undefined,
        level: string | undefined,
        assignee: string[]|[],
        status: string | undefined,
        groupId: string | undefined,
        taskId: string | undefined

    }) => {

        try {
            const response = await axios.put(`http://localhost:3001/groups/${groupId}/tasks/${taskId}`, {
                title,
                detail,
                startDate: startDay,
                endDate: endDay,
                label: level,
                assignee,
                groupId,
                status
            });
            const data: GroupTaskInterface = response.data.task;
            return data;
        } catch (error) {
            console.log("Error: " + Types.GROUP_UPDATE_TASK);
        }
    }
);