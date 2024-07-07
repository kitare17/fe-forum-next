import * as Types from "../../constant/ActionType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TaskInterface } from "@/app/interface/Task";

export const createTask = createAsyncThunk(
  Types.CREATE_TASK,
  async (newTask: TaskInterface, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/taskManagement",
        {
          taskName: newTask.taskName,
          createAt: newTask.createAt,
          updateAt: newTask.updateAt,
          user: newTask.userId,
          todoList: newTask.todoList,
        }
      );
      const data: TaskInterface = response.data;
      return data;
    } catch (error) {
      console.log("Error: " + Types.CREATE_TASK);
    }
  }
);

export const showTask = createAsyncThunk(
  Types.SHOW_TASK,
  async ({ page, userId }: { page: number; userId: string }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/taskManagement/${userId}?page=${page}`
      );
      const data: TaskInterface = response.data;
      return data;
    } catch (error) {
      console.log("Error: " + error + Types.SHOW_TASK);
    }
  }
);

export const getDetailTask = createAsyncThunk(
  Types.SHOW_DETAIL_TASK,
  async ({ idTaskManagement }: { idTaskManagement: string }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/taskManagement/getOne/${idTaskManagement}`
      );
      const data: TaskInterface = response.data;
      return data;
    } catch (error) {
      console.log("Error: " + error + Types.SHOW_DETAIL_TASK);
    }
  }
);

export const deleteTask = createAsyncThunk(
  Types.DELETE_TASK,
  async ({ idTaskManagement }: { idTaskManagement: string }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/taskManagement/deleteTaskManagement/${idTaskManagement}`
      );
      const data: TaskInterface = response.data;
      return data;
    } catch (error) {
      console.log("Error: " + Types.DELETE_TASK);
    }
  }
);

export const updateTask = createAsyncThunk(
  Types.UPDATE_TASK,
  async (updateTask: TaskInterface, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/taskManagement/updateTaskManagerment",
        {
          idTaskManagement: updateTask._id,
          taskName: updateTask?.taskName,
          updateAt: updateTask?.updateAt,
        }
      );
      const data: TaskInterface = response.data;
      return data;
    } catch (error) {
      console.log("Error: " + Types.UPDATE_TASK);
    }
  }
);
