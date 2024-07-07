import { TodoListInterface } from "@/app/interface/TodoList";
import { createSlice } from "@reduxjs/toolkit";
import { createTodoList, deleteTodoList, getDetailTodoList, showTodoList, updateTodoList } from "../action/todoList";


interface InitialState {
  newTodoList: TodoListInterface;
  detailTodoList: TodoListInterface;
  todoList: TodoListInterface;
  isLoading: boolean;
  isError: boolean;
  listTodo: { todoList: TodoListInterface[]; maxPage: number };
  isSuccess: boolean;
  message: "";
}

var initialState: InitialState = {
  newTodoList: {
    _id: "",
    title: "",
    detail: "",
    startDate: "",
    endDate: "",
    label: "",
    status: "",
    prioritize: "",
    userId: "",
    idTaskManagement: ""
  },
  detailTodoList:{
    _id: "",
    title: "",
    detail: "",
    startDate: "",
    endDate: "",
    label: "",
    status: "",
    prioritize: "",
    userId: "",
    idTaskManagement: ""
  },
  todoList: {
    _id: "",
    title: "",
    detail: "",
    startDate: "",
    endDate: "",
    label: "",
    status: "",
    prioritize: "",
    userId: "",
    idTaskManagement: ""
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  listTodo: {
    todoList: [],
    maxPage: 1,
  },
  message: "",
};

const todoListSlide = createSlice({
  name: "todoList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //CREATE TODO LIST
      .addCase(createTodoList.fulfilled, (state, action) => {
        // @ts-ignore
        state.newTodoList = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(createTodoList.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTodoList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      // SHOW TODOLIST
      .addCase(showTodoList.fulfilled, (state, action) => {
        // @ts-ignore
        state.listTodo.todoList = action?.payload?.todoList;
        // @ts-ignore
        state.listTodo.maxPage = action.payload.maxPage;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(showTodoList.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(showTodoList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      // SHOW ONE TODO LIST
      .addCase(getDetailTodoList.fulfilled, (state, action) => {
        // @ts-ignore
        state.detailTodoList = action?.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getDetailTodoList.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getDetailTodoList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      // DELETE TODO LIST
      .addCase(deleteTodoList.fulfilled, (state, action) => {
        // @ts-ignore
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteTodoList.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteTodoList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      // UPDATE TODO LIST
      .addCase(updateTodoList.fulfilled, (state, action) => {
        // @ts-ignore
        state.todoList = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateTodoList.pending, (state, action) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateTodoList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});
export default todoListSlide.reducer;
