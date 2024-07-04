import { UserInterface } from "@/app/interface/User";
import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

// export const fetchUsers = createAsyncThunk(
//     Types.FETCH_FAKE_DATA,
//     async () => {
//         try {
//             const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

//             await new Promise(resolve => setTimeout(function () {
//                 console.log("Kích hoạt")
//                 // @ts-ignore
//                 resolve();
//             }, 2000));
//             const data: UserInterface = response.data;
//             return data;
//         } catch (error) {
//             console.log("Error: " + Types.FETCH_FAKE_DATA);

//         }
//     }
// );

export const fetchUserProfile = createAsyncThunk(
    Types.DETAIL_PROFILE,
    async (idUser: String, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                `http://localhost:3001/users/detail-user/${idUser}`);
                const data: UserInterface = response.data;
            return data;

        } catch (error) {
            // @ts-ignore
            const errorData = error as AxiosError;
            return rejectWithValue({data: errorData.response?.data});
        }
    }
);

export const updateProfile = createAsyncThunk(
    Types.UPDATE_PROFILE,
    async ({idUser, inforUpdate} : {idUser:String;inforUpdate: UserInterface}) => {
        try {
            const response = await axios.put(
                `http://localhost:3001/users/update-profile/${idUser}`, {
                    username: inforUpdate?.username,
                    email: inforUpdate?.email,
                    fullname: inforUpdate?.fullname,
                    phone: inforUpdate?.phone,
                    avatar: inforUpdate?.avatar
                });
                const data: UserInterface = response.data;
            return data;

        } catch (error) {
            // @ts-ignore
            const errorData = error as AxiosError;
            return ({data: errorData.response?.data});
        }
    }
);