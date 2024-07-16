"use client";
import { Controller, set, useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { updateTask } from "@/app/store/action/task";
import { toast } from "react-toastify";
import { TodoListInterface } from "@/app/interface/TodoList";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { updateTodoList } from "@/app/store/action/todoList";

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

const styleInput = {
  display: "flex",
  mt: 1,
  height: " 150%",
};

const FormComponentTodoList = ({
  changeTodoList,
  openUpdateTodoList,
  setOpenUpdateTodoList,
  handleShowTodoList,
}: {
  changeTodoList: TodoListInterface;
  openUpdateTodoList: boolean;
  handleShowTodoList: () => void;
  setOpenUpdateTodoList: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleOpen = () => setOpenUpdateTodoList(true);
  const handleClose = () => setOpenUpdateTodoList(false);
  //form
  const dipatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    control,
    trigger,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      title: changeTodoList?.title,
      detail: changeTodoList?.detail,
      startDate: changeTodoList?.startDate,
      endDate: changeTodoList?.endDate,
      label: changeTodoList?.label,
      status: changeTodoList?.status,
      prioritize: changeTodoList?.prioritize,
    },
  });
  useEffect(() => {
    setValue("title", changeTodoList?.title);
    setValue("detail", changeTodoList?.detail);
    setValue("startDate", changeTodoList?.startDate);
    setValue("endDate", changeTodoList?.endDate);
    setValue("label", changeTodoList?.label);
    setValue("status", changeTodoList?.status);
    setValue("prioritize", changeTodoList?.prioritize);
  }, [changeTodoList]);

  const { errors } = formState;

  const handleEditTodoList = () => {
    const newTodoList = {
      _id: changeTodoList._id,
      title: getValues("title"),
      detail: getValues("detail"),
      startDate: getValues("startDate"),
      endDate: getValues("endDate"),
      label: getValues("label"),
      status: getValues("status"),
      prioritize: getValues("prioritize"),
    };
    //@ts-ignore
    dipatch(updateTodoList(newTodoList)).then((result) => {
      // @ts-ignore
      if (result?.payload?.error) {
        toast.error("Chỉnh sửa nhiệm vụ không thành công");
      } else {
        toast.success("Chỉnh sửa nhiệm vụ thành công");
      }
    });

    setOpenUpdateTodoList(false);
  };

  useEffect(() => {
    handleShowTodoList();
  }, [openUpdateTodoList]);

  return (
    <div>
      <Modal
        sx={{ height: "500px" }}
        open={openUpdateTodoList}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chỉnh sửa nhiệm vụ
          </Typography>
          <Box component="form" onSubmit={handleEditTodoList} sx={{ mt: 1 }}>
            <Box sx={styleInput}>
              <TextField
                margin="normal"
                style={{ marginRight: "15px", width: "95%" }}
                required
                fullWidth
                id="title"
                label="Tên nhiệm vụ"
                type="title"
                autoFocus
                {...register("title", {
                  required: "Phải nhập task name",
                })}
                error={!!errors.title}
                helperText={errors.title?.message}
                // onChange={handleOnchangeTitle}
              />
              <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.label}>
                <InputLabel id="demo-simple-select-label">Nhãn</InputLabel>
                <Controller
                  name="label"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Phải nhập task name" }}
                  render={({ field }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="label"
                      label="Nhãn"
                      {...field}
                    >
                      <MenuItem value={"Công việc"}>Công việc</MenuItem>
                      <MenuItem value={"Học tập"}>Học tập</MenuItem>
                      <MenuItem value={"Đời sống"}>Đời sống</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Box>

            <Box sx={styleInput}>
              <FormControl fullWidth sx={{ mt: 1 }} error={!!errors.prioritize}>
                <InputLabel id="demo-simple-select-label">Ưu tiên</InputLabel>
                <Controller
                  name="prioritize"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Phải chọn độ ưu tiên" }}
                  render={({ field }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="prioritize"
                      label="Độ ưu tiên"
                      style={{ marginRight: "15px" }}
                      {...field}
                    >
                      <MenuItem value={"Rất quan trọng"}>
                        Rất quan trọng
                      </MenuItem>
                      <MenuItem value={"Quan trọng"}>Quan trọng</MenuItem>
                      <MenuItem value={"Bình thường"}>Bình thường</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 1 }} error={!!errors.status}>
                <InputLabel id="demo-simple-select-label">
                  Trạng thái
                </InputLabel>
                <Controller
                  name="status"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Phải chọn trạng thái" }}
                  render={({ field }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="status"
                      label="Trạng thái"
                      {...field}
                    >
                      <MenuItem value={"Nhiệm vụ"}>Nhiệm vụ</MenuItem>
                      <MenuItem value={"Đang làm"}>Đang làm</MenuItem>
                      <MenuItem value={"Đã xong"}>Đã xong</MenuItem>
                      <MenuItem value={"Hủy"}>Hủy</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Box>
            <TextField
              margin="normal"
              sx={{ marginBottom: "20px" }}
              required
              fullWidth
              id="detail"
              label="Mô tả"
              type="detail"
              {...register("detail", {
                required: "Phải nhập task name",
              })}
              error={!!errors.detail}
              helperText={errors.detail?.message}
              autoFocus
            />

            <Box sx={{ display: "flex" }}>
              <Box sx={{ marginRight: "180px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="startDate"
                    control={control}
                    rules={{ required: "Phải chọn ngày bắt đầu" }}
                    render={({ field: { onChange, value, ...rest } }) => (
                      <DatePicker
                        label="Ngày bắt đầu"
                        value={value ? dayjs(value) : null} // Convert to dayjs object
                        onChange={(newValue) => onChange(newValue)} // Handle onChange
                        // @ts-ignore
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            error={!!errors.startDate}
                            helperText={
                              errors.startDate ? errors.startDate.message : null
                            }
                            sx={{ width: "190%" }} // Adjust spacing here
                          />
                        )}
                        {...rest}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>

              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="endDate"
                    control={control}
                    rules={{ required: "Phải chọn ngày kết thúc" }}
                    render={({ field: { onChange, value, ...rest } }) => (
                      <DatePicker
                        label="Ngày kết thúc"
                        value={value ? dayjs(value) : null} // Convert to dayjs object
                        onChange={(newValue) => onChange(newValue)} // Handle onChange
                        // @ts-ignore
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            error={!!errors.endDate}
                            helperText={
                              errors.endDate ? errors.endDate.message : null
                            }
                            sx={{ mt: 4, width: "100%" }} // Adjust spacing here
                          />
                        )}
                        {...rest}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            {/* <Box sx={styleInput}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{ pr: "130px" }}
                  components={["DatePicker", "DatePicker"]}
                >
                  <DatePicker
                    label="Ngày bắt đầu"
                    // value={startDate}
                    // onChange={(newValue) => setStartDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{}}
                  components={["DatePicker", "DatePicker"]}
                >
                  <DatePicker
                    label="Ngày kết thúc"
                    // value={endDate}
                    // onChange={(newValue) => setEndDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box> */}
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
              Chỉnh Sửa Nhiệm vụ
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default FormComponentTodoList;
