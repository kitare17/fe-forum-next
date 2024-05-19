import * as Types from "../../constant/ActionType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserInterface } from "@/app/interface/userinterface";
import { LoginInterface } from "@/app/interface/LoginInterface";
import { RegisterInterface } from "@/app/interface/RegisterInterface";

export const fetchLogin = createAsyncThunk(
  Types.LOGIN,
  async (userLogin: LoginInterface) => {
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email: userLogin.email,
        password: userLogin.password,
      });

      const data: LoginInterface = response.data;
      window.localStorage.setItem("authnRes", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }
);

export const fetchLogout = createAsyncThunk(Types.LOGOUT, async () => {
  try {
    const response = await axios.post("http://localhost:3001/users/logout");
    return response.data;
  } catch (error) {
    console.log("Error: " + Types.LOGOUT);
    return error;
  }
});

export const fetchRegister = createAsyncThunk(
  Types.REGISTER,
  async (userRegister: RegisterInterface) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/register",
        {
          email: userRegister.email,
          password: userRegister.password,
          username: userRegister.username
        }
      );
      
      console.log("response.data", response.data)
      if(!(response.data.statusMessage === "Error")) {
        console.log("responaaaaaase.data", response.data)

        const data: RegisterInterface = response.data;
        return data;
      }
      return response.data;
    } catch (error) {
          // @ts-ignore
      console.log("Error: " + error.payload.response.data.statusMessage);

      return error;
    }
  }
);
