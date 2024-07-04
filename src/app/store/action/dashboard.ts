import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {UserInterface} from "@/app/interface/userinterface";
import {
    DASHBOARD_BLOG_FIND,
    DASHBOARD_BLOG_SHOW,
    DASHBOARD_BLOG_UPDATE_STATUS,
    DASHBOARD_REPORT_COUNT
} from "../../constant/ActionType";

export const getTotalUser = createAsyncThunk(
    Types.DASHBOARD_USER_COUNT,
    async () => {
        try {
            const response = await axios.get('http://localhost:3001/dashboard/totalUser');
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.DASHBOARD_USER_COUNT);

        }
    }
);
export const getAmountBlogMonth = createAsyncThunk(
    Types.DASHBOARD_BLOG_MONTH_COUNT,
    async () => {
        try {
            const response = await axios.get('http://localhost:3001/dashboard/blogMonth');
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.DASHBOARD_BLOG_MONTH_COUNT);

        }
    }
);
export const getTotalReport = createAsyncThunk(
    Types.DASHBOARD_REPORT_COUNT,
    async () => {
        try {
            const response = await axios.get('http://localhost:3001/dashboard/report');
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.DASHBOARD_REPORT_COUNT);

        }
    }
);

export const showAllBlog = createAsyncThunk(
    Types.DASHBOARD_BLOG_SHOW,
    async ({page}: { page: number }) => {
        try {
            const response = await axios.get(`http://localhost:3001/dashboard/getAll/blog?page=${page}`);
            const data: any = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.DASHBOARD_BLOG_SHOW);

        }
    }
);
export const findBlog = createAsyncThunk(
    Types.DASHBOARD_BLOG_FIND,
    async ({page, searchBlogTitle}: { page: number, searchBlogTitle: string }) => {
        try {
            const response = await axios.get(`http://localhost:3001/dashboard/find/blog?page=${page}&searchBlogTitle=${searchBlogTitle}`);
            const data: any = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.DASHBOARD_BLOG_FIND);

        }
    }
);
export const updateBlogStatus = createAsyncThunk(
    Types.DASHBOARD_BLOG_UPDATE_STATUS,
    async ({status, postId}: { status: string, postId: string }) => {
        try {
            const response = await axios.put(`http://localhost:3001/dashboard/edit/blog/${postId}`, {
                status: status
            });
            const data: any = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.DASHBOARD_BLOG_UPDATE_STATUS);

        }
    }
);