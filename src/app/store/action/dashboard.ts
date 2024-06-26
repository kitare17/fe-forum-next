import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {UserInterface} from "@/app/interface/userinterface";
import {DASHBOARD_REPORT_COUNT} from "../../constant/ActionType";

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