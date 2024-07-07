"use client";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { AppDispatch } from "@/app/store";
import { RootState } from "@/app/store";
import { toast } from "react-toastify";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TaskInterface } from "@/app/interface/Task";
import * as React from "react";
import { useRouter } from "next/navigation";

import {
  createTask,
  deleteTask,
  getDetailTask,
  showTask,
  updateTask,
} from "@/app/store/action/task";
import FormComponentTask from "./component/FormComponentTask";
import ToDoList from "./todolist/[taskId]/page";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TaskManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  // open update modal
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const [prioritize, setprioritize] = React.useState("");
  const [prioritizeUpdate, setprioritizeUpdate] = React.useState("");
  const [idUpdateTaskState, setIdUpdateTaskState] = React.useState("");
  const [taskNameState, setTaskNameState] = React.useState("");

  const {
    user,
    isLoading: isAuthLoading,
    isError: isAuthError,
    message,
  } = useSelector((state: RootState) => state.auth);

  console.log("nguyen diep hoang", user)

  const {
    listTask,
    isLoading: isTaskLoading,
    isError: isTaskError,
  } = useSelector((state: RootState) => state.task);

  const handleChangePriority = (event: SelectChangeEvent) => {
    setprioritize(event.target.value as string);
  };

  // Modal add task
  const [openAddTask, setOpenAdd] = React.useState(false);
  const handleOpenAddTask = () => {
    setOpenAdd(true);
  };
  const handleCloseAddTask = () => {
    setOpenAdd(false);
  };

  // Add task
  const handleAddTask = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mission = data.get("mission") as string;
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      

    const newTask: TaskInterface = {
      _id: "nn",
      taskName: mission,
      createAt: date,
      updateAt: date,
      userId: user?.userEmailId,
      todoList: [],
    };
    await dispatch(createTask(newTask)).then((result: any) => {
      // @ts-ignore
      if (result?.payload?.error) {
        toast.error("Tạo nhiệm vụ không thành công");
        handleCloseAddTask();
        handleShowTask();
      } else {
        toast.success("Tạo nhiệm vụ thành công");
        handleCloseAddTask();
        handleShowTask();
      }
    });
  };

  // Modal update task

  const handleOpenUpdateTask = ({
    idTaskUpdate,
    taskNameUpdate,
  }: {
    idTaskUpdate: string;
    taskNameUpdate: string;
  }) => {
    setIdUpdateTaskState(idTaskUpdate);
    setTaskNameState(taskNameUpdate);
    setOpenUpdate(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const handlePaging = (event: any, value: number) => {
    setCurrentPage(value);
  };

  // get all task
  const handleShowTask = async() => {
    await dispatch(
      showTask({ page: currentPage, userId: user?.userEmailId })
    );
   
  };

  useEffect(() => {
    // @ts-ignore
    handleShowTask();
  }, [currentPage]);

  // Delete task
  const handleDelete = async(idTask: any) => {
    await dispatch(
      deleteTask({
        idTaskManagement: idTask.idTask,
      })
    )
    handleShowTask();
  };
  const [taskId, setTaskId] = useState();
  

  const router = useRouter();
  const handleNavigate = (idtask: any) => {

    // <ToDoList taskId={listTask.tasks[idtask]._id} />


    
  };

  return (
    <>
      <section className=" gradient-custom-2">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-10">
              <div className="card mask-custom">
                <div className="card-body p-4 text-white">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className="text-center ">TASK MANAGEMENT</h1>
                    <button
                      type="button"
                      className="btn btn-primary fw-bold text-white"
                      onClick={handleOpenAddTask}
                    >
                      THÊM NHIỆM VỤ
                    </button>
                  </div>

                  <table className="table text-dark mb-5">
                    <thead>
                      <tr>
                        <th scope="col">Nhiệm Vụ</th>
                        <th scope="col">Ngày Tạo</th>
                        <th scope="col">Ngày thay đổi</th>
                        <th scope="col">Tùy chọn</th>
                      </tr>
                    </thead>

                    {[...(listTask.tasks ?? [])].map((task, index) => (
                      <tbody key={task._id}>
                        <tr className="fw-normal">
                          <td style={{cursor: "pointer"}}
                            onClick={() => {
                              router.push(`/pages/task-management/todolist/${task._id}`)
                            }}                      
                            className="align-middle"
                          >
                            <span>{task.taskName} </span>
                          </td>
                          <td className="align-middle">
                            <span>
                              {new Date(task?.createAt ?? "").getDate()}/
                              {new Date(task?.createAt ?? "").getMonth() + 1}/
                              {new Date(task?.createAt ?? "").getFullYear()}
                            </span>
                          </td>
                          <td className="align-middle">
                            <span>
                              {new Date(task?.updateAt ?? "").getDate()}/
                              {new Date(task?.updateAt ?? "").getMonth() + 1}/
                              {new Date(task?.updateAt ?? "").getFullYear()}
                            </span>
                          </td>
                          <td className="align-middle">
                            <button
                              onClick={() => handleDelete({ idTask: task._id })}
                              style={{
                                border: "none",
                                padding: 0,
                                backgroundColor: "white",
                              }}
                              type="submit"
                            >
                              <Image
                                src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
                                width={30}
                                height={30}
                                alt="Picture of the author"
                              />
                            </button>
                            <button
                              onClick={() =>
                                handleOpenUpdateTask({
                                  idTaskUpdate: task._id,
                                  taskNameUpdate: task.taskName,
                                })
                              }
                              style={{
                                border: "none",
                                padding: 0,
                                backgroundColor: "white",
                              }}
                              type="submit"
                            >
                              <Image
                                src="https://img.icons8.com/?size=100&id=wsH5SVIBggxT&format=png&color=000000"
                                width={30}
                                height={30}
                                alt="Picture of the author"
                              />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>

                  {/* modal */}

                  <Modal
                    open={openAddTask}
                    onClose={handleCloseAddTask}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Thêm Nhiệm Vụ Mới
                      </Typography>
                      <Box
                        component="form"
                        noValidate
                        onSubmit={handleAddTask}
                        sx={{ mt: 1 }}
                      >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="mission"
                          label="Tên nhiệm vụ"
                          name="mission"
                          type="mission"
                          autoFocus
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Thêm
                        </Button>
                      </Box>
                    </Box>
                  </Modal>

                  {/* modal update */}
                  <FormComponentTask
                    idUpdateTask={idUpdateTaskState}
                    taskName={taskNameState}
                    openEditBlog={openUpdate}
                    setOpenEditBlog={setOpenUpdate}
                    handleShowTask={handleShowTask}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Grid
        item
        xs={10}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          onChange={handlePaging}
          count={listTask.maxPage}
          defaultPage={1}
          siblingCount={1}
          size="large"
          showLastButton
          showFirstButton
        />
      </Grid>
    </>
  );
};

export default TaskManagement;
