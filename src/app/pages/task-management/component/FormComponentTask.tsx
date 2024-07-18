"use client";
import { Controller, useForm } from "react-hook-form";
import { Box, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { createBlog } from "@/app/store/action/blog";
import { TaskInterface } from "@/app/interface/Task";
import React, { useEffect } from "react";
import { updateTask } from "@/app/store/action/task";
import { toast } from "react-toastify";

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

const FormComponentTask = ({
  idUpdateTask,
  taskName,
  openEditBlog,
  setOpenEditBlog,
  handleShowTask,
}: {
  idUpdateTask: string;
  taskName: string;
  openEditBlog: boolean;
  handleShowTask: () => void;
  setOpenEditBlog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleOpen = () => setOpenEditBlog(true);
  const handleClose = () => setOpenEditBlog(false);

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
  } = useForm<TaskInterface>({
    defaultValues: {
      _id: idUpdateTask,
      taskName: taskName,
    },
  });
  useEffect(() => {
    setValue("taskName", taskName);
  }, [taskName]);

  const { errors } = formState;

  const handle = () => {
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    const newTask = {
      _id: idUpdateTask,
      taskName: getValues("taskName"),
      updateAt: date,
    };
    //@ts-ignore
    dipatch(updateTask(newTask )).then((result) => {
      // @ts-ignore
      if (result?.payload?.error) {
        toast.error("Chỉnh sửa nhiệm vụ không thành công");
      } else {
        toast.success("Chỉnh sửa nhiệm vụ thành công");

      }
    });

    setOpenEditBlog(false)
  };
  useEffect(() => {
    handleShowTask()
  }, [openEditBlog])

  return (
    <div>
      <Modal
        open={openEditBlog}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
              <Box
                onSubmit={handleSubmit(handle)}
                component="form"
                sx={{
                  "& .MuiFormLabel-asterisk": { color: "red" },
                }}
                noValidate
                autoComplete="off"
              >
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                  }}
                >
                 Sửa nhiệm vụ
                </Typography>

                <TextField
                  id="taskName" 
                  fullWidth
                  margin="normal"
                  required
                  label="Tên nhiệm vụ"
                  variant="outlined"
                  {...register("taskName", {
                    required: "Phải nhập task name",
                  })}
                  error={!!errors.taskName}
                  helperText={errors.taskName?.message}
                />
                <Button type="submit" variant="contained">
                  Sửa
                </Button>
              </Box>
           
        </Box>
      </Modal>
    </div>
  );
};

export default FormComponentTask;
