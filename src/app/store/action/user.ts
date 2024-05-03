import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {UserInterface} from "@/app/interface/userinterface";

export const fetchUsers = createAsyncThunk(
    Types.FETCH_FAKE_DATA,
    async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

            await new Promise(resolve => setTimeout(function () {
                console.log("Kích hoạt")
                resolve();
            }, 2000));
            const data: UserInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.FETCH_FAKE_DATA);
        }
    }
);