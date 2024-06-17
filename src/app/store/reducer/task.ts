import { createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  deleteTask,
  getDetailTask,
  showTask,
  updateTask,
} from "@/app/store/action/task";
import { TaskInterface } from "@/app/interface/Task";

interface InitialState {
  newtask: TaskInterface;
  detailtask: TaskInterface;
  task: TaskInterface;
  isLoading: boolean;
  isError: boolean;
  listTask: { tasks: TaskInterface[]; maxPage: number };
  isSuccess: boolean;
  message: "";
}

var initialState: InitialState = {
  newtask: {
    _id: "",
    taskName: ""
  },
  detailtask:{
    _id: "",
    taskName: ""
  },
  task: {
    _id: "",
    taskName: ""
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  listTask: {
    tasks: [],
    maxPage: 1,
  },
  message: "",
};

const taskSlide = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //CREATE TASK
      .addCase(createTask.fulfilled, (state, action) => {
        // @ts-ignore
        state.newtask = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(createTask.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      // SHOW TASK
      .addCase(showTask.fulfilled, (state, action) => {
        // @ts-ignore
        state.listTask.tasks = action?.payload?.taskManagement;
        // @ts-ignore
        state.listTask.maxPage = action.payload.maxPage;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(showTask.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(showTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      // SHOW ONE TASK
      .addCase(getDetailTask.fulfilled, (state, action) => {
        // @ts-ignore
        state.detailtask = action?.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getDetailTask.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getDetailTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      // DELETE TASK
      .addCase(deleteTask.fulfilled, (state, action) => {
        // @ts-ignore
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      // UPDATE TASK
      .addCase(updateTask.fulfilled, (state, action) => {
        // @ts-ignore
        state.task = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateTask.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});
export default taskSlide.reducer;
