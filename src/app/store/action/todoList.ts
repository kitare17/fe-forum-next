import * as Types from "../../constant/ActionType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TodoListInterface } from "@/app/interface/TodoList";

export const createTodoList = createAsyncThunk(
  Types.CREATE_TODOLIST,
  async ({newTodoList, idTaskManagement}: {newTodoList: TodoListInterface, idTaskManagement: string}, { rejectWithValue }) => {
    try {
      console.log("newTodoList", newTodoList)
      console.log("idTaskManagement", idTaskManagement)
      const response = await axios.post(`http://localhost:3001/todoList/${idTaskManagement}`, {
        title: newTodoList.title,
        detail: newTodoList.detail,
        startDate: newTodoList.startDate,
        endDate: newTodoList.endDate,
        label: newTodoList.label,
        status: newTodoList.status,
        prioritize: newTodoList.prioritize,
      });
      
      const data: TodoListInterface = response.data;
      return data;
    } catch (error) {
      console.log("Error: " + Types.CREATE_TODOLIST);
    }
  }
);

export const getDetailTodoList = createAsyncThunk(
  Types.SHOW_DETAIL_TODOLIST,
  async ({ idTodoList }: { idTodoList: string }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/todoList/${idTodoList}`
      );
      const data: TodoListInterface = response.data;
      return data;
    } catch (error) {
      console.log("Error: " + error + Types.SHOW_DETAIL_TODOLIST);
    }
  }
);

export const showTodoList = createAsyncThunk(
  Types.SHOW_TODOLIST,
  async ({ idTaskManagement, page }: { idTaskManagement: string ,  page: number }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/todoList/${idTaskManagement}?page=${page}`
      );
      const data: TodoListInterface = response.data;
      return data;
    } catch (error) {
      console.log("Error: " + Types.SHOW_TODOLIST);
    }
  }
);

export const deleteTodoList = createAsyncThunk(
  Types.DELETE_TODOLIST,
  async ({
    idTodoList,
    idTaskManagement,
  }: {
    idTodoList: string;
    idTaskManagement: string;
  }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/todoList/deleteTodoList/${idTaskManagement}/${idTodoList}`
      );
      const data: TodoListInterface = response.data;
      return data;
    } catch (error) {
      console.log("Error: " + Types.DELETE_TODOLIST);
    }
  }
);

export const updateTodoList = createAsyncThunk(
  Types.UPDATE_TODOLIST,
  async (updateTodoList: TodoListInterface, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/todoList/updateToDolist",
        {
          idTodolist: updateTodoList._id,
          title: updateTodoList?.title,
          detail: updateTodoList?.detail,
          startDate: updateTodoList?.startDate,
          endDate: updateTodoList?.endDate,
          label: updateTodoList?.label,
          status: updateTodoList?.status,
          prioritize: updateTodoList?.prioritize,
        }
      );
      const data: TodoListInterface = response.data;
      return data;
    } catch (error) {
      console.log("Error: " + Types.UPDATE_TODOLIST);
    }
  }
);
