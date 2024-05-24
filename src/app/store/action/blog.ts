import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

import {BlogInterface} from "@/app/interface/Blog";
import {toast} from "react-toastify";
import {BLOG_ADD_CMT, BLOG_FIND_ONE, BlOG_REPORT_COMMENT, BLOG_UNLIKE, TOPIC_FIND_ONE} from "../../constant/ActionType";
import {ReportBlogInterface} from "@/app/interface/ReportBlog";
import {ReportCommentInterface} from "@/app/interface/ReportCommentInterface";

export const createBlog = createAsyncThunk(
    Types.BLOG_CREATE,
    async (newBlog: BlogInterface) => {
        try {
            const response = await axios.post('http://localhost:3001/posts', {
                "title": newBlog.title,
                "detail": newBlog.detail,
                "topic": newBlog.topic,
                "creator": "65f6aa46e21e50bbf7cf0e1c"
            });
            toast.success("Tạo bài viết thành công");
            const data: BlogInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BLOG_CREATE);

        }
    }
);

export const findOneBlog = createAsyncThunk(
    Types.BLOG_FIND_ONE,
    async (blogId: string) => {
        try {
            const response = await axios.get(`http://localhost:3001/posts/${blogId}`);

            const data: BlogInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BLOG_FIND_ONE);

        }
    }
);


// @ts-ignore
export const addNewComment = createAsyncThunk(
    Types.BLOG_ADD_CMT,
    async ({blogId, detail}: { blogId: string, detail: string }) => {
        try {
            console.log({blogId, detail})
            const userComment = "65f6aa46e21e50bbf7cf0e1c"
            const response = await axios.put(`http://localhost:3001/posts/${blogId}/comments`, {
                commentPost: {
                    "detail": detail,
                    "userComment": userComment
                }
            });

            const data: BlogInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BLOG_ADD_CMT);

        }
    }
);

export const likeBlog = createAsyncThunk(
    Types.BLOG_LIKE,
    async ({blogId}: { blogId: string }) => {
        try {
            console.log({blogId})

            const userComment = "65f6aa46e21e50bbf7cf0e1c"
            const response = await axios.put(`http://localhost:3001/posts/${blogId}/likes`);

            const data: BlogInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BLOG_LIKE);

        }
    }
);
export const unlikeBlog = createAsyncThunk(
    Types.BLOG_UNLIKE,
    async ({blogId}: { blogId: string }) => {
        try {

            const userComment = "65f6aa46e21e50bbf7cf0e1c"
            const response = await axios.put(`http://localhost:3001/posts/${blogId}/unlikes`);

            const data: BlogInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BLOG_UNLIKE);

        }
    }
);

export const showAllBlog = createAsyncThunk(
    Types.BlOG_SHOW_ALL,
    async ({page}: { page: number }) => {
        try {
            const response = await axios.get(`http://localhost:3001/posts?page=${page}`);
            const data: any = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BlOG_SHOW_ALL);

        }
    }
);

export const showOneTopic = createAsyncThunk(
    Types.TOPIC_FIND_ONE,
    async ({page, slug}: { page: number, slug: string }) => {
        try {
            const response = await axios.get(`http://localhost:3001/topics/${slug}?page=${page}`);
            const data: any = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.TOPIC_FIND_ONE);

        }
    }
);

export const createReport = createAsyncThunk(
    Types.BlOG_REPORT,
    async (newReport: ReportBlogInterface) => {
        try {
            const response = await axios.post('http://localhost:3001/report-blog', {
                "title": newReport.title,
                "reason": newReport.reason,
                "userReport": newReport.userReport,
                "blogId": newReport.blogId
            });
            const data: ReportBlogInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BlOG_REPORT);

        }
    }
);


export const createReportComment = createAsyncThunk(
    Types.BlOG_REPORT_COMMENT,
    async (newReport: ReportCommentInterface) => {
        // alert(JSON.stringify({newReport}))
        alert(newReport.userReport)
        try {
            const response = await axios.post('http://localhost:3001/report-comment', {
                "title": newReport.title,
                "reason": newReport.reason,
                "userReport": newReport.userReport,
                "blogId": newReport.blogId,
                "commentId":newReport.commentId
            });
            const data: ReportCommentInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BlOG_REPORT_COMMENT);

        }
    }
);
