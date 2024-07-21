import * as Types from "../../constant/ActionType";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {LoginInterface} from "@/app/interface/LoginInterface";
import {RegisterInterface} from "@/app/interface/RegisterInterface";

export const fetchLogin = createAsyncThunk(
    Types.LOGIN,
    async (userLogin: LoginInterface, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:3001/users/login", {
                email: userLogin.email,
                password: userLogin.password,
            });

            const data: LoginInterface = response.data;
           localStorage.setItem("authnRes", JSON.stringify(data));
            return data;
        } catch (error) {

            // @ts-ignore
            const errorData = error as AxiosError;
            console.log("Error data", errorData.response?.data)
            return rejectWithValue({data: errorData.response?.data});
        }
    }
);

export const fetchLogout = createAsyncThunk(Types.LOGOUT, async () => {
    try {
        const response = await axios.post("http://localhost:3001/users/logout");
        console.log("dang xuat")
        return {data: "Logout"};
    } catch (error) {
        console.log("Error: " + Types.LOGOUT);
        return error;
    }
});
export const fetchRegister = createAsyncThunk(
    Types.REGISTER,
    async (userRegister: RegisterInterface, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/users/register",
                {
                    email: userRegister.email,
                    password: userRegister.password,
                    username: userRegister.username,
                    fullname: userRegister.username,
                    phone:"",
                    avatar: "", 
                    status: true
                }
            );
            const data: RegisterInterface = response.data;
            return data;

        } catch (error) {
            // @ts-ignore
            const errorData = error as AxiosError;
            return rejectWithValue({data: errorData.response?.data});
        }
    }
);


