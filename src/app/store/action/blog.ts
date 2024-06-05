import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

import {BlogInterface} from "@/app/interface/Blog";
import {toast} from "react-toastify";
import {ReportBlogInterface} from "@/app/interface/ReportBlog";
import {ReportCommentInterface} from "@/app/interface/ReportCommentInterface";
import {ReplyCommentInterface} from "@/app/interface/ReplyCommentInterface";
import {BlOG_COMMENT_REMOVE, BlOG_REMOVE} from "../../constant/ActionType";

export const createBlog = createAsyncThunk(
    Types.BLOG_CREATE,
    async ({newBlog, creator}: { newBlog: BlogInterface, creator: string }) => {
        try {
            const response = await axios.post('http://localhost:3001/posts', {
                "title": newBlog.title,
                "detail": newBlog.detail,
                "topic": newBlog.topic,
                "creator": creator
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
    async ({blogId, detail, userComment}: { blogId: string, detail: string, userComment: string }) => {
        try {
            console.log({blogId, detail})
            // const userComment = "65f6aa46e21e50bbf7cf0e1c"
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
    async ({blogId, userId}: { blogId: string, userId: string }) => {
        try {
            const response = await axios.put(`http://localhost:3001/posts/${blogId}/likes`, {
                userId: userId
            });

            const data: BlogInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BLOG_LIKE);

        }
    }
);
export const unlikeBlog = createAsyncThunk(
    Types.BLOG_UNLIKE,
    async ({blogId, userId}: { blogId: string, userId: string }) => {
        try {

            const userComment = "65f6aa46e21e50bbf7cf0e1c"
            const response = await axios.put(`http://localhost:3001/posts/${blogId}/unlikes`, {
                userId: userId
            });

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
        try {
            const response = await axios.post('http://localhost:3001/report-comment', {
                "title": newReport.title,
                "reason": newReport.reason,
                "userReport": newReport.userReport,
                "blogId": newReport.blogId,
                "commentId": newReport.commentId
            });
            const data: ReportCommentInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BlOG_REPORT_COMMENT);

        }
    }
);


export const createReplyComment = createAsyncThunk(
    Types.BlOG_REPLY_COMMENT,
    async ({
               detail,
               postId,
               userComment,
               commentId
           }:
               {
                   detail: string,
                   postId: string,
                   userComment: string,
                   commentId: string
               }) => {
        try {

            const response = await axios.post('http://localhost:3001/posts/replyComment', {
                "postId": postId,
                "commentId": commentId,
                "detail": detail,
                "userComment": userComment
            });
            console.log(response.data)
            const data: BlogInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BlOG_REPLY_COMMENT);

        }
    }
);


export const editBlog = createAsyncThunk(
    Types.BlOG_EDIT,
    async ({
               postId,
               detail,
               title
           }:
               {
                   detail: string,
                   postId: string,
                   title: string
               }) => {
        try {

            const response = await axios.put('http://localhost:3001/posts/editDetail', {
                "postId": postId,
                "detail": detail,
                "title": title
            });
            console.log(response.data)
            const data: BlogInterface = response.data.post;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BlOG_EDIT);

        }
    }
);

export const removeBlog = createAsyncThunk(
    Types.BlOG_REMOVE,
    async ({
               blogId
           }:
               {
                   blogId: string,
               }) => {
        try {
            alert(blogId);
            const response = await axios.delete(`http://localhost:3001/posts/${blogId}`);
            console.log(response.data)
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BlOG_REMOVE);

        }
    }
);


export const removeCommentBlog = createAsyncThunk(
    Types.BlOG_COMMENT_REMOVE,
    async ({
               blogId,
               commentId

           }:
               {
                   blogId: string,
                   commentId: string
               }) => {
        try {
            const response = await axios.delete(`http://localhost:3001/posts/${blogId}/comments/${commentId}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BlOG_COMMENT_REMOVE);

        }
    }
);
