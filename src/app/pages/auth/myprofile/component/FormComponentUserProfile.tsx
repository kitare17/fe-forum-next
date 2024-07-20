"use client";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent } from "@mui/material";

import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  DialogActions,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateTodoList } from "@/app/store/action/todoList";
import { UserInterface } from "@/app/interface/User";
import { RootState } from "@/app/store";
import { updateProfile } from "@/app/store/action/user";
import { getBase64 } from "../../../../../utils";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

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

const FormComponentUserProfile = ({
  idUser,
  changeProfile,
  handleShowUserProfile,
  openEditPopup,
  setopenEditPopup,
}: {
  idUser: String;
  changeProfile: UserInterface;
  handleShowUserProfile: () => void;
  openEditPopup: boolean;
  setopenEditPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleOpen = () => setopenEditPopup(true);
  const handleCloseEditPopup = () => setopenEditPopup(false);
  const [avatar, setAvatar] = useState(changeProfile?.avatar);

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
      fullname: changeProfile?.fullname,
      phone: changeProfile?.phone,
      email: changeProfile?.email,
      username: changeProfile?.username,
      avatar: changeProfile?.avatar,
    },
  });
  var currentURL="";
  useEffect(() => {
    currentURL = window.location.href;
    setValue("fullname", changeProfile?.fullname);
    setValue("phone", changeProfile?.phone);
    setValue("email", changeProfile?.email);
    setValue("username", changeProfile?.username);
    setValue("avatar", changeProfile?.avatar);
  }, [changeProfile]);

  const { errors } = formState;

  const handleUpdateProfile = () => {
    const userProfile = {
      fullname: getValues("fullname"),
      phone: getValues("phone"),
      email: getValues("email"),
      username: getValues("username"),
      avatar: avatar,
    };

    //@ts-ignore
    dipatch(updateProfile({ idUser: idUser, inforUpdate: userProfile })).then(
      (result: any) => {
        // @ts-ignore
        if (result?.payload?.data?.status === "Error") {
          toast.error(result?.payload?.data?.message);
          handleShowUserProfile();
        } else {
          toast.success("Chỉnh sửa thông tin thành công");
          handleShowUserProfile();
        }
      }
    );

    setopenEditPopup(false);
  };

  useEffect(() => {
    handleShowUserProfile();
    setAvatar(changeProfile?.avatar)
  }, [openEditPopup]);

  //@ts-ignore
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  return (
    <div>
      <Dialog open={openEditPopup} onClose={handleCloseEditPopup}>
        <h2 className="text-center" style={{ paddingTop: "20px" }}>
          Chỉnh sửa hồ sơ
        </h2>
        <DialogContent>
          <label htmlFor="upload-avatar" style={{ paddingBottom: "20px" }}>
            <div>
              {currentURL?.includes("pages/admin/manageAccount") ? (
                ""
              ) : (
                <div>
                  <Upload maxCount={1} onChange={handleOnchangeAvatar}>
                    <label htmlFor="avatar-upload">
                      <UploadOutlined />
                      Chọn ảnh đại diện
                    </label>
                  </Upload>
                </div>
              )}

              {avatar && (
                <img
                id="avatar"
                  src={avatar}
                  style={{
                    height: "70px",
                    width: "70px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt="avatar"
                />
              )}
            </div>
          </label>
          <TextField
            autoFocus
            margin="dense"
            label="Tên tài khoản"
            id="username"
            fullWidth
            {...register("username", {
              required: "Phải nhập tên tài khoản",
            })}
            error={!!errors.username}
            helperText={
              errors.username
                ? typeof errors.username.message === "string"
                  ? errors.username.message
                  : null
                : null
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Họ và tên"
            id="fullname"
            fullWidth
            {...register("fullname", {
              required: "Phải nhập họ và tên",
            })}
            error={!!errors.fullname}
            helperText={
              errors.fullname
                ? typeof errors.fullname.message === "string"
                  ? errors.fullname.message
                  : null
                : null
            }
          />

          <TextField
            margin="dense"
            label="Email"
            id="email"
            fullWidth
            {...register("email", {
              required: "Phải nhập Email",
            })}
            error={!!errors.email}
            helperText={
              errors.email
                ? typeof errors.email.message === "string"
                  ? errors.email.message
                  : null
                : null
            }
          />
          <TextField
            margin="dense"
            label="Số điện thoại"
            id="phone"
            fullWidth
            {...register("phone", {
              required: "Phải nhập số điện thoại",
            })}
            error={!!errors.phone}
            helperText={
              errors.phone
                ? typeof errors.phone.message === "string"
                  ? errors.phone.message
                  : null
                : null
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditPopup}>Hủy</Button>
          <Button
            onClick={handleUpdateProfile}
            variant="contained"
            color="primary"
          >
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormComponentUserProfile;
