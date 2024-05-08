import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

import {BlogInterface} from "@/app/interface/Blog";
import {toast} from "react-toastify";
import {BLOG_FIND_ONE} from "../../constant/ActionType";

export const createBlog = createAsyncThunk(
    Types.BLOG_CREATE,
    async (newBlog:BlogInterface) => {
        try {
            const response = await axios.post('http://localhost:3001/posts',{
                "title": newBlog.title,
                "detail": newBlog.detail,
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
    async (blodId:string) => {
        try {
            const response = await axios.get(`http://localhost:3001/posts/${blodId}`);

            const data: BlogInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.BLOG_FIND_ONE);

        }
    }
);