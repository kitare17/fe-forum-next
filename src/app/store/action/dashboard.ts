import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";


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

export const getBlog7Day = createAsyncThunk(
    Types.DASHBOARD_BLOG_7_DATE,
    async () => {
        try {
            const response = await axios.get(`http://localhost:3001/dashboard/getAmount7Months`);
            const data: [] = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.DASHBOARD_BLOG_7_DATE);

        }
    }
);
export const getAllReport = createAsyncThunk(
    Types.DASHBOARD_GET_ALL_REPORT,
    async ({page}: { page: number }) => {
        try {
            const response = await axios.get(`http://localhost:3001/report-blog?page=${page}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.DASHBOARD_GET_ALL_REPORT);

        }
    }
);
export const getAllReportComment = createAsyncThunk(
    Types.DASHBOARD_GET_ALL_REPORT_COMMENT,
    async ({page}: { page: number }) => {
        try {
            const response = await axios.get(`http://localhost:3001/report-comment?page=${page}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.DASHBOARD_GET_ALL_REPORT_COMMENT);

        }
    }
);


export const acceptReportComment = createAsyncThunk(
    Types.DASHBOARD_ACCEPT_REPORT_COMMENT,
    async ({reportId}: { reportId: string | undefined }) => {
        try {
            const response = await axios.put(`http://localhost:3001/report-blog/${reportId}/blog/accept`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.DASHBOARD_ACCEPT_REPORT_COMMENT);

        }
    }
);

export const cancelReportComment = createAsyncThunk(
    Types.DASHBOARD_CANCEL_REPORT_COMMENT,
    async ({reportId}: { reportId: string | undefined }) => {
        try {
            const response = await axios.put(`http://localhost:3001/report-blog/${reportId}/blog/cancel`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.DASHBOARD_CANCEL_REPORT_COMMENT);

        }
    }
);

export const showReportFollowStatus = createAsyncThunk(
    Types.DASHBOARD_GET_ALL_REPORT_FOLLOW_STATUS,
    async ({statusReport, page}: { statusReport: string | undefined, page: string | undefined }) => {
        try {
            const response = await axios.get(`http://localhost:3001/report-blog/show/blog?statusReport=${statusReport}&page=${page}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.DASHBOARD_GET_ALL_REPORT_FOLLOW_STATUS);

        }
    }
);
