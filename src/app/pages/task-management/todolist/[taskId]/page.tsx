"use client";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useParams, useRouter } from "next/navigation";
import { TodoListInterface } from "@/app/interface/TodoList";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodoList,
  deleteTodoList,
  showTodoList,
} from "@/app/store/action/todoList";
import { RootState } from "@/app/store";
import { AppDispatch } from "@/app/store";
import { toast } from "react-toastify";
import todoList from "@/app/store/reducer/todoList";
import FormComponentTodoList from "../component/FormComponentTodoList";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  overflowY: "auto",
  p: 2,
};

const styleInput = {
  display: "flex",
  mt: 1,
  height: " 150%",
};

const ToDoList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { taskId }: { taskId: string } = useParams();

  const {
    listTodo,
    isLoading: isAuthLoading,
    isError: isAuthError,
    message,
  } = useSelector((state: RootState) => state.todoList);

  //router
  const router = useRouter();
  //text fiel modal
  const [startDate, setStartDate] = useState(dayjs(""));
  const [endDate, setEndDate] = useState(dayjs(""));
  const [detail, setDetail] = useState("");
  const [label, setLabel] = useState("");
  const [prioritize, setPrioritize] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");

  // open update modal component
  const [openUpdate, setOpenUpdate] = useState(false);
  const [todoListUpdateState, setTodoListUpdateState] = useState<Object>();

  // open modal
  const handleOpenDetailToDo = () => setOpen(true);
  const handleCloseDetailToDo = () => setOpen(false);
  const [openAddWork, setOpenAdd] = useState(false);

  //Get param

  // setup open modal
  const [openDetailToDo, setOpen] = useState(false);

  const handleOpenAddWork = () => {
    setOpenAdd(true);
  };
  const handleCloseAddWork = () => {
    setOpenAdd(false);
  };

  // change event
  const handleOnchangeLabel = (event: any) => {
    setLabel(event.target.value);
  };
  const handleOnchangePrioritize = (event: any) => {
    setPrioritize(event.target.value);
  };

  const handleOnchangeStatus = (event: any) => {
    setStatus(event.target.value);
  };
  const handleOnchangeTitle = (event: any) => {
    setTitle(event.target.value);
  };
  const handleOnChangeDetail = (event: any) => {
    setDetail(event.target.value);
  };

  // page
  const [currentPage, setCurrentPage] = useState(1);
  const handlePaging = (event: any, value: number) => {
    setCurrentPage(value);
  };

  // Add todoList
  const handleAddTodoList = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    var data = new FormData(event.currentTarget);
    var formattedStartDate = startDate.startOf("day").format("DD/MM/YYYY");
    var formattedEndDate = endDate.startOf("day").format("DD/MM/YYYY");

    // console.log("new todo list ", title, detail, label, status, prioritize, formattedStartDate, formattedEndDate)

    const newTodoList: TodoListInterface = {
      _id: "nn",
      title: title,
      detail: detail,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      label: label,
      status: status,
      prioritize: prioritize,
      userId: "nn",
      idTaskManagement: "nn",
    };
    let startDay = formattedStartDate;
    let endDay = formattedEndDate;
    if (
      formattedEndDate === "Invalid Date" ||
      formattedStartDate === "Invalid Date"
    ) {
      toast.error("Phải nhập ngày");
      handleCloseAddWork();
    } else if (startDay > endDay) {
      handleCloseAddWork();
      toast.error("Ngày bắt đầu phải trước ngày kết thúc");
    } else {
      dispatch(
        createTodoList({ newTodoList: newTodoList, idTaskManagement: taskId })
      ).then((result: any) => {
        // @ts-ignore
        if (result?.payload?.error) {
          toast.error("Tạo nhiệm vụ không thành công");
          handleShowTodoList();
          handleCloseAddWork();
        } else {
          toast.success("Tạo nhiệm vụ thành công");
          handleShowTodoList();
          handleCloseAddWork();
        }
      });
    }

    setTitle("");
    setDetail("");
    setLabel("");
    setStatus("");
    setPrioritize("");
    setStartDate(dayjs(""));
    setEndDate(dayjs(""));
  };

  const handleDelete = async (idTodo: any) => {
    await dispatch(
      deleteTodoList({ idTodoList: idTodo, idTaskManagement: taskId })
    );
    toast.success("Xóa todo list thành công");
    await handleShowTodoList();
  };

  //   get all todo list
  const handleShowTodoList = async () => {
    await dispatch(
      showTodoList({ idTaskManagement: taskId, page: currentPage })
    );
  };

  useEffect(() => {
    handleShowTodoList();
  }, [dispatch, taskId, currentPage]);

  // Modal update task

  const handleOpenUpdateTodoList = ({
    todoListUpdate,
  }: {
    todoListUpdate: Object;
  }) => {
    setTodoListUpdateState(todoListUpdate);
    setOpenUpdate(true);
  };

  return (
    <div>
      <div className="container mt-4 p-0 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-center">TO DO LIST</h1>
          <button
            type="button"
            className="btn btn-primary text-white fw-bold"
            onClick={handleOpenAddWork}
          >
            THÊM CÔNG VIỆC
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-3">
            <div
              className="card"
              style={{ backgroundColor: "#A9A9A9", opacity: 0.8 }}
            >
              <div className="card-header bg-secondary text-white text-center">
                Nhiệm vụ
              </div>
              {listTodo.todoList
                .filter((lmission) => lmission.status === "Nhiệm vụ")
                .map((lmission) => (
                  <div
                    className="overflow-auto"
                    style={{ maxHeight: "450px" }}
                    key={lmission._id}
                  >
                    <div className="card mt-4 mb-4 mx-auto w-75">
                      <div className="card-body">
                        <h5 className="card-title">{lmission.title}</h5>
                        <span className="badge bg-info mb-2">
                          {lmission.label}
                        </span>
                        <span className="badge bg-warning text-dark mb-2 ml-2">
                          {lmission.prioritize}
                        </span>
                        <div className="card-text small">
                          {" "}
                          Ngày bắt đầu &nbsp;
                          {new Date(lmission.startDate ?? "").getDate()}/
                          {new Date(lmission.startDate ?? "").getMonth() + 1}/
                          {new Date(lmission.startDate ?? "").getFullYear()}
                        </div>
                        <div className="card-text small">
                          {" "}
                          Ngày kết thúc &nbsp;
                          {new Date(lmission.endDate ?? "").getDate()}/
                          {new Date(lmission.endDate ?? "").getMonth() + 1}/
                          {new Date(lmission.endDate ?? "").getFullYear()}
                        </div>
                        <button
                          onClick={() => handleDelete(lmission._id)}
                          style={{
                            border: "none",
                            padding: 0,
                            backgroundColor: "white",
                          }}
                          type="submit"
                        >
                          <Image
                            src="https://img.icons8.com/?size=100&id=43949&format=png&color=000000"
                            width={20}
                            height={20}
                            alt="Picture of the author"
                          />{" "}
                        </button>
                        <button
                          onClick={() =>
                            handleOpenUpdateTodoList({
                              todoListUpdate: {
                                _id: lmission._id,
                                title: lmission.title,
                                detail: lmission.detail,
                                startDate: lmission.startDate,
                                endDate: lmission.endDate,
                                label: lmission.label,
                                status: lmission.status,
                                prioritize: lmission.prioritize,
                              },
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
                            src="https://img.icons8.com/?size=100&id=59856&format=png&color=000000"
                            width={20}
                            height={20}
                            alt="Picture of the author"
                          />{" "}
                        </button>

                        {new Date(lmission.endDate ?? "") < new Date() ? (
                          <Tooltip title="Task quá thời hạn">
                            <IconButton>
                              <ReportIcon style={{ color: "red" }} />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card "
              style={{ backgroundColor: " #81B1CC", opacity: 0.8 }}
            >
              <div
                className="card-header text-white text-center"
                style={{ backgroundColor: "#4169E1	" }}
              >
                Đang làm
              </div>
              {listTodo.todoList
                .filter((ltodo) => ltodo.status === "Đang làm")
                .map((ltodo) => (
                  <div
                    className="overflow-auto"
                    style={{ maxHeight: "450px" }}
                    key={ltodo._id}
                  >
                    <div className="card mt-4 mb-4 mx-auto w-75">
                      <div className="card-body">
                        <h5 className="card-title">{ltodo.title}</h5>
                        <span className="badge bg-success mb-2">{ltodo.label}</span>
                        <span className="badge bg-warning text-dark mb-2 ml-2">
                          {ltodo.prioritize}
                        </span>
                        <div className="card-text small">
                          {" "}
                          Ngày bắt đầu &nbsp;
                          {new Date(ltodo.startDate ?? "").getDate()}/
                          {new Date(ltodo.startDate ?? "").getMonth() + 1}/
                          {new Date(ltodo.startDate ?? "").getFullYear()}
                        </div>
                        <div className="card-text small">
                          {" "}
                          Ngày kết thúc &nbsp;
                          {new Date(ltodo.endDate ?? "").getDate()}/
                          {new Date(ltodo.endDate ?? "").getMonth() + 1}/
                          {new Date(ltodo.endDate ?? "").getFullYear()}
                        </div>
                        <button
                          onClick={() => handleDelete(ltodo._id)}
                          style={{
                            border: "none",
                            padding: 0,
                            backgroundColor: "white",
                          }}
                          type="submit"
                        >
                          <Image
                            src="https://img.icons8.com/?size=100&id=43949&format=png&color=000000"
                            width={20}
                            height={20}
                            alt="Picture of the author"
                          />{" "}
                        </button>
                        <button
                          onClick={() =>
                            handleOpenUpdateTodoList({
                              todoListUpdate: {
                                _id: ltodo._id,
                                title: ltodo.title,
                                detail: ltodo.detail,
                                startDate: ltodo.startDate,
                                endDate: ltodo.endDate,
                                label: ltodo.label,
                                status: ltodo.status,
                                prioritize: ltodo.prioritize,
                              },
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
                            src="https://img.icons8.com/?size=100&id=59856&format=png&color=000000"
                            width={20}
                            height={20}
                            alt="Picture of the author"
                          />{" "}
                        </button>

                        {new Date(ltodo.endDate ?? "") < new Date() ? (
                          <Tooltip title="Task quá thời hạn">
                            <IconButton>
                              <ReportIcon style={{ color: "red" }} />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card"
              style={{ backgroundColor: "#AAD9CD", opacity: 0.8 }}
            >
              <div className="card-header bg-success text-white text-center">
                Đã xong
              </div>
              {listTodo.todoList
                .filter((lcomplete) => lcomplete.status === "Đã xong")
                .map((lcomplete) => (
                  <div
                    className="overflow-auto"
                    style={{ maxHeight: "450px" }}
                    key={lcomplete._id}
                  >
                    <div className="card mt-4 mb-4 mx-auto w-75">
                      <div className="card-body ">
                        <h5 className="card-title">{lcomplete?.title}</h5>
                        <span className="badge bg-warning text-dark mb-2">
                          {lcomplete?.label}
                        </span>
                        <span className="badge bg-secondary mb-2 ml-2">
                          {lcomplete?.prioritize}
                        </span>
                        <div className="card-text small">
                          {" "}
                          Ngày bắt đầu &nbsp;
                          {new Date(lcomplete.startDate ?? "").getDate()}/
                          {new Date(lcomplete.startDate ?? "").getMonth() + 1}/
                          {new Date(lcomplete.startDate ?? "").getFullYear()}
                        </div>
                        <div className="card-text small">
                          {" "}
                          Ngày kết thúc &nbsp;
                          {new Date(lcomplete.endDate ?? "").getDate()}/
                          {new Date(lcomplete.endDate ?? "").getMonth() + 1}/
                          {new Date(lcomplete.endDate ?? "").getFullYear()}
                        </div>
                        <button
                          onClick={() => handleDelete(lcomplete._id)}
                          style={{
                            border: "none",
                            padding: 0,
                            backgroundColor: "white",
                          }}
                          type="submit"
                        >
                          <Image
                            src="https://img.icons8.com/?size=100&id=43949&format=png&color=000000"
                            width={20}
                            height={20}
                            alt="Picture of the author"
                          />{" "}
                        </button>
                        <button
                          onClick={() =>
                            handleOpenUpdateTodoList({
                              todoListUpdate: {
                                _id: lcomplete._id,
                                title: lcomplete.title,
                                detail: lcomplete.detail,
                                startDate: lcomplete.startDate,
                                endDate: lcomplete.endDate,
                                label: lcomplete.label,
                                status: lcomplete.status,
                                prioritize: lcomplete.prioritize,
                              },
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
                            src="https://img.icons8.com/?size=100&id=59856&format=png&color=000000"
                            width={20}
                            height={20}
                            alt="Picture of the author"
                          />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card "
              style={{ backgroundColor: "#E5B3BB", opacity: 0.8 }}
            >
              <div className="card-header bg-danger text-white text-center">
                Hủy
              </div>
              {listTodo.todoList
                .filter((lcancel) => lcancel.status === "Hủy")
                .map((lcancel) => (
                  <div
                    className="overflow-auto"
                    style={{ maxHeight: "450px" }}
                    key={lcancel._id}
                  >
                    <div className="card mt-4 mb-4 mx-auto w-75">
                      <div className="card-body">
                        <h5 className="card-title">{lcancel.title}</h5>
                        <span className="badge bg-danger mb-2">
                          {" "}
                          {lcancel.label}
                        </span>
                        <span className="badge bg-secondary mb-2 ml-2">
                          {lcancel.prioritize}
                        </span>
                        <div className="card-text small">
                          {" "}
                          Ngày bắt đầu &nbsp;
                          {new Date(lcancel.startDate ?? "").getDate()}/
                          {new Date(lcancel.startDate ?? "").getMonth() + 1}/
                          {new Date(lcancel.startDate ?? "").getFullYear()}
                        </div>
                        <div className="card-text small">
                          {" "}
                          Ngày kết thúc &nbsp;
                          {new Date(lcancel.endDate ?? "").getDate()}/
                          {new Date(lcancel.endDate ?? "").getMonth() + 1}/
                          {new Date(lcancel.endDate ?? "").getFullYear()}
                        </div>
                        <button
                          onClick={() => handleDelete(lcancel._id)}
                          style={{
                            border: "none",
                            padding: 0,
                            backgroundColor: "white",
                          }}
                          type="submit"
                        >
                          <Image
                            src="https://img.icons8.com/?size=100&id=43949&format=png&color=000000"
                            width={20}
                            height={20}
                            alt="Picture of the author"
                          />{" "}
                        </button>
                        <button
                          onClick={() =>
                            handleOpenUpdateTodoList({
                              todoListUpdate: {
                                _id: lcancel._id,
                                title: lcancel.title,
                                detail: lcancel.detail,
                                startDate: lcancel.startDate,
                                endDate: lcancel.endDate,
                                label: lcancel.label,
                                status: lcancel.status,
                                prioritize: lcancel.prioritize,
                              },
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
                            src="https://img.icons8.com/?size=100&id=59856&format=png&color=000000"
                            width={20}
                            height={20}
                            alt="Picture of the author"
                          />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal add */}
      <div>
        <Modal
          sx={{ height: "500px" }}
          open={openAddWork}
          onClose={handleCloseAddWork}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Thêm Nhiệm Vụ Mới
            </Typography>
            <Box component="form" onSubmit={handleAddTodoList} sx={{ mt: 1 }}>
              <Box sx={styleInput}>
                <TextField
                  margin="normal"
                  style={{ marginRight: "15px", width: "95%" }}
                  required
                  fullWidth
                  id="title"
                  label="Tên nhiệm vụ"
                  name="title"
                  type="title"
                  onChange={handleOnchangeTitle}
                />
                <FormControl required fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="demo-simple-select-label">Nhãn</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="label"
                    value={label}
                    label="Nhãn"
                    onChange={handleOnchangeLabel}
                  >
                    <MenuItem value={"Công việc"}>Công việc</MenuItem>
                    <MenuItem value={"Học tập"}>Học tập</MenuItem>
                    <MenuItem value={"Đời sống"}>Đời sống</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={styleInput}>
                <FormControl required fullWidth sx={{ mt: 1 }}>
                  <InputLabel id="demo-simple-select-label">Ưu tiên</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="prioritize"
                    value={prioritize}
                    label="Độ ưu tiên"
                    style={{ marginRight: "15px" }}
                    onChange={handleOnchangePrioritize}
                  >
                    <MenuItem value={"Rất quan trọng"}>Rất quan trọng</MenuItem>
                    <MenuItem value={"Quan trọng"}>Quan trọng</MenuItem>
                    <MenuItem value={"Bình thường"}>Bình thường</MenuItem>
                  </Select>
                </FormControl>

                <FormControl required fullWidth sx={{ mt: 1 }}>
                  <InputLabel id="demo-simple-select-label">
                    Trạng thái
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="status"
                    value={status}
                    label="Độ ưu tiên"
                    onChange={handleOnchangeStatus}
                  >
                    <MenuItem value={"Nhiệm vụ"}>Nhiệm vụ</MenuItem>
                    <MenuItem value={"Đang làm"}>Đang làm</MenuItem>
                    <MenuItem value={"Đã xong"}>Đã xong</MenuItem>
                    <MenuItem value={"Hủy"}>Hủy</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="detail"
                label="Mô tả"
                name="detail"
                type="detail"
                onChange={handleOnChangeDetail}
              />
              <Box sx={styleInput}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    sx={{ pr: "220px" }}
                    components={["DatePicker", "DatePicker"]}
                  >
                    <DatePicker
                      label="Ngày bắt đầu"
                      value={startDate}
                      // @ts-ignore
                      onChange={(newValue) => setStartDate(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="Ngày kết thúc"
                      value={endDate}
                      // @ts-ignore
                      onChange={(newValue) => setEndDate(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  display: "flex",
                  margin: "auto",
                  width: "40%",
                  mt: 4,
                  mb: 0,
                }}
              >
                Thêm Nhiệm vụ
              </Button>
            </Box>
          </Box>
        </Modal>
        {/* modal update */}
        <FormComponentTodoList
          changeTodoList={todoListUpdateState!}
          openUpdateTodoList={openUpdate}
          setOpenUpdateTodoList={setOpenUpdate}
          handleShowTodoList={handleShowTodoList}
        />
      </div>
    </div>
  );
};

export default ToDoList;
